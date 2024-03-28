import { useEffect, useState } from 'react';

type PropsType = {
    'className'?: string,
    'onChange'?: (e: any) => void,
}



const SearchInput = (props: PropsType) => {

    const { onChange } = props;

    const toggleSearch = () => {
        const closeButton = document.querySelector('.close-button');
        const SearchButton = document.querySelector('.search-button');
        const inputField = document.querySelector('.search-input');
        closeButton?.classList.toggle('hidden');
        SearchButton?.classList.toggle('hidden');
        inputField?.classList.toggle('w-56');
        inputField?.classList.toggle('w-10');
        inputField?.classList.toggle('rounded-lg');
        inputField?.classList.toggle('rounded-full');
        inputField?.classList.toggle('p-5');
        inputField?.classList.toggle('p-2');
    };


    useEffect(() => {
        return () => {
            const searchButton = document.querySelector('.search-button');
            const searchInput = document.querySelector('.search-input');
            searchButton?.removeEventListener('click', toggleSearch);
            searchInput?.removeEventListener('keydown', toggleSearch);
        };

    }, []);


    return (
        <>
            <input type="text"
                className="bg-white border-none outline-none w-10 h-10 rounded-full p-2 
                            transition-width duration-500 search-input text-black"
                onChange={onChange} />
            <i className='bx bx-search-alt-2 search-button absolute top-1 right-1 text-purple-600'
                onClick={toggleSearch}></i>
            <i className='bx bx-x-circle bg-purple-600 rounded-full p-1 close-button hidden absolute top-0 right-0'
                onClick={toggleSearch}></i>
        </>
    );
};

export default SearchInput;
