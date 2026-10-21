import { BIZ } from "../config.js";
import Photo from "./Photo.jsx";

export default function Gallery() {
  const photos = BIZ.gallery;
  if (!photos.length) return null;

  return (
    <section style={{ padding: "24px 16px 8px" }}>
      <h3 style={{ margin: "0 0 4px" }}>Our work</h3>
      <p className="muted" style={{ margin: "0 0 12px", fontSize: 13 }}>Homes we've cleaned recently.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {photos.map((p, i) => (
          <figure key={p.src || i} style={{ margin: 0 }}>
            <div style={{ position: "relative", aspectRatio: "3 / 4", border: "2px solid var(--color-text)", overflow: "hidden" }}>
              <Photo src={p.src} alt={p.caption} placeholder="[Photo]" />
            </div>
            <figcaption style={{ fontSize: 13, marginTop: 4 }}>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
