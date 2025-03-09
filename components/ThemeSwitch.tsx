'use client'

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";


export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return (
        <Image
        src=""
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle" />
    )

    if (resolvedTheme === 'dark') {
        return <FiSun className="text-white ml-1 cursor-pointer hover:text-white/85 active:scale-95" size={25}
        onClick={() => setTheme('light')} />
    }

    if (resolvedTheme === 'light') {
        return <FiMoon className="text-black ml-1 cursor-pointer hover:text-black/85 active:scale-95" size={25}
         onClick={() => setTheme('dark')} />
    }
}