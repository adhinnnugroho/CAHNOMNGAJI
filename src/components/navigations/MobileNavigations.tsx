import { useRouter } from "next/router";

import {
    HomeIcons,
    HomeIconsActive,
    SholatIcons,
    DoaIcons,
    DoaIconsActive,
    PrayerActiveIcons
} from "@/core/constants/icons";

import useToggleTheme from "@/core/hooks/useToggleThemes";
import NavCard from "../Card/NavCard";

const MobileNavigations = () => {
    const route = useRouter();
    const { theme, toggleTheme, mounted } = useToggleTheme();

    if (!mounted) return null;

    return (
        <div className="dark:bg-black bg-white  transition-all duration-700 ease-in-out fixed bottom-0  w-full border border-transparent dark:border-t-gray-400 border-t-gray-400 p-2 ">
            <div className="grid grid-cols-4 gap-3 ml-5">
                <div className="col-span-1 text-center ">
                    <NavCard icon={HomeIcons} active_icons={HomeIconsActive} status_link={route.pathname === "/home"}
                        link="/home" />
                </div>
                <div className="col-span-1 text-center">
                    <NavCard icon={SholatIcons} active_icons={PrayerActiveIcons} status_link={route.pathname === "/SchedulePrayer"}
                        link="/SchedulePrayer" />
                </div>
                <div className="col-span-1 text-center">
                    <NavCard icon={DoaIcons} active_icons={DoaIconsActive} status_link={route.pathname === "/Doa"}
                        link="/Doa" />
                </div>
                <div className="col-span-1 text-center">
                    <button type="button" onClick={toggleTheme}>
                        <i className={`bx bx-${theme === "dark" ? "sun" : "moon"} text-4xl mr-5 cursor-pointer transition-all duration-700 ease-in-out`} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MobileNavigations;
