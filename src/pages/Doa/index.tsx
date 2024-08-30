import BorderCard from "@/Components/Card/BorderCard";
import SearchInput from "@/Components/Input/SearchInput";
import MobileNavigations from "@/UI/Navigations/MobileNavigations"
import { retrieveAllDoa } from "@/lib/Doa/DoaLib";
import { useCallback, useEffect, useState } from "react";

const DoaScreen = () => {
    const [doa, setDoa] = useState([])
    const [loadedDataCount, setLoadedDataCount] = useState(10);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const getAllDoa = useCallback(async () => {
        const responseDoa = await retrieveAllDoa();
        setTotalDataCount(responseDoa.length);
        setDoa(responseDoa.slice(0, loadedDataCount));
    }, [loadedDataCount]);

    const [searchParam, setSearchParam] = useState('');

    useEffect(() => {
        getAllDoa();
    }, [getAllDoa]);

    const loadMoreData = async () => {
        setLoadedDataCount(prevCount => prevCount + 10);
    };

    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight && loadedDataCount < totalDataCount) {
            loadMoreData();
        } else if (scrollTop === 0 && loadedDataCount > 10) {
            setLoadedDataCount(10);
        }
    }, [loadedDataCount, totalDataCount]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const HandleRealtimeSearch = async (SearchValue: any) => {
        const responseSurah = await retrieveAllDoa();
        if (SearchValue === '') {
            setSearchParam(SearchValue)
            setDoa(responseSurah.slice(0, loadedDataCount));
        } else {
            setSearchParam(SearchValue)
            setDoa(responseSurah);
        }
    }

    const filteredDoa = doa?.filter((doa: any) =>
        doa.judul.toLowerCase().includes(searchParam.toLowerCase())
    );



    return (
        <>
            <div className="mt-5 ml-4 mr-4 mb-5">
                <div className="grid grid-cols-3 gap-7">
                    <div
                        className="col-span-1 text-2xl text-purple-600 font-bold">
                        Doa
                    </div>
                    <div className="col-span-2 text-3xl text-right mr-3 relative">
                        <SearchInput onChange={(e) => HandleRealtimeSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 ml-2 mr-2 mt-10 pb-16">
                {filteredDoa.map((Doa: any, index: number) => {
                    return (
                        <div key={"doa" + index}>
                            <BorderCard title={Doa.judul} subtitle={Doa.arab} className="col-span-1 text-left p-3" />
                        </div>
                    )
                })}
            </div>


            <MobileNavigations />
        </>
    )
}

export default DoaScreen