export type Project = {
  id: string;
  title: string;
  caption: string;
  /** Cover image shown in the gallery grid */
  image: string;
  /**
   * Optional additional images for an expandable lightbox carousel.
   * When present, opening the project cycles through [image, ...images]
   * (cover first, then these extras — or pass a full ordered list and
   * keep `image` as the cover only).
   */
  images?: string[];
  category:
    | "Kitchen"
    | "Bunk Beds"
    | "Built-ins"
    | "Mudroom"
    | "Detail"
    | "Installation"
    | "Trim";
  featured?: boolean;
};

/** Ordered list of all photos for a project (cover + carousel extras). */
export function projectGallery(project: Project): string[] {
  if (project.images?.length) {
    const all = [project.image, ...project.images];
    // de-dupe while preserving order
    return [...new Set(all)];
  }
  return [project.image];
}

export const projects: Project[] = [
  {
    id: "tiny-home-kitchen",
    title: "Custom Kitchen",
    caption: "Oak cabinetry, island, and wet bar",
    image: "/gallery/IMG_20221011_181556.jpg",
    images: [
      "/gallery/20221001_132318.jpg",
      "/gallery/20221001_132255.jpg",
      "/gallery/kitchen-install-white.jpg",
      "/gallery/kitchen-install-maple.jpg",
      "/gallery/kitchen-island-white.jpg",
      "/gallery/kitchen-island-oak.jpg",
      "/gallery/kitchen-install-wide.jpg",
      "/gallery/kitchen-white-island-wide.jpg",
      "/gallery/kitchen-white-range.jpg",
    ],
    category: "Kitchen",
    featured: true,
  },
  {
    id: "professional-installation",
    title: "Professional Installation",
    caption: "Kitchen island and cabinetry during install",
    image: "/gallery/professional-installation.jpg",
    category: "Installation",
    featured: true,
  },
  {
    id: "custom-trim-and-design",
    title: "Custom Trim and Design",
    caption: "Panel molding and architectural wall detail",
    image: "/gallery/custom-trim-and-design.jpg",
    category: "Trim",
  },
  {
    id: "tiny-home-kitchen-detail",
    title: "Kitchen Detail",
    caption: "Farmhouse sink, butcher block, and custom cabinetry",
    image: "/gallery/IMG_0397.PNG",
    category: "Kitchen",
  },
  {
    id: "walk-in-closet",
    title: "Walk-in Closet",
    caption: "Floor-to-ceiling built-in storage",
    image: "/gallery/20230823_150216.jpg",
    category: "Built-ins",
    featured: true,
  },
  {
    id: "bunk-beds",
    title: "Bunk Beds",
    caption: "Solid wood bunks with drawer stairs",
    image: "/gallery/IMG_1519.PNG",
    category: "Built-ins",
    featured: true,
  },
  {
    id: "mudroom",
    title: "Mudroom",
    caption: "Shiplap, cubbies, and coat hooks",
    image: "/gallery/20230825_123923.jpg",
    category: "Built-ins",
  },
  {
    id: "loft-bedroom",
    title: "Loft Bedroom",
    caption: "Custom wood ceiling and built-in headboard",
    image: "/gallery/IMG_0402.PNG",
    category: "Built-ins",
  },
  {
    id: "floating-shelves",
    title: "Floating Shelves",
    caption: "Solid walnut bathroom shelves",
    image: "/gallery/20230302_190211.jpg",
    category: "Detail",
  },
];
