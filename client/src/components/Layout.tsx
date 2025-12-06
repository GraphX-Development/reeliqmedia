import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-mono selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? "top-0 px-0" : "top-6 px-4"}`}>
        <div className={`mx-auto bg-gradient-to-b from-black/40 to-black/70 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] h-24 flex items-center justify-between px-10 transition-all duration-500 ease-in-out ${isScrolled ? "max-w-full rounded-none border-x-0 border-t-0" : "container max-w-[90%] rounded-full"}`}>
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <img 
                src="/images/reel_iq_media_main.png" 
                alt="Reel IQ Media" 
                className="h-12 w-auto transition-transform group-hover:scale-105" 
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span 
                  className={`text-lg font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer relative group inline-block hover:scale-110 hover:text-primary ${
                    location === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                  style={{ textShadow: "none" }}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    location === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button variant="default" className="rounded-full font-bold uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 px-6">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-4 right-4 bg-background/95 backdrop-blur-md border border-border rounded-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-2xl">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span 
                  className={`block py-2 text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer ${
                    location === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button className="w-full rounded-full font-bold uppercase tracking-widest mt-2" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/reel_iq_lamp_icon.png" alt="Reel IQ Media" className="h-10 w-auto" />
                <span className="font-display text-xl font-bold tracking-tighter uppercase">
                  Reel<span className="text-primary">IQ</span>
                </span>
              </div>
              <p className="text-muted-foreground max-w-md mb-6">
                Making social media look easy for local businesses, we make you stand out and you learn in the process.
              </p>
              <p className="font-display text-primary font-bold uppercase tracking-widest mt-4 mb-6">
                Reel. Real. Results.
              </p>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-bold uppercase mb-4 text-foreground">Navigation</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path}>
                      <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer uppercase text-sm tracking-wider">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-bold uppercase mb-4 text-foreground">Contact</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>sales@reeliq.ca</li>
                <li>+1 (204) 905-2692</li>
                <li>Steinbach, MB</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs uppercase tracking-widest">
              © {new Date().getFullYear()} Reel IQ Media. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 bg-muted hover:bg-primary transition-colors cursor-pointer flex items-center justify-center">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <div className="w-8 h-8 bg-muted hover:bg-primary transition-colors cursor-pointer flex items-center justify-center">
                <span className="sr-only">TikTok</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </div>
              <div className="w-8 h-8 bg-muted hover:bg-primary transition-colors cursor-pointer flex items-center justify-center">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
