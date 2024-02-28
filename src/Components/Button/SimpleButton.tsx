import Link from "next/link";


type PropsType = {
    'type': "button" | "submit" | "reset" | undefined,
    'children': React.ReactNode,
    'className'?: string,
    'bg_color'?: string,
    'link'?: string | URL,
    'rounded'?: string
}

const SimpleButton = (prop: PropsType) => {
    const { type, children, bg_color, className, link, rounded } = prop
    const bgcolor = bg_color ?? "bg-blue-500"
    const Classrounded = rounded ?? "rounded-lg"
    if (type === "submit") {
        return (
            <button type={type} className={`text-white font-medium py-2 px-4 ${Classrounded}  ${bgcolor} ${className}`}>
                {children}
            </button>
        )
    }
    return (
        <Link href={link ? link.toString() : ''} >
            <button type={type} className={`text-white font-medium py-2 px-4 ${Classrounded}  ${bgcolor} ${className}`}>
                {children}
            </button>
        </Link>
    )
}

export default SimpleButton;