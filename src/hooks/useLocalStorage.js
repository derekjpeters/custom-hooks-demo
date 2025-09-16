import { useEffect, useRef, useState } from "react";

/**
 * useLocalStorage
 * A drop-in replacement for useState that persists to localStorage
 */

export default function useLocalStorage(key, initialValue) {
    console.log("ULS init for key:", key);

    const isFirst = useRef(true);
}

const [value, setValue] = useState(() => {
    try {
        const raw = window.localStorage.getItem(key);
        if (raw !== null) {
            console.log("ULS found existing value", raw)
            return JSON.parse(raw);
        }
    } catch (e) {
        console.warn("ULS read error", e)
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
});

const [isHydrated, setIsHydrated] = useState(false)

useEffect(() => setIsHydrated(true), []);

useEffect(() => {
    if (isFirst.current) {
        isFirst.current = false
        return;
    }
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        console.log("ULS wrote value", {key, value});
    } catch (e) {
        console.warn("ULS write error", e)
    }

    return [value, setValue, isHydrated];

})
