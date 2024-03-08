import NavCard from "@/Components/Card/NavCard";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const MobileNavigations = () => {
    const route = useRouter();
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    // Fungsi untuk menangani perubahan tema
    const toggleTheme = () => {
        // Ubah tema tergantung pada tema yang sedang aktif
        theme === "dark" ? setTheme('light') : setTheme("dark");
    };
    return (
        <nav className="dark:bg-black bg-gray-300 shadow-sm fixed bottom-0 w-full h-14">
            <div className="mx-auto max-w-7xl mt-2">
                <div className="grid grid-cols-5 gap-3 ml-5">
                    <div className="col-span-1 text-center ">
                        <NavCard icon="img/icons/homeicons.png" type_icons="img" status_link={route.pathname === "/"}
                            link="/" />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon="img/icons/lampuicons.png" type_icons="img" status_link={route.pathname === "/cari"} />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon="img/icons/sholaticons.png" type_icons="img" status_link={route.pathname === "/bank"}
                            link="/bank" />
                    </div>
                    <div className="col-span-1 text-center">
                        <NavCard icon="img/icons/doaicons.png" type_icons="img" status_link={route.pathname === "/Profile"}
                            link="/Profile" />
                    </div>
                    <div className="col-span-1 text-center">
                        <i className={`bx ${theme === "dark" ? 'bx-moon' : 'bx-sun'} text-4xl mr-5 cursor-pointer`} onClick={toggleTheme}></i>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MobileNavigations;
