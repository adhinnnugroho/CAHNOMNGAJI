import Link from "next/link";

type PropsType = {
    'icon': string,
    'status_link'?: boolean,
    'link'?: string | URL
}
const NavCard = (prop: PropsType) => {
    const { icon, status_link, link } = prop;
    const className = status_link ? 'bg-green-500 p-5 w-16 h-16 rounded-full -mt-6  border-4 border-gray-100 shadow flex justify-center items-center'
        : '';
    const ClassNameIcon = status_link ? 'text-white' : 'text-black';
    return (
        <div>
            <Link href={link ? link.toString() : '/'} >
                <div className={className}>
                    <i className={`bx bxs-${icon}  text-3xl ${ClassNameIcon}`} />
                </div>
            </Link>
        </div>
    )
}

export default NavCard