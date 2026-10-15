import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { setSmoother, smoother } from "./navbarScroll";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const navLinks = [
  { text: "ABOUT", href: "#about" },
  { text: "SERVICES", href: "#whatido" },
  { text: "CAREER", href: "#career" },
  { text: "WORK", href: "#work" },
  { text: "STACK", href: "#stack" },
  { text: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const scrollInstance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      speed: 1.5,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    setSmoother(scrollInstance);
    scrollInstance.scrollTop(0);
    scrollInstance.paused(true);

    const links = document.querySelectorAll(".header ul a, .mobile-menu a");
    const handleLinkClick = (event: Event) => {
      const element = event.currentTarget as HTMLAnchorElement;
      event.preventDefault();
      const section = element.getAttribute("data-href");
      if (section && smoother) {
        smoother.scrollTo(section, true, "top top");
      }
      setMenuOpen(false);
    };
    links.forEach((elem) => elem.addEventListener("click", handleLinkClick));

    const refreshSmoother = () => ScrollSmoother.refresh(true);
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMobileMenuOpen = document
        .getElementById("mobile-navigation")
        ?.classList.contains("mobile-menu--open");
      if (event.key === "Escape" && isMobileMenuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("resize", refreshSmoother);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      links.forEach((elem) => elem.removeEventListener("click", handleLinkClick));
      window.removeEventListener("resize", refreshSmoother);
      window.removeEventListener("keydown", handleKeyDown);
      smoother?.kill();
      setSmoother(null);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          MK.
        </a>

        {/* Desktop nav */}
        <ul className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a data-href={link.href} href={link.href}>
                <HoverLinks text={link.text} />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          ref={menuButtonRef}
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            data-href={link.href}
            href={link.href}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.text}
          </a>
        ))}
      </div>

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;
