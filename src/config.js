// ===== Fill in each cleaner's details here =====
export const BIZ = {
  name: "Tracy's Cleaning Services",
  area: "Quail Valley & the Inland Empire",
  tagline: "Honest, careful cleaning, done right.",
  intro: "We're a family-run team: Tracy and her daughter. We clean homes, rentals and offices across the Inland Empire, ask questions, and don't rush. Every room gets cleaned to your standards.",
  phone: "(951) 399-5606",
  phoneRaw: "9513995606",
  email: "", // not shown on the site
  hours: "Mon–Sat, 9am–4:30pm",
  responseTime: "We'll call or text you to go over the details.",
  address: "26551 Connecticut Dr, Quail Valley, CA 92587",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=26551+Connecticut+Dr%2C+Quail+Valley%2C+CA+92587",
  towns: ["Quail Valley", "Menifee", "Perris", "Lake Elsinore", "Murrieta", "Moreno Valley", "Corona", "Eastvale", "Jurupa Valley"],
  zips: [
    "92587", // Quail Valley
    "92584", "92585", "92586", "92596", // Menifee
    "92570", "92571", "92572", "92599", // Perris
    "92530", "92531", "92532", // Lake Elsinore
    "92562", "92563", "92564", // Murrieta
    "92551", "92552", "92553", "92554", "92555", "92556", "92557", // Moreno Valley
    "92877", "92878", "92879", "92880", "92881", "92882", "92883", // Corona & Eastvale
    "91752", "92509", // Jurupa Valley & Eastvale
  ], // ZIP codes you serve, used by the ZIP checker
  rating: "5.0",
  reviewCount: "5",
  googleUrl: "https://www.google.com/maps/search/?api=1&query=Tracy%27s+Cleaning+Services+Quail+Valley+CA", // link to the Google Business profile
  services: [
    { name: "Deep clean", short: "Baseboards, walls and every corner, a full reset" },
    { name: "Moving-related cleaning", short: "Move-in, move-out and rental turnovers" },
    { name: "Office & workplace cleaning", short: "Offices and small workplaces" },
    { name: "Standard cleaning", short: "Regular upkeep: weekly, every two weeks or monthly", recurring: true },
    { name: "General housekeeping", short: "Tidying, organizing and dusting throughout" },
    { name: "Interior & exterior windows", short: "Glass, tracks and sills, inside and out" },
    { name: "Bathrooms", short: "Showers, tubs, glass doors and fixtures" },
  ],
  // Only add real Google reviews, with the client's permission.
  reviews: [
    { name: "Michelle F.", when: "Feb 2026", text: "Tracy and her daughter Delila are truly outstanding. They are incredibly hardworking, reliable, and pay close attention to every detail. Nothing feels rushed—every room is cleaned with care and intention." },
    { name: "Krista B.", when: "2025", text: "Our house was in desperate need of a good cleaning and she went above and beyond, making sure to ask questions and to make sure everything was to our standards." },
    { name: "Autumn E.", when: "2025", text: "She did a deep cleaning for me which I haven't had done in years, my baseboards were clean, walls. Everything was organized, bathrooms are spotless…" },
    { name: "Sheila M.", when: "2025", text: "If you want a honest hard working cleaning service call Tracy! Her team is fabulous. She has done two of my rentals and cleaned over and above services." },
    { name: "Rosa C.", when: "Nov 2025", text: "Tracy and her daughter Deliah did a great job of deep cleaning my home. I am very pleased with it. She will be cleaning my home monthly." },
  ],
  beforeAfterCaption: "Pet hair cleanup, living area",
  // Photos: put files in /public and set paths like "/hero.jpg". Leave empty to show a placeholder.
  photos: {
    hero: "/hero-living-room.webp",
    before: "/before-pet-hair.webp",
    after: "/after-pet-hair.webp",
  },
  // Gallery: extra photos of finished jobs, shown in a two-column grid.
  gallery: [
    { src: "/kitchen-stove.webp", caption: "Stove & microwave" },
    { src: "/shower-glass.webp", caption: "Shower glass" },
    { src: "/kitchen-cabinets.webp", caption: "Kitchen counters" },
    { src: "/dining-room.webp", caption: "Dining room" },
  ],
  // Trust badges: set to false to hide one.
  badges: {
    insured: false,
    bonded: false,
    backgroundChecked: false,
  },
  // Sections: set to false to hide.
  showReviews: true,
  showBeforeAfter: true,
  showGallery: true,
};
