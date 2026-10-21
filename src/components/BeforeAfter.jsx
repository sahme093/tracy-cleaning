import { useState } from "react";
import { BIZ } from "../config.js";
import Photo from "./Photo.jsx";

const label = {
  position: "absolute",
  top: 8,
  color: "var(--color-bg)",
  padding: "3px 7px",
  pointerEvents: "none",
};

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <section style={{ padding: "24px 16px 8px" }}>
      <h3 style={{ margin: "0 0 4px" }}>Before &amp; after</h3>
      <p className="muted" style={{ margin: "0 0 12px", fontSize: 13 }}>Drag the slider to compare.</p>
      <div style={{ position: "relative", height: 260, border: "2px solid var(--color-text)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Photo src={BIZ.photos.after} alt="After cleaning" placeholder="[After photo]" />
        </div>
        <div

          style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Photo src={BIZ.photos.before} alt="Before cleaning" placeholder="[Before photo — same angle]" />
        </div>
        <span
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${pos}%`,
            width: 2,
            background: "var(--color-accent)",
            pointerEvents: "none",
          }}
        />
        <span className="eyebrow" style={{ ...label, left: 8, background: "var(--color-text)" }}>Before</span>
        <span className="eyebrow" style={{ ...label, right: 8, background: "var(--color-accent)" }}>After</span>
      </div>
      <input
        type="range"
        className="ba-range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(+e.target.value)}
        aria-label="Compare before and after"
      />
      <span style={{ fontSize: 13 }}>{BIZ.beforeAfterCaption}</span>
    </section>
  );
}
