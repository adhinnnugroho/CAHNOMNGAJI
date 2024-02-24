import React from "react"

type PropsType = {
    'children': React.ReactNode,
    'icons'?: string,
    'className'?: string
}

const BorderButton = (prop: PropsType) => {
    const { children, icons, className } = prop
    return (
        <a className={`border border-green-600 rounded-lg py-2 px-4 flex text-xl  ${className}`}>
            <i className={`bx bxl-${icons} text-2xl mr-11`} />
            {children}
        </a>
    )
}

export default BorderButton