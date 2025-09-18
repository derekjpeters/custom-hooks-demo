import useFetch from "../hooks/useFetch";
import { useState } from "react";

export default function CustomerDirectory() {
    const [filter, setFilter] = useState("All");
    const { data, error, loading, refetch } = useFetch("/public/data/customers.json");

    const customers = data?.customers ?? [];
    const filtered = filter === "All"
        ? customers
        : customers.filter(c => c.status === filter);
        console.log("CD render", {filter, count: filtered.length });

        return (
            <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option>All</option>
                        <option>Active</option>
                        <option>At Risk</option>
                        <option>Churned</option>
                    </select>
                    <button onClick={refetch} disabled={loading}>Refresh</button>
                </div>

                {loading && <p>Loading Customer List...</p>}
                {error && <p style={{ color: "red" }}>Error Loading Data.</p>}

                <ul style={{ paddingLeft: 20 }}>
                    {filtered.map((c, i)=> (
                        <li key={i}>
                            <strong>{c.name}</strong> - {c.account} ({c.status})
                        </li>
                    ))}
                </ul>
            </div>
        )
}