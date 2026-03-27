"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Sparkles, MapPinned, Ticket, Sun, type LucideIcon } from "lucide-react";

const STEPS: {
  num: string;
  title: string;
  body: string;
  image: string;
  accent: "orange" | "teal" | "coral" | "gold";
  Icon: LucideIcon;
}[] = [
  {
    num: "01",
    title: "Dream It",
    body: "Browse handpicked destinations and let your imagination run wild — we help you shortlist what fits your style and season.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    accent: "orange",
    Icon: Sparkles,
  },
  {
    num: "02",
    title: "Plan It",
    body: "Set your dates, travel style, and pace. We shape a clear itinerary with stays, transfers, and experiences that feel effortless.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    accent: "teal",
    Icon: MapPinned,
  },
  {
    num: "03",
    title: "Book It",
    body: "Lock everything in with transparent pricing — flights, hotels, and add-ons — so there are no surprises before you pack.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    accent: "coral",
    Icon: Ticket,
  },
  {
    num: "04",
    title: "Live It",
    body: "Step off the plane into a trip that already feels like yours — support on the ground and space to actually enjoy the moment.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    accent: "gold",
    Icon: Sun,
  },
];

export default function PlanYourTravelSection() {
  const panelsRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: panelsRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 28,
    mass: 0.35,
  });

  const parallaxY = useTransform(smoothProgress, [0, 1], ["0%", "-6%"]);

  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(
      STEPS.length - 1,
      Math.max(0, Math.floor(v * STEPS.length))
    );
    setActive((prev) => (prev !== next ? next : prev));
  });

  const scrollToPanel = useCallback((index: number) => {
    panelRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <section
      className="section journey-section"
      id="your-journey"
      aria-labelledby="journey-heading"
    >
      <div className="journey-header">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <Sparkles size={14} /> Your journey
          </div>
          <h2 id="journey-heading">Plan Your Travel</h2>
          <p className="journey-lead">
            From first idea to takeoff — four calm steps, one seamless experience
            crafted around you.
          </p>
          <div className="journey-progress-track" aria-hidden>
            <motion.div
              className="journey-progress-fill"
              style={{ scaleX: smoothProgress }}
            />
          </div>
        </motion.div>
      </div>

      <div className="journey-scrolly">
        <div>
          <div className="journey-sticky-img">
            <motion.div className="journey-sticky-inner" style={{ y: parallaxY }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={active}
                  src={STEPS[active].image}
                  alt={`${STEPS[active].title} — travel mood`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </AnimatePresence>
            </motion.div>

            <div className="journey-dots" role="tablist" aria-label="Journey steps">
              {STEPS.map((step, i) => (
                <button
                  key={step.num}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={`journey-step-${i}`}
                  id={`journey-tab-${i}`}
                  className={`journey-ind${i === active ? " active" : ""}`}
                  onClick={() => scrollToPanel(i)}
                  aria-label={`${step.title}, step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="journey-panels" ref={panelsRef}>
          {STEPS.map((step, i) => {
            const Icon = step.Icon;
            return (
              <motion.div
                key={step.num}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                id={`journey-step-${i}`}
                role="tabpanel"
                aria-labelledby={`journey-tab-${i}`}
                className={`journey-panel${i === active ? " is-active" : ""}`}
                data-accent={step.accent}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35, margin: "-8% 0px" }}
                transition={{
                  duration: 0.65,
                  delay: 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="journey-panel-icon">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <div className="journey-panel-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
