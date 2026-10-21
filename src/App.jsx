import { useEffect, useState } from "react";
import { BIZ } from "./config.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import BeforeAfter from "./components/BeforeAfter.jsx";
import Gallery from "./components/Gallery.jsx";
import Reviews from "./components/Reviews.jsx";
import ServiceArea from "./components/ServiceArea.jsx";
import BottomBar from "./components/BottomBar.jsx";
import QuoteSheet, { EMPTY_FORM } from "./components/QuoteSheet.jsx";

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    document.title = BIZ.name;
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", quoteOpen);
  }, [quoteOpen]);

  const openQuote = (serviceIndex) => {
    if (serviceIndex != null) {
      const recurring = BIZ.services[serviceIndex]?.recurring;
      setForm((f) => ({
        ...f,
        service: serviceIndex,
        freq: recurring && f.freq === "once" ? "biweekly" : f.freq,
      }));
    }
    setQuoteOpen(true);
  };

  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Services onQuote={openQuote} />
        {BIZ.showBeforeAfter && <BeforeAfter />}
        {BIZ.showGallery && <Gallery />}
        {BIZ.showReviews && <Reviews />}
        <ServiceArea />
        <div style={{ height: 76 }} />
      </main>
      <BottomBar onQuote={() => openQuote()} />
      <QuoteSheet
        open={quoteOpen}
        form={form}
        setForm={setForm}
        onClose={() => setQuoteOpen(false)}
        onDone={() => {
          setQuoteOpen(false);
          setForm(EMPTY_FORM);
        }}
      />
    </div>
  );
}
