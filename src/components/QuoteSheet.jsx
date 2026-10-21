import { useEffect, useRef, useState } from "react";
import { BIZ } from "../config.js";

const FREQ = [
  ["once", "One-time"],
  ["weekly", "Weekly"],
  ["biweekly", "Every 2 wks"],
];

export const EMPTY_FORM = {
  service: null,
  freq: "once",
  beds: 2,
  baths: 1,
  sqft: "",
  address: "",
  zip: "",
  name: "",
  phone: "",
  email: "",
};

const STEPPERS = [
  ["beds", "Bedrooms", 0, 8],
  ["baths", "Bathrooms", 1, 6],
];

function validate(f) {
  const e = {};
  if (f.service == null) e.service = "Choose a type of clean.";
  if (!f.address.trim()) e.address = "Add the street address.";
  if (!/^\d{5}$/.test(f.zip)) e.zip = "Enter a 5-digit ZIP.";
  if (!f.name.trim()) e.name = "Add your name.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit phone number.";
  if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email.";
  return e;
}

const legendStyle = {
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-neutral-700)",
  padding: 0,
  marginBottom: 8,
};

function Fieldset({ legend, gap = 12, children }) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0, display: "flex", flexDirection: "column", gap }}>
      <legend style={legendStyle}>{legend}</legend>
      {children}
    </fieldset>
  );
}

function TextField({ id, label, error, children, ...inputProps }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className={`input${error ? " has-error" : ""}`} aria-invalid={!!error} {...inputProps} />
      {error && <span className="field-error">{error}</span>}
      {children}
    </div>
  );
}

export default function QuoteSheet({ open, form: f, setForm, onClose, onDone }) {
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const scrollRef = useRef(null);
  const closeRef = useRef(null);

  const scrollTop = () => scrollRef.current && (scrollRef.current.scrollTop = 0);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    setErr({});
    setSent(false);
    scrollTop();
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const set = (k, v) => {
    setForm((s) => ({ ...s, [k]: v }));
    setErr((s) => ({ ...s, [k]: null }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errors = validate(f);
    if (Object.keys(errors).length) {
      setErr(errors);
    } else {
      setErr({});
      setSent(true);
      window.location.href = smsHref;
    }
    scrollTop();
  };

  const errCount = Object.values(err).filter(Boolean).length;
  const zipOutside = /^\d{5}$/.test(f.zip) && !BIZ.zips.includes(f.zip);
  const svc = BIZ.services[f.service];
  const summary = [
    ["Service", svc ? svc.name : ""],
    ["How often", (FREQ.find((x) => x[0] === f.freq) || [0, ""])[1]],
    ["Home", `${f.beds} bed, ${f.baths} bath${f.sqft ? ", " + f.sqft + " sq ft" : ""}`],
    ["Address", `${f.address}, ${f.zip}`],
  ];
  const message = [
    `Hi, I'd like a free quote from ${BIZ.name}.`,
    ...summary.map(([k, v]) => `${k}: ${v}`),
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    f.email.trim() && `Email: ${f.email.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
  // "?&body=" works on both iPhone and Android.
  const smsHref = `sms:${BIZ.phoneRaw}?&body=${encodeURIComponent(message)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Free quote"
      aria-hidden={!open}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 320ms cubic-bezier(.2,.8,.2,1), visibility 320ms",
        visibility: open ? "visible" : "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px 10px 16px",
          borderBottom: "2px solid var(--color-divider)",
          flex: "none",
        }}
      >
        <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)", fontSize: 16 }}>
          Free quote
        </span>
        <button ref={closeRef} type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close" style={{ fontSize: 18 }}>
          ✕
        </button>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>
        {!sent ? (
          <form noValidate onSubmit={submit} style={{ padding: "20px 16px 32px", display: "flex", flexDirection: "column", gap: 22 }}>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-neutral-800)" }}>
              Tell us about your home and we'll text it to {BIZ.name} for you. {BIZ.responseTime}
            </p>

            {errCount > 0 && (
              <div
                role="alert"
                style={{
                  background: "var(--color-accent-100)",
                  color: "var(--color-accent-800)",
                  padding: "10px 12px",
                  fontSize: 14,
                  borderTop: "2px solid var(--color-accent)",
                }}
              >
                {errCount === 1 ? "One field needs attention." : `${errCount} fields need attention.`}
              </div>
            )}

            <Fieldset legend="Type of clean" gap={8}>
              {BIZ.services.map((s, i) => {
                const sel = f.service === i;
                return (
                  <button
                    key={s.name}
                    type="button"
                    role="radio"
                    aria-checked={sel}
                    onClick={() => set("service", i)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      minHeight: 50,
                      padding: "10px 14px",
                      border: sel ? "2px solid var(--color-accent)" : "1px solid var(--color-divider)",
                      background: sel ? "var(--color-accent-100)" : "var(--color-surface)",
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        flex: "none",
                        borderRadius: "50%",
                        border: "1.5px solid var(--color-divider)",
                        boxShadow: sel ? "inset 0 0 0 3px var(--color-bg), inset 0 0 0 8px var(--color-accent)" : "none",
                      }}
                    />
                    <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{s.name}</span>
                  </button>
                );
              })}
              {err.service && <span className="field-error">{err.service}</span>}
            </Fieldset>

            <Fieldset legend="How often" gap={8}>
              <div className="seg">
                {FREQ.map(([id, label]) => (
                  <label key={id} className={`seg-opt${f.freq === id ? " is-checked" : ""}`}>
                    <input type="radio" name="freq" checked={f.freq === id} onChange={() => set("freq", id)} />
                    {label}
                  </label>
                ))}
              </div>
            </Fieldset>

            <Fieldset legend="Your home">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {STEPPERS.map(([k, label, min, max]) => (
                  <div key={k} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <span style={{ fontSize: 12, color: "var(--color-neutral-800)" }}>{label}</span>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
                      <button type="button" className="btn btn-plain btn-icon" onClick={() => set(k, Math.max(min, f[k] - 1))} aria-label={`Fewer ${label.toLowerCase()}`} style={{ fontSize: 18 }}>
                        −
                      </button>
                      <span aria-live="polite" style={{ flex: 1, textAlign: "center", fontWeight: 600, fontSize: 17 }}>{f[k]}</span>
                      <button type="button" className="btn btn-plain btn-icon" onClick={() => set(k, Math.min(max, f[k] + 1))} aria-label={`More ${label.toLowerCase()}`} style={{ fontSize: 18 }}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <TextField
                id="q-sqft"
                label="Square footage (approx.)"
                inputMode="numeric"
                placeholder="1,500"
                value={f.sqft}
                onChange={(e) => set("sqft", e.target.value.replace(/[^\d,]/g, ""))}
              />
              <TextField
                id="q-address"
                label="Street address"
                autoComplete="street-address"
                placeholder="123 Main St"
                value={f.address}
                error={err.address}
                onChange={(e) => set("address", e.target.value)}
              />
              <TextField
                id="q-zip"
                label="ZIP code"
                inputMode="numeric"
                maxLength={5}
                autoComplete="postal-code"
                value={f.zip}
                error={err.zip}
                onChange={(e) => set("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
              >
                {zipOutside && (
                  <span style={{ fontSize: 13, color: "var(--color-neutral-800)" }}>
                    Outside our usual area. We'll confirm whether we can make it.
                  </span>
                )}
              </TextField>
            </Fieldset>

            <Fieldset legend="Contact">
              <TextField id="q-name" label="Name" autoComplete="name" value={f.name} error={err.name} onChange={(e) => set("name", e.target.value)} />
              <TextField id="q-phone" label="Phone" type="tel" autoComplete="tel" value={f.phone} error={err.phone} onChange={(e) => set("phone", e.target.value)} />
              <TextField id="q-email" label="Email (optional)" type="email" autoComplete="email" value={f.email} error={err.email} onChange={(e) => set("email", e.target.value)} />
            </Fieldset>

            <button type="submit" className="btn btn-primary btn-wide" style={{ minHeight: 54 }}>
              <span>Text my quote request</span>
              <span aria-hidden="true">→</span>
            </button>
            <p className="muted" style={{ margin: "-10px 0 0", fontSize: 12 }}>
              Opens your messages app with the details filled in. No payment needed.
            </p>
          </form>
        ) : (
          <div style={{ padding: "28px 16px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              aria-hidden="true"
              style={{
                width: 56,
                height: 56,
                background: "var(--color-accent)",
                color: "var(--color-bg)",
                display: "grid",
                placeItems: "center",
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              ✓
            </span>
            <h2>Almost done, {f.name.trim().split(" ")[0]}. Tap send in your messages app.</h2>
            <p style={{ margin: 0, fontSize: 15, color: "var(--color-neutral-800)" }}>
              Your text to {BIZ.phone} is filled in and ready. {BIZ.responseTime}
            </p>
            <a href={smsHref} className="btn btn-primary btn-wide" style={{ minHeight: 52 }}>
              <span>Messages didn't open? Tap here</span>
              <span aria-hidden="true">→</span>
            </a>
            <p className="muted" style={{ margin: 0, fontSize: 12 }}>
              On a computer? Text or call {BIZ.phone} with the details below.
            </p>
            <table className="table">
              <tbody>
                {summary.map(([k, v]) => (
                  <tr key={k}>
                    <td className="muted" style={{ padding: "10px 0" }}>{k}</td>
                    <td style={{ padding: "10px 0", textAlign: "right", fontWeight: 600 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="btn btn-secondary" onClick={onDone} style={{ minHeight: 48, justifyContent: "flex-start" }}>
              Back to site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
