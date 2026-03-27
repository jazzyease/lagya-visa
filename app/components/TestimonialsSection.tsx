"use client";

import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { Heart, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export type TestimonialStory = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const tones = ["orange", "teal", "gold"] as const;
const GAP = 20;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ show: { transition: { staggerChildren: 0.04 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.3em" }}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function TestimonialsSection({ stories }: { stories: TestimonialStory[] }) {
  const reduceMotion = useReducedMotion();
  const n = stories.length;
  const slides = useMemo(() => [...stories, ...stories, ...stories], [stories]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(n);
  const [step, setStep] = useState(340);
  const [hovered, setHovered] = useState(false);

  const indexRef = useRef(n);
  const stepRef = useRef(step);
  const animatingRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const measureStep = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const card = vp.querySelector<HTMLElement>(".testimonial-card");
    if (!card) return;
    const w = card.getBoundingClientRect().width;
    setStep(w + GAP);
  }, []);

  useEffect(() => {
    measureStep();
    window.addEventListener("resize", measureStep);
    const ro = new ResizeObserver(measureStep);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => {
      window.removeEventListener("resize", measureStep);
      ro.disconnect();
    };
  }, [measureStep, slides.length]);

  useEffect(() => {
    if (step <= 0 || n === 0) return;
    x.set(-indexRef.current * step);
  }, [step, n, x]);

  const finishAnim = useCallback(() => {
    animatingRef.current = false;
  }, []);

  const runGoNext = useCallback(() => {
    if (animatingRef.current || n < 1) return;
    const st = stepRef.current;
    const current = indexRef.current;
    const nextIndex = current + 1;
    animatingRef.current = true;

    const dur = reduceMotion ? 0 : 0.52;
    const done = () => {
      if (nextIndex >= 2 * n) {
        const reset = nextIndex - n;
        x.set(-reset * st);
        indexRef.current = reset;
        setIndex(reset);
      } else {
        indexRef.current = nextIndex;
        setIndex(nextIndex);
      }
      finishAnim();
    };
    if (dur === 0) {
      x.set(-nextIndex * st);
      done();
      return;
    }
    animate(x, -nextIndex * st, {
      duration: dur,
      ease: EASE,
      onComplete: done,
    });
  }, [n, reduceMotion, x, finishAnim]);

  const runGoPrev = useCallback(() => {
    if (animatingRef.current || n < 1) return;
    const st = stepRef.current;
    const current = indexRef.current;
    const nextIndex = current - 1;
    animatingRef.current = true;

    const dur = reduceMotion ? 0 : 0.52;
    const done = () => {
      if (nextIndex < n) {
        const reset = nextIndex + n;
        x.set(-reset * st);
        indexRef.current = reset;
        setIndex(reset);
      } else {
        indexRef.current = nextIndex;
        setIndex(nextIndex);
      }
      finishAnim();
    };
    if (dur === 0) {
      x.set(-nextIndex * st);
      done();
      return;
    }
    animate(x, -nextIndex * st, {
      duration: dur,
      ease: EASE,
      onComplete: done,
    });
  }, [n, reduceMotion, x, finishAnim]);

  const goToLogical = useCallback(
    (logical: number) => {
      if (animatingRef.current || n < 1) return;
      const st = stepRef.current;
      const target = n + logical;
      if (target === indexRef.current) return;
      animatingRef.current = true;
      const dur = reduceMotion ? 0 : 0.52;
      const done = () => {
        indexRef.current = target;
        setIndex(target);
        finishAnim();
      };
      if (dur === 0) {
        x.set(-target * st);
        done();
        return;
      }
      animate(x, -target * st, {
        duration: dur,
        ease: EASE,
        onComplete: done,
      });
    },
    [n, reduceMotion, x, finishAnim]
  );

  const goNextRef = useRef(runGoNext);
  goNextRef.current = runGoNext;

  useEffect(() => {
    if (reduceMotion || n < 2 || hovered) return;
    const id = window.setInterval(() => goNextRef.current(), 5200);
    return () => window.clearInterval(id);
  }, [reduceMotion, hovered, n]);

  const logicalActive = n ? ((index % n) + n) % n : 0;

  return (
    <section
      className="section stories-block testimonials-premium"
      id="stories"
      aria-labelledby="stories-heading"
    >
      <div className="testimonials-inner">
        <motion.div
          className="testimonials-intro"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label testimonials-label">
            <Heart size={14} fill="currentColor" aria-hidden />
            Traveler reviews
          </div>
          <div className="testimonials-head-row">
            <div className="testimonials-title-wrap">
              <h2 id="stories-heading" className="testimonials-title">
                <TextReveal text="Loved by Thousands of Happy Travelers" />
              </h2>
              <p className="testimonials-sub">
                Real trips, real relief — from honeymoons to visas, told by people who went with Lagya.
              </p>
            </div>
            <div className="testimonials-toolbar">
              <div className="testimonials-rating-pill" aria-label="Average rating 4.8 out of 5 from over 12,000 reviews">
                <span className="testimonials-rating-score">4.8</span>
                <div className="testimonials-stars" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="testimonials-rating-meta">12k+ reviews</span>
              </div>
              <div className="carousel-controls testimonials-carousel-controls">
                <motion.button
                  type="button"
                  aria-label="Previous review"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={runGoPrev}
                >
                  <ChevronLeft size={20} strokeWidth={2} />
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Next review"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={runGoNext}
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <div
          className="testimonials-rail-wrap"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <p className="testimonials-sr-live" aria-live="polite">
            {n > 0
              ? `${stories[logicalActive].quote} — ${stories[logicalActive].name}, ${stories[logicalActive].role}`
              : ""}
          </p>
          <div
            ref={viewportRef}
            className="testimonials-viewport"
            role="region"
            aria-label="Review carousel"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                runGoNext();
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                runGoPrev();
              }
            }}
          >
            <motion.div
              className="testimonials-carousel-track"
              style={{ x }}
            >
              {slides.map((story, i) => {
                const storyIndex = i % n;
                const tone = tones[storyIndex % tones.length];
                return (
                  <article
                    key={`${i}-${story.name}`}
                    className="testimonial-card"
                    data-tone={tone}
                    aria-hidden
                  >
                    <Quote className="testimonial-quote-icon" size={88} strokeWidth={1} aria-hidden />
                    <div className="testimonial-avatar" aria-hidden>
                      <span>{story.avatar}</span>
                    </div>
                    <p className="testimonial-quote">&ldquo;{story.quote}&rdquo;</p>
                    <footer className="testimonial-footer">
                      <div className="testimonial-meta-text">
                        <strong>{story.name}</strong>
                        <span className="testimonial-role">{story.role}</span>
                      </div>
                    </footer>
                  </article>
                );
              })}
            </motion.div>
          </div>

          <div className="testimonials-dots" role="tablist" aria-label="Choose a review">
            {stories.map((story, i) => (
              <button
                key={story.name}
                type="button"
                role="tab"
                aria-selected={i === logicalActive}
                aria-label={`Show review from ${story.name}`}
                className={`testimonials-dot${i === logicalActive ? " is-active" : ""}`}
                onClick={() => goToLogical(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
