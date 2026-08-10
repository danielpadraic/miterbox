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
  {
    id: "maire-o-boise",
    name: "Maire O.",
    location: "Boise, ID",
    quote:
      "Phil is one of the best out there! He has worked on a number of different projects for us from bathroom remodel to laying new subfloor and hardwood floors. His work is excellent! And he was able to help us come up with some great solutions for some of the conundrums our house presented to us. He is prompt, cheerful, and a great communicator. We are so, so pleased with the beautiful work he has done for us! We love working with Phil and don't want anyone else!",
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
