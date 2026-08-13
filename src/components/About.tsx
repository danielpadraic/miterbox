import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-y border-charcoal/8 bg-[#F3EFE9]/60 px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
        <FadeIn className="lg:col-span-5">
          <div className="group relative aspect-[4/5] overflow-hidden bg-charcoal/5">
            <Image
              src="/gallery/workshop.jpg"
              alt="Phil leveling custom cabinetry on site"
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority={false}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-7">
          <SectionHeading
            id="about-heading"
            eyebrow="The Craftsman"
            title="Over Three Decades. One pair of hands."
          />

          <div className="type-prose mt-5 space-y-4 text-[0.95rem] text-charcoal/70 sm:mt-6 sm:space-y-5 sm:text-lg">
            <p>
              MITERBOX started in 1994. For more than thirty years the work has
              stayed the same — careful joinery, honest materials, pieces meant
              to last longer than the trends.
            </p>
            <p>
              Those years were spent on high-end homes around Austin, where the
              details had to disappear until you looked for them.
            </p>
            <p>
              The shop is in Nampa now, closer to family. The way of working
              hasn’t changed. Every project is still designed and built by the
              owner, from the first sketch to the final install. No crew. No
              shortcuts. Only one or two commissions a month.
            </p>
            <p>
              The work is for people in the Treasure Valley who want something
              made specifically for their house and are willing to wait for it.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
