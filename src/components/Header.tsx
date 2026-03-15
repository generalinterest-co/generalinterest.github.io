import { useState, useEffect } from "react";
import { siteData } from "../data/siteData";

interface HeaderProps {
  currentPath: string;
}

export default function Header({ currentPath }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="container">
          <a className="header__logo" href="/" aria-label={siteData.title}>
            <img src={siteData.logoWhite} alt={siteData.title} />
          </a>
          <nav className="header__nav" aria-label="Main navigation">
            {siteData.menu.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className={currentPath === item.url ? "active" : ""}
              >
                {item.title}
              </a>
            ))}
          </nav>
          <button
            className="header__menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          className="mobile-nav__close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <nav aria-label="Mobile navigation">
          {siteData.menu.map((item) => (
            <a key={item.url} href={item.url} onClick={() => setMenuOpen(false)}>
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
