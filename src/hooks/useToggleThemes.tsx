import { useTheme } from 'next-themes'; // Jika menggunakan next-themes
import { useEffect, useState } from 'react';

const useToggleTheme = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const toggleTheme = () => {
        // Toggle theme between light and dark
        resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
    };

    return { theme: resolvedTheme, toggleTheme, mounted };
};

export default useToggleTheme;
