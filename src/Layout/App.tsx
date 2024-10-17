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

const AppLayout = (prop: propType) => {
    const { children, NavigationType, linkNavigation, NavbarTitle, title } = prop

    useEffect(() => {
        document.title = title ?? 'CAHNOMNGAJI'
    })
    return (
        <div className="dark:bg-black bg-gray-100">
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