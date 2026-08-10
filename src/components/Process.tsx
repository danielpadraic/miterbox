import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Consultation",
    body: "We talk through the space, the materials, and the pace. Not every project is a fit — and that is intentional.",
  },
  {
    number: "02",
    title: "Design",
    body: "Drawings and details are refined until the piece belongs to the room. Proportion and grain are decided with care.",
  },
  {
    number: "03",
    title: "Hand-build",
    body: "Built alone in the Nampa workshop. Joinery, finish, and fitment are handled by the same hands that designed it.",
  },
  {
    number: "04",
    title: "Install",
    body: "Installed with the same attention given at the bench — quiet, precise, and finished before the house notices.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            id="process-heading"
            eyebrow="How it works"
            title="The Process"
            description="A short path from conversation to install — kept personal because the capacity is intentionally small."
          />
        </FadeIn>

        <ol className="mt-9 grid list-none gap-7 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.number} className="h-full">
              <FadeIn delay={index * 0.08} className="h-full">
                <div className="hover-lift h-full border-t border-charcoal/15 pt-5 hover:border-walnut/45 sm:pt-6">
                  <span className="font-serif text-sm tracking-[0.22em] text-walnut">
                    {step.number}
                  </span>
                  <h3 className="mt-3 font-serif text-[1.35rem] leading-snug tracking-tight text-charcoal sm:mt-4 sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="type-prose mt-2.5 text-sm text-charcoal/65 sm:mt-3 sm:text-[0.95rem]">
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
