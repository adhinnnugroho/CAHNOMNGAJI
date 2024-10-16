import BackNavigations from "@/components/navigations/BackNavigations"
import MobileNavigation from "@/components/navigations/MobileNavigation"
import Navigations from "@/components/navigations/Navigations"
import { useEffect } from "react"

type propType = {
    'children': React.ReactNode,
    'NavigationType'?: string,
    'linkNavigation'?: string | URL,
    'NavbarTitle'?: string,
    'title'?: string
}

const MainLayouts = ({ children, NavigationType, linkNavigation, NavbarTitle, title }: propType) => {

    useEffect(() => {
        document.title = title ?? 'CAHNOMNGAJI'
    })

    return (
        <div className="dark:bg-black bg-gray-100 h-screen transition-colors duration-700 ease-in-out">
            <div className="lg:hidden block">
                {NavigationType === "Back" ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} /> : <Navigations />}
            </div>

            {children}

            <MobileNavigation />
        </div>
    )
}

export default MainLayouts;