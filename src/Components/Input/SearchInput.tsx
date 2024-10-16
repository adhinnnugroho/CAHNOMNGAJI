import { useState } from 'react';

type PropsType = {
    onChange?: (e: any) => void,
}

const SearchInput = ({ onChange }: PropsType) => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const toggleButtonSearch = () => {
        setToggleSearch(toggleSearch => !toggleSearch);
    }

    return (
        <div className="flex justify-end">
            <div className={`relative ${!toggleSearch ? 'w-56 ' : 'w-11 h-11'} transition-all duration-700 ease-in-out`}>
                <input
                    type="text"
                    className={`bg-white border-none outline-none w-full h-full ${!toggleSearch ? 'rounded-lg' : 'rounded-full'} transition-all ease-in-out p-2 transition-width duration-500 text-black text-center`}
                    onChange={onChange}
                />
                <button onClick={toggleButtonSearch}>
                    <i className={`bx bx-${toggleSearch ? 'search-alt-2' : 'x-circle'} font-semibold absolute inset-0 flex ${!toggleSearch ? 'justify-end mr-4' : 'justify-center'} items-center transition-all duration-700 ease-in-out text-purple-600 cursor-pointer`} />
                </button>
            </div>
        </div>
    );
};

export default SearchInput;
