import { useEffect, useRef, useState } from "react";

/**
 * useLocalStorage
 * A drop-in replacement for useState that persists to localStorage
 */

export default function useLocalStorage(key, initialValue) {
    console.log("ULS init for key:", key);

    const isFirst = useRef(true);
}