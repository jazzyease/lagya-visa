"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Plane, ArrowRight, Globe2 } from "lucide-react";

const linkGroups = [
  {
    title: "Quick links",
    links: [
      { label: "Destinations", href: "#destinations" },
      { label: "Packages", href: "#packages" },
      { label: "Services", href: "#services" },
      { label: "Journal", href: "#blog" },
    ],
  },
  {
    title: "Top destinations",
    links: [
      { label: "Bali, Indonesia", href: "#" },
      { label: "Santorini, Greece", href: "#" },
      { label: "Swiss Alps", href: "#" },
      { label: "Maldives", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "WhatsApp", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "hello@lagyavisa.com", href: "mailto:hello@lagyavisa.com" },
    ],
  },
] as const;

function MagneticCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22 });
  const springY = useSpring(y, { stiffness: 320, damping: 22 });
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      x.set((e.clientX - r.left - r.width / 2) * 0.22);
      y.set((e.clientY - r.top - r.height / 2) * 0.22);
    },
    [x, y]
  );
  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  return (
    <motion.a
      ref={ref}
      href={href}
      className="site-footer-cta-btn"
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

function HeadlineReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.span
      className="site-footer-headline-inner"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="site-footer-word"
          variants={{
            hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function SiteFooter() {
  const shellRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start end", "end end"],
  });

  const img1Y = useSpring(useTransform(scrollYProgress, [0, 1], [18, -22]), {
    stiffness: 80,
    damping: 28,
  });
  const img2Y = useSpring(useTransform(scrollYProgress, [0, 1], [10, -32]), {
    stiffness: 80,
    damping: 28,
  });

  return (
    <footer
      ref={shellRef}
      className="section site-footer-unified"
      id="contact"
      aria-labelledby="footer-cta-heading"
    >
      <div className="site-footer-shell">
        <div className="site-footer-ambient" aria-hidden />
        <div className="site-footer-ambient site-footer-ambient--two" aria-hidden />

        <div className="site-footer-top">
          <div className="site-footer-cta-col">
            <motion.div
              className="site-footer-cta-copy"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="site-footer-badge">
                <Plane size={14} strokeWidth={2} aria-hidden />
                Ready to go?
              </div>
              <h2 id="footer-cta-heading" className="site-footer-title">
                <HeadlineReveal text="Book Your Dream Trip Today" />
              </h2>
              <p className="site-footer-lead">
                Tell us where you want to go. We&apos;ll handle the rest —
                flights, hotels, visas, and unforgettable experiences.
              </p>
              <MagneticCta href="mailto:hello@lagyavisa.com">
                Plan my trip <ArrowRight size={16} strokeWidth={2} />
              </MagneticCta>
            </motion.div>

            <div className="site-footer-visual">
              <motion.div
                className="site-footer-img-wrap site-footer-img-wrap--one"
                style={{ y: img1Y }}
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=700&q=80"
                  alt="Santorini coastline"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
              <motion.div
                className="site-footer-img-wrap site-footer-img-wrap--two"
                style={{ y: img2Y }}
                initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.85,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80"
                  alt="Bali temple at dusk"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="site-footer-rule" aria-hidden />

        <div className="site-footer-bottom">
          <motion.div
            className="site-footer-brand-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="site-footer-logo-row">
              <div className="site-footer-logo-mark">
                <Globe2 size={22} strokeWidth={2} aria-hidden />
              </div>
              <span className="site-footer-logo-text">lagya</span>
            </div>
            <p className="site-footer-tagline">
              Your trusted travel partner for unforgettable vacations, seamless
              visas, and handcrafted journeys around the world.
            </p>
          </motion.div>

          <motion.div
            className="site-footer-nav-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
          >
            {linkGroups.map((group) => (
              <motion.nav
                key={group.title}
                className="site-footer-nav-col"
                aria-label={group.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <span className="site-footer-nav-title">{group.title}</span>
                {group.links.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="site-footer-nav-link"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
