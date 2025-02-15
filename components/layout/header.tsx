"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Project", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "https://www.linkedin.com/in/singhayush007/"}, 
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b" : ""
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={"/"} className="text-xl font-bold text-primary">
            Ayush Singh
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                href={item.href}
                key={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                target={item.href.startsWith('http') ? "_blank" : "_self"}  // Open LinkedIn in a new tab
                rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
              >
                {item.label}
              </a>
            ))}
            <a href="/AyushSinghCV.pdf" download>
              <Button variant={"default"} size={"sm"} className="gap-2">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </a>
          </nav>

          {/* MOBILE MENU BUTTON  */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                  target={item.href.startsWith('http') ? "_blank" : "_self"}  // Open LinkedIn in a new tab
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
                >
                  {item.label}
                </a>
              ))}
              <a href="/AyushSinghCV.pdf" download>
                <Button variant={"default"} size={"sm"} className="gap-2">
                  <Download className="w-4 h-4" />
                  Resume
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
