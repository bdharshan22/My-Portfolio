import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        console.log('[ThemeToggle] Mounted. Theme:', theme, 'Resolved:', resolvedTheme)
    }, [theme, resolvedTheme])

    if (!mounted) {
        return (
            <button className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    }

    const toggle = () => {
        const next = theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        // Timeout to let DOM update
        setTimeout(() => {
            console.log('[ThemeToggle] DOM Classes:', document.documentElement.className);
        }, 100);
    }

    return (
        <button
            onClick={toggle}
            className="relative p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer z-50 pointer-events-auto"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
