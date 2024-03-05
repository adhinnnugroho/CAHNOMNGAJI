import AppLayout from "@/Layout/App"
import Image from "next/image"

const HomeScreen = () => {
    return (
        <AppLayout>
            <div className="mt-5 ml-5 font-semibold text-2xl">
                Asslamualaikum

            </div>
            <div className="ml-2 mr-2 mt-10">
                <Image src={"/img/last_read.png"}
                    width={330}
                    height={60}
                    alt="ramadhan"
                    className="w-screen" />
            </div>

            <div className="mt-5 ml-3 mb-5">
                <div className="grid grid-cols-4 gap-7">
                    <div className="col-span-1 text-2xl text-purple-600 border-2 border-gray-100 
                    border-b-purple-600 font-bold">
                        Surah
                    </div>
                    <div className="col-span-1 text-2xl">
                        Para
                    </div>
                    <div className="col-span-1 text-2xl">
                        Page
                    </div>
                    <div className="col-span-1 text-2xl">
                        Hijb
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

export default HomeScreen