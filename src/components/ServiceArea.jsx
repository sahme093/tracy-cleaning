import { useState } from "react";
import { BIZ } from "../config.js";

export default function ServiceArea() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState(null);

  const check = (e) => {
    e.preventDefault();
    if (/^\d{5}$/.test(zip)) setResult(BIZ.zips.includes(zip) ? "yes" : "no");
  };

  return (
    <section style={{ padding: "20px 16px 32px" }}>
      <h3 style={{ margin: "0 0 6px" }}>Where we clean</h3>
      <p style={{ margin: "0 0 14px", fontSize: 15 }}>{BIZ.towns.join(", ")}</p>
      <form onSubmit={check} style={{ display: "flex", gap: 8 }}>
        <input
          className="input"
          inputMode="numeric"
          maxLength={5}
          placeholder="Check your ZIP"
          aria-label="ZIP code"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
            setResult(null);
          }}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-secondary" style={{ minHeight: 48 }}>Check</button>
      </form>
      {result && (
        <p
          aria-live="polite"
          style={{
            margin: "10px 0 0",
            fontSize: 14,
            color: result === "yes" ? "var(--color-text)" : "var(--color-accent-700)",
          }}
        >
          {result === "yes"
            ? `Yes, we clean in ${zip}.`
            : `${zip} is outside our usual area. Request a quote anyway and we'll let you know.`}
        </p>
      )}
      <p className="muted" style={{ fontSize: 12, margin: "24px 0 0" }}>
        {BIZ.name} · {BIZ.phone} · {BIZ.hours}
      </p>
    </section>
  );
}
