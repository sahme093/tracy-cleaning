import { BIZ } from "../config.js";

export default function BottomBar({ onQuote }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 6,
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        display: "flex",
        gap: 8,
        padding: "10px 12px calc(14px + env(safe-area-inset-bottom))",
        background: "var(--color-text)",
        borderTop: "2px solid var(--color-divider)",
      }}
    >
      <button type="button" className="btn btn-primary btn-wide" onClick={onQuote} style={{ flex: 1 }}>
        <span>Get a free quote</span>
        <span aria-hidden="true">→</span>
      </button>
      <a href={`sms:${BIZ.phoneRaw}`} className="btn btn-secondary" style={{ minHeight: 52, padding: "0 14px", background: "var(--color-bg)" }}>
        Text
      </a>
      <a href={`tel:${BIZ.phoneRaw}`} className="btn btn-secondary" style={{ minHeight: 52, padding: "0 14px", background: "var(--color-bg)" }}>
        Call
      </a>
    </div>
  );
}
