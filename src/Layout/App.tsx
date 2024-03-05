import MobileNavigations from "@/UI/Navigations/MobileNavigations"
import Navigations from "@/UI/Navigations/Navigations"

type propType = {
    'children': React.ReactNode
}

const AppLayout = (prop: propType) => {
    const { children } = prop
    return (
        <div className="bg-gray-100">
            <Navigations />
            {children}
            <MobileNavigations />
        </div>
    )
}

export default AppLayout;