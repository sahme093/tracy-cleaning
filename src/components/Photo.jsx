// Shows a photo if `src` is set, otherwise a labelled placeholder.
export default function Photo({ src, alt, placeholder }) {
  if (src) return <img className="photo" src={src} alt={alt} />;
  return <div className="photo-placeholder">{placeholder}</div>;
}
