import NavCard from "@/Components/Card/NavCard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const MobileNavigations = () => {
    const route = useRouter();
    return (
        <nav className="bg-gray-300 shadow-sm fixed bottom-0 w-full h-14">
            <div className="mx-auto max-w-7xl mt-2">
                <div className="grid grid-cols-5 gap-3 ml-5">
                    <div className="col-span-1 text-center ">
                        <NavCard icon="img/icons/homeicons.png" type_icons="img" status_link={route.pathname === "/"} link="/" />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon="img/icons/lampuicons.png" type_icons="img" status_link={route.pathname === "/cari"} />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon="img/icons/sholaticons.png" type_icons="img" status_link={route.pathname === "/bank"} link="/bank" />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon="img/icons/doaicons.png" type_icons="img" status_link={route.pathname === "/Profile"} link="/Profile" />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon="img/icons/bookmarkicons.png" type_icons="img" status_link={route.pathname === "/Profile"} link="/Profile" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MobileNavigations;


