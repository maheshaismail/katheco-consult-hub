import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import kathecoLogo from "@/assets/katheco-logo.jpg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Training", path: "/training" },
  { name: "Contact", path: "/contact" },
  { name: "Admin", path: "/auth" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/80 shadow-card backdrop-blur-xl"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="section-shell">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-primary p-[2px] shadow-card">
              <img
                src={kathecoLogo}
                alt="KATHECO Consultancy Company Limited logo"
                className="h-full w-full rounded-[10px] bg-card object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-bold text-foreground">
                KATHECO
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground lg:block">
                Consultancy Company Limited
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 shadow-sm backdrop-blur md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground shadow-card"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <Button
            variant="hero"
            className="hidden md:inline-flex"
            onClick={() => window.open("https://wa.me/255755521203", "_blank")}
          >
            <MessageCircle /> Get Consultancy
          </Button>

          <button
            className="rounded-full border border-border/70 p-2 text-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="animate-fade-in space-y-1 border-t border-border/70 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="hero"
              className="mt-2 w-full"
              onClick={() => {
                window.open("https://wa.me/255755521203", "_blank");
                setIsOpen(false);
              }}
            >
              <MessageCircle /> Get Consultancy
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
