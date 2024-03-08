const Navigations = () => {
    return (
        <nav className="dark:bg-black bg-gray-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="justify-start text-2xl font-semibold flex flex-nowrap">
                        <i className='bx bx-menu-alt-left text-4xl mr-2'></i>
                        <div className="dark:text-white text-purple-600">
                        Quran App
                        </div>
                    </div>

                    <div className="justify-end">
                        <i className='bx bx-search text-3xl mt-1 mr-2'></i>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigations