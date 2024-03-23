import BackNavigations from "@/UI/Navigations/BackNavigations"
import MobileNavigations from "@/UI/Navigations/MobileNavigations"
import Navigations from "@/UI/Navigations/Navigations"

type propType = {
    'children': React.ReactNode,
    'NavigationType'?: String,
    'linkNavigation'?: string | URL,
    'NavbarTitle'?: string
}

const AppLayout = (prop: propType) => {
    const { children, NavigationType,linkNavigation, NavbarTitle } = prop
    return (
        <div className="dark:bg-black bg-gray-100">
            {NavigationType === "Back" ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} /> : <Navigations />}
            {children}
            <MobileNavigations />
        </div>
    )
}

export default AppLayout;