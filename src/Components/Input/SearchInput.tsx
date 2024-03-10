import { useState } from 'react';

const Home = () => {
    const [isActiveSearch, setIsActiveSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSearch = () => {
        setIsActiveSearch(!isActiveSearch);
        setSearchQuery('');
    };

    const handleSearchInputChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
        setIsActiveSearch(false);
        setSearchQuery('');
    };

    return (
        <div className="container flex flex-col justify-center items-center min-h-screen bg-green-500">
            <h1 className="title text-2xl text-black mb-8">Search Example</h1>
            <form
                className={`search-form relative w-${isActiveSearch ? 'full' : '12'} h-12 rounded-full bg-white shadow-md p-3 transition-width`}
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    className="search-input bg-white border-none outline-none w-full h-full rounded-full pl-4 text-sm"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    disabled={!isActiveSearch}
                />
                <button
                    type="button"
                    className="search-button w-12 h-12 rounded-full bg-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all"
                    onClick={toggleSearch}
                >
                    <span className={`search-icon text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isActiveSearch ? 'opacity-0' : 'opacity-100'}`}>
                        Search
                    </span>
                    <span className={`search-close text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isActiveSearch ? 'opacity-100' : 'opacity-0'}`}>
                        X
                    </span>
                </button>
            </form>
        </div>
    );
};

export default Home;
