type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {eyebrow ? (
        <p className="type-eyebrow mb-2.5 sm:mb-3">{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className="font-serif text-[1.75rem] leading-[1.15] tracking-tight text-charcoal sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="type-prose mt-3 text-[0.95rem] text-charcoal/70 sm:mt-4 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
