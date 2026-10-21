import { BIZ } from "../config.js";

export default function Services({ onQuote }) {
  return (
    <section style={{ padding: "24px 16px 8px" }}>
      <p style={{ margin: "0 0 20px", fontSize: 17, lineHeight: 1.45, textWrap: "pretty" }}>{BIZ.intro}</p>
      <table className="table">
        <thead>
          <tr>
            <th>Services</th>
            <th aria-hidden="true" />
          </tr>
        </thead>
        <tbody>
          {BIZ.services.map((s, i) => (
            <tr key={s.name} onClick={() => onQuote(i)} style={{ cursor: "pointer" }}>
              <td style={{ padding: "14px 0" }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{s.short}</div>
              </td>
              <td style={{ padding: "14px 0", textAlign: "right" }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuote(i);
                  }}
                  aria-label={`Get a quote for ${s.name}`}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    color: "var(--color-accent-700)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Quote →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
