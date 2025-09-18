import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useFetch
 * Generic data fetcher with loading/error state refetch support.
 * 
 * @param {string} url - endpoint to fetch
 * @param {object} fetch options (method, headers, body, etc.)
 * @return { data, error, loading, refetch}
 */

export default function useFetch (url, options = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(Boolean(url));

    const urlRef = useRef(url);
    const optsRef = useRef(options);

    const controllerRef = useRef(null);

    const doFetch = useCallback(async () => {
        if (!urlRef.current) return;
        setLoading(true);
        setError(null);

        controllerRef.current?.abort?.();
        controllerRef.current = new AbortController();

        console.log("UF fetching", urlRef.current);

        try {
            console.log("UF fetching", urlRef.current)
            const res = await fetch(urlRef.current, {...optsRef.current, signal: controllerRef.current.signal,})
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setData(json);
            console.log("UF success", json);
        } catch (e) {
            if (e.name != "AbortError") {
            setError(e);
            console.warn("UF error", e)
            }
        } finally{
            setLoading(false);
        } 
    },[]);

    useEffect(() => {
        urlRef.current = url;
        optsRef.current = options;
        //doFetch();
        return () => controllerRef.current?.abort?.();
    }, [url, options]);

    return { data, error, loading, refetch: doFetch };
}