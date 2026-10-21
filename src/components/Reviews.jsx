import { useState } from "react";
import { BIZ } from "../config.js";

export default function Reviews() {
  const [i, setI] = useState(0);
  const reviews = BIZ.reviews;
  if (!reviews.length) return null;
  const rev = reviews[i % reviews.length];

  return (
    <section style={{ padding: "28px 16px 8px" }}>
      <div
        style={{
          borderTop: "2px solid var(--color-divider)",
          borderBottom: "2px solid var(--color-divider)",
          padding: "20px 0",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "var(--font-heading-weight)",
            fontSize: 60,
            lineHeight: 0.6,
            color: "var(--color-accent)",
            height: 28,
          }}
        >
          “
        </span>
        <p aria-live="polite" style={{ margin: 0, fontSize: 20, lineHeight: 1.35, fontWeight: 600, textWrap: "pretty" }}>
          {rev.text}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ flex: 1, fontSize: 13 }}>
            <b>{rev.name}</b> · {rev.when} · Google
          </span>
          {reviews.length > 1 && (
            <>
              <button
                type="button"
                className="btn btn-secondary btn-icon"
                onClick={() => setI((i - 1 + reviews.length) % reviews.length)}
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-icon"
                onClick={() => setI((i + 1) % reviews.length)}
                aria-label="Next review"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
        <span style={{ fontSize: 13 }}>
          <span style={{ color: "var(--color-accent)" }}>★★★★★</span> {BIZ.rating} from {BIZ.reviewCount} reviews
        </span>
        <a href={BIZ.googleUrl} style={{ fontSize: 13, fontWeight: 600 }}>On Google</a>
      </div>
    </section>
  );
}
