import Link from "next/link";

type PropsType = {
    'SurahName': string | undefined,
    'link'?: string | URL,
}


const BackNavigations = (props: PropsType) => {
    const { SurahName, link } = props;
    return (
        <nav className="dark:bg-gray-800 bg-gray-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <Link href={link ? link.toString() : '/'} >
                        <div className="justify-start text-2xl font-semibold flex flex-nowrap">
                            <i className='bx bx-left-arrow-alt text-4xl mr-2' />
                            <div className="dark:text-white text-purple-600">
                                {SurahName}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default BackNavigations