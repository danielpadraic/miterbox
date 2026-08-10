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
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-walnut">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-serif text-3xl leading-tight tracking-tight text-charcoal sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-charcoal/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
