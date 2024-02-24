import Link from "next/link";


type PropsType = {
    'type': "button" | "submit" | "reset" | undefined,
    'children': React.ReactNode,
    'className'?: string,
    'bg_color'?: string,
    'link'?: string | URL
}

const SimpleButton = (prop: PropsType) => {
    const { type, children, bg_color, className, link } = prop
    const bgcolor = bg_color ?? "bg-blue-500"
    return (
        <Link href={link ? link.toString() : '/'} >
            <button type={type} className={`text-white font-medium py-2 px-4 rounded-lg ${bgcolor} ${className}`}>
                {children}
            </button>
        </Link>
    )
}

export default SimpleButton;