import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  align?: "center" | "left";
}

export const PageHero = ({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  children,
  align = "center",
}: PageHeroProps) => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-hero text-primary-foreground">
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-secondary/60" />
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl animate-float"
        style={{ background: "hsl(var(--primary-glow) / 0.35)" }}
      />

      <div className="section-shell relative z-10 py-20 md:py-28">
        <div
          className={`max-w-3xl space-y-6 ${align === "center" ? "mx-auto text-center" : ""}`}
        >
          {eyebrow && (
            <span className="eyebrow animate-fade-in text-primary-foreground/80">{eyebrow}</span>
          )}
          <h1 className="animate-fade-in text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="animate-fade-in text-lg text-primary-foreground/85 md:text-xl">
              {subtitle}
            </p>
          )}
          {children && <div className="animate-fade-in pt-2">{children}</div>}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
