export type Review = {
  id: string;
  name: string;
  location: string;
  quote: string;
  /** Set true for temporary copy until a real testimonial is added */
  placeholder?: boolean;
};

/**
 * Customer reviews shown in the Reviews carousel.
 * Replace placeholder entries with real testimonials as they come in.
 */
export const reviews: Review[] = [
  {
    id: "nicki-b-nampa",
    name: "Nicki B.",
    location: "Nampa, ID",
    quote:
      "We would recommend Phil to anyone! He completed a bathroom remodel for us and we hired him again for a whole home remodel project after our house flooded. He did excellent work on tile, floors, carpet, drywall, insulation, cabinets, fixtures, painting, trim work, etc... He is fair priced, works hard, communicates well, and is overall pleasant to be around. We're so thankful to have found someone who is talented, honest, fair, and works hard with integrity! We will use Phil for any and all future remodel or carpentry projects.",
  },
  // PLACEHOLDER — replace with a real review
  {
    id: "placeholder-eagle",
    name: "Sarah M.",
    location: "Eagle, ID",
    quote:
      "Phil built our custom kitchen cabinetry from scratch. The joinery is exceptional, the finish is quiet and refined, and every detail feels intentional. We knew from the first conversation that we were working with a true craftsman.",
    placeholder: true,
  },
  // PLACEHOLDER — replace with a real review
  {
    id: "placeholder-boise",
    name: "James & Laura T.",
    location: "Boise, ID",
    quote:
      "Our built-ins transformed the library. Phil listened carefully, drew thoughtfully, and delivered work that looks as if it has always belonged to the house. Fair, meticulous, and a pleasure to have on the project.",
    placeholder: true,
  },
  // PLACEHOLDER — replace with a real review
  {
    id: "placeholder-meridian",
    name: "David R.",
    location: "Meridian, ID",
    quote:
      "We hired Phil for custom bunk beds and closet systems. The craftsmanship is outstanding — solid wood, perfect fits, and finishes that invite the hand. He communicates clearly and stands behind every piece.",
    placeholder: true,
  },
  // PLACEHOLDER — replace with a real review
  {
    id: "placeholder-star",
    name: "Amanda K.",
    location: "Star, ID",
    quote:
      "From consultation to install, the experience felt personal and unhurried. Phil’s cabinetry elevated our mudroom and pantry beyond what we imagined. Honest pricing, careful work, and lasting quality.",
    placeholder: true,
  },
];
