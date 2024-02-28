import MobileNavigations from "@/UI/Navigations/MobileNavigations"

type propType = {
    'children': React.ReactNode
}

const AppLayout = (prop: propType) => {
    const { children } = prop
    return (
        <div>
            {children}
            <MobileNavigations />
        </div>
    )
}

export default AppLayout;