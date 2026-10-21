import { BIZ } from "../config.js";
import { MessageIcon, PhoneIcon } from "./Icons.jsx";

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 12px 10px 16px",
        borderBottom: "2px solid var(--color-divider)",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "var(--font-heading-weight)",
            fontSize: 16,
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
          }}
        >
          {BIZ.name}
        </span>
        <span className="muted" style={{ fontSize: 11 }}>{BIZ.area}</span>
      </div>
      <a href={`sms:${BIZ.phoneRaw}`} className="btn btn-secondary btn-icon" aria-label="Text">
        <MessageIcon />
      </a>
      <a href={`tel:${BIZ.phoneRaw}`} className="btn btn-primary btn-icon" aria-label="Call">
        <PhoneIcon />
      </a>
    </header>
  );
}
