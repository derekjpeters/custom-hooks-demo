import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

export default function ThemeToggle ({ onTitleChange }) {
    const [theme, setTheme, isHydrated] = useLocalStorage("theme", "light");

    useEffect(() => {
        document.body.style.background = theme === "dark" ? "#111" : '#fff';
        document.body.style.color = theme === "dark" ? "#eee" : "#111";

        onTitleChange?.(`Custom Hook Demo - ${theme} mode`);
        console.log("TT applied theme", theme);
    }, [theme, onTitleChange]);

    if (!isHydrated) return <p>Theme Loading...</p>

    return (
        <div style={{ display: "inline-flex", gap: 12, alignItems: "center"}}>
            <span>Current Theme: <strong>{theme}</strong></span>
            <button onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}>
                Toggle Theme
            </button>
            <button onClick={() => setTheme("light")}>Light Mode</button>
            <button onClick={() => setTheme("dark")}>Dark Mode</button>
        </div>
    )

}