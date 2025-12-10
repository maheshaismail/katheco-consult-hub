import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import kathecoLogo from "@/assets/katheco-logo.jpg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Training", path: "/training" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/auth" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={kathecoLogo} alt="KATHECO Logo" className="w-10 h-10 object-contain" />
            <span className="font-bold text-xl text-foreground">
              <span className="hidden lg:inline">KATHECO CONSULTANCY COMPANY LIMITED</span>
              <span className="lg:hidden">KATHECO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>

          <Button
            variant="hero"
            size="default"
            className="hidden md:inline-flex"
            onClick={() => window.open("https://wa.me/255755521203", "_blank")}
          >
            Get Consultancy
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-left justify-start text-foreground">
                  {link.name}
                </Button>
              </Link>
            ))}
            <Button
              variant="hero"
              size="default"
              className="w-full"
              onClick={() => {
                window.open("https://wa.me/255755521203", "_blank");
                setIsOpen(false);
              }}
            >
              Get Consultancy
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
