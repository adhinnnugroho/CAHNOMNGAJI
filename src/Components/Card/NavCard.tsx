import Image from "next/image";
import Link from "next/link";

type PropsType = {
    'icon': string,
    'status_link'?: boolean,
    'link'?: string | URL,
    'type_icons'?: string,
    'active_icons'?: string
}
const NavCard = (prop: PropsType) => {
    const { icon, status_link, link, type_icons, active_icons } = prop;
    const className = status_link ?
        'bg-green-500 p-5 w-16 h-16 rounded-full -mt-6  border-4 border-gray-100 shadow flex justify-center items-center'
        : '';
    const ClassNameIcon = status_link ? 'text-white' : 'text-black';
    const ActiveIcon = status_link ? active_icons : icon;


    if (type_icons == "text") {
        return (
            <div>
                <Link href={link ? link.toString() : '/'} >
                    <div className={className}>
                        <i className={`bx bxs-${icon}  text-3xl ${ClassNameIcon}`} />
                    </div>
                </Link>
            </div>
        )
    } else if (type_icons == "img") {

        return (
            <div>
                <Link href={link ? link.toString() : '/'} >
                    <Image src={`/${ActiveIcon}`} width={40} height={40} alt="ramadhan" />
                </Link>
            </div>
        )
    } else {
        return null;
    }
}

export default NavCard