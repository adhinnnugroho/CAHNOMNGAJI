import BackNavigations from "@/components/navigations/BackNavigations"
import MobileNavigations from "@/components/navigations/MobileNavigations"
import Navigations from "@/components/navigations/Navigations"
import { useEffect } from "react"

type propType = {
    'children': React.ReactNode,
    'NavigationType'?: string,
    'linkNavigation'?: string | URL,
    'NavbarTitle'?: string,
    'title'?: string
}

const AppLayout = ({ children, NavigationType, linkNavigation, NavbarTitle, title }: propType) => {

    useEffect(() => {
        document.title = title ?? 'CAHNOMNGAJI'
    })
    return (
        <div className="dark:bg-black bg-gray-100  transition-all duration-700 ease-in-out">
            <div className="lg:hidden block">
                {NavigationType === "Back" ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} /> : <Navigations />}
            </div>
            {children}

            <div className="lg:hidden block">
                <MobileNavigations />
            </div>

        </div>
    )
}

export default AppLayout;