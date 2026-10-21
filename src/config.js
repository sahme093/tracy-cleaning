// ===== Fill in each cleaner's details here =====
export const BIZ = {
  name: "[Business Name]",
  area: "[Town & surrounding area]",
  tagline: "[Short promise, e.g. A spotless home, every visit.]",
  intro: "[One or two sentences: who you are, how long you've been cleaning, and what clients can expect.]",
  phone: "[(555) 555-0123]",
  phoneRaw: "5555550123",
  email: "[you@email.com]",
  hours: "[Mon–Sat, 8am–6pm]",
  responseTime: "[We reply within one business day.]",
  towns: ["[Town 1]", "[Town 2]", "[Town 3]", "[Town 4]", "[Town 5]", "[Town 6]"],
  zips: ["12345", "12346", "12347"], // ZIP codes you serve, used by the ZIP checker
  rating: "[4.9]",
  reviewCount: "[00]",
  googleUrl: "#", // link to the Google Business profile
  services: [
    { name: "Standard clean", short: "[Regular upkeep]" },
    { name: "Deep clean", short: "[First visit or full reset]" },
    { name: "Move-in / move-out", short: "[Empty home, ready for keys]" },
    { name: "Recurring", short: "[Weekly or every two weeks]", recurring: true },
  ],
  // Only add real Google reviews, with the client's permission.
  reviews: [
    { name: "[Client name, last initial]", when: "[Month Year]", text: "[Paste a real Google review here, with the client's permission.]" },
    { name: "[Client name, last initial]", when: "[Month Year]", text: "[Paste a second review. Two or three short ones work best.]" },
    { name: "[Client name, last initial]", when: "[Month Year]", text: "[Paste a third review.]" },
  ],
  beforeAfterCaption: "[Room, town]",
  // Photos: put files in /public and set paths like "/hero.jpg". Leave empty to show a placeholder.
  photos: {
    hero: "",
    before: "",
    after: "",
  },
  // Trust badges: set to false to hide one.
  badges: {
    insured: true,
    bonded: true,
    backgroundChecked: true,
  },
  // Sections: set to false to hide.
  showReviews: true,
  showBeforeAfter: true,
};
