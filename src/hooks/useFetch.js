import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useFetch
 * Generic data fetcher with loading/error state refetch support.
 *
 * @param {string} url - endpoint to fetch
 * @param {object} fetch options (method, headers, body, etc.)
 * @return { data, error, loading, refetch}
 */

// FIXED: Moved default options outside component to prevent new object creation on every render
const DEFAULT_OPTIONS = {};

export default function useFetch (url, options = DEFAULT_OPTIONS) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(Boolean(url));

    const controllerRef = useRef(null);

    // FIXED: Simplified approach - doFetch uses current url/options directly instead of refs
    // This prevents stale closure issues and eliminates the need for refs
    const doFetch = useCallback(async () => {
        if (!url) return;
        setLoading(true);
        setError(null);

        controllerRef.current?.abort?.();
        controllerRef.current = new AbortController();

        console.log("UF fetching", url);

        try {
            // FIXED: Use url and options directly instead of refs to avoid stale closures
            const res = await fetch(url, {...options, signal: controllerRef.current.signal,})
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setData(json);
            console.log("UF success", json);
        } catch (e) {
            // FIXED: Changed != to !== for strict equality comparison (was e.name != "AbortError")
            // This ensures proper type checking and follows JavaScript best practices
            if (e.name !== "AbortError") {
            setError(e);
            console.warn("UF error", e)
            }
        } finally{
            setLoading(false);
        }
    }, [url, options]); // FIXED: Include url and options as dependencies so doFetch updates when they change

    useEffect(() => {
        // FIXED: Simply call doFetch when url or options change
        // The doFetch callback will automatically have the latest values
        doFetch();
        return () => controllerRef.current?.abort?.();
    }, [doFetch]); // FIXED: Only depend on doFetch - it already includes url/options dependencies

    return { data, error, loading, refetch: doFetch };
}