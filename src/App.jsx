import { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import CustomerDirectory from "./components/CustomerDirectory";

export default function App() {
  const [title, setTitle] = useState("Custom Hooks Demo");

  console.log ("App rendered");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
        <h1> {title} </h1>
        <p>
          This demo will showcase two custom hooks:
          <strong>Theme Toggle (with useLocalStorage)</strong> and <strong> useFetch </strong>
        </p>

        <section style={{marginTop: 24}}>
          <h2>Theme Toggle (with useLocalStorage)</h2>
          <ThemeToggle onTitleChange={setTitle} />
        </section>

        <section style={{marginTop: 24}}>
          <h2>Customer Directory ( with useFetch)</h2>
          <CustomerDirectory />
        </section>

    </div>
  )
}