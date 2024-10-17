import Link from "next/link";

type PropsType = {
    'SurahName': any,
    'link'?: string | URL,
}


const BackNavigations = (props: PropsType) => {
    const { SurahName, link } = props;
    return (
        <nav className="dark:bg-black bg-gray-100 border border-transparent border-b-gray-600 p-2">
            <div className="grid grid-cols-3 gap-5 items-center">
                <div className="col-span-1 flex items-center">
                    <Link href={link ? link.toString() : '/'}>
                        <div className="justify-start text-2xl font-semibold flex">
                            <i className='bx bx-chevron-left text-4xl font-bold mr-2'></i>
                        </div>
                    </Link>
                </div>

                <div className="col-span-1 flex justify-center items-center">
                    <h1 className="dark:text-white text-purple-600 font-semibold text-xl">
                        {SurahName}
                    </h1>
                </div>

                <div className="col-span-1"></div>
            </div>
        </nav>

    )
}

export default BackNavigations