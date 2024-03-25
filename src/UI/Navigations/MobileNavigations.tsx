import NavCard from "@/Components/Card/NavCard";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";


const HomeIcons = "img/icons/homeicons.png";
const SholatIcons = "img/icons/sholaticons.png";
const DoaIcons = "img/icons/doaicons.png";
const LampuIcons = "img/icons/lampuicons.png";
const PrayerActiveIcons = "img/icons/activeSholat1.png";

const MobileNavigations = () => {
    const route = useRouter();
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const toggleTheme = () => {
        theme === "dark" ? setTheme('light') : setTheme("dark");
    };

    const themeIcon = currentTheme === "dark" ? "bx bx-sun" : "bx bx-moon";

    return (
        <nav className="dark:bg-black bg-gray-300 shadow-sm fixed bottom-0 w-full h-14">
            <div className="mx-auto max-w-7xl mt-2">
                <div className="grid grid-cols-4 gap-3 ml-5">
                    <div className="col-span-1 text-center ">
                        <NavCard icon={HomeIcons} type_icons="img" status_link={route.pathname === "/"}
                            link="/" />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon={SholatIcons} active_icons={PrayerActiveIcons} type_icons="img" status_link={route.pathname === "/SchedulePrayer"}
                            link="/SchedulePrayer" />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon={DoaIcons} type_icons="img" status_link={route.pathname === "/Profile"}
                            link="/Profile" />
                    </div>
                    <div className="col-span-1 text-center">
                        <i suppressHydrationWarning={true} className={`${themeIcon} text-4xl mr-5 cursor-pointer`} onClick={toggleTheme}></i>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MobileNavigations;
