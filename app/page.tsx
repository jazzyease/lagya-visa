"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe2,
  MapPin,
  Compass,
  Plane,
  Star,
  Heart,
  Sparkles,
  Clock,
  Map,
  Briefcase,
  ShieldCheck,
  PhoneCall,
  CalendarDays,
  Users,
  Utensils,
  Camera,
  Wifi,
  Car,
  Award,
  CheckCircle2,
  Headphones,
  Umbrella,
} from "lucide-react";

/* ═══════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════ */
const fade = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.13 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.88, y: 30 }, show: { opacity: 1, scale: 1, y: 0 } };

/* ═══════════════════════════════════
   DATA
   ═══════════════════════════════════ */
const destinations = [
  {
    title: "Santorini, Greece", duration: "7 Days", price: "From $1,299", rating: "4.9",
    poster: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=80",
    video: "/videos/santorini.mp4",  // ← Replace with your video
  },
  {
    title: "Bali, Indonesia", duration: "10 Days", price: "From $899", rating: "5.0",
    poster: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    video: "/videos/bali.mp4",  // ← Replace with your video
  },
  {
    title: "Swiss Alps", duration: "5 Days", price: "From $1,599", rating: "4.8",
    poster: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
    video: "/videos/swiss.mp4",  // ← Replace with your video
  },
];

/* Horizontal scroll gallery data */
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80", label: "Norway Fjords", tag: "Adventure" },
  { src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80", label: "Amalfi Coast", tag: "Romance" },
  { src: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80", label: "Golden Beaches", tag: "Beach" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", label: "Mountain Peaks", tag: "Hiking" },
  { src: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80", label: "Nordic Wonders", tag: "Culture" },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80", label: "Hot Air Balloons", tag: "Experience" },
];

/* Travel packages */
const packages = [
  {
    title: "Romantic Bali Escape",
    location: "Bali, Indonesia",
    price: "$899",
    perPerson: "/person",
    duration: "10 Days · 9 Nights",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80",
    amenities: [Plane, Utensils, Wifi, Camera],
    featured: false,
  },
  {
    title: "Greek Island Hopping",
    location: "Santorini & Mykonos",
    price: "$1,799",
    perPerson: "/person",
    duration: "12 Days · 11 Nights",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=700&q=80",
    amenities: [Plane, Utensils, Car, Camera],
    featured: true,
  },
  {
    title: "Swiss Mountain Retreat",
    location: "Interlaken & Zermatt",
    price: "$1,599",
    perPerson: "/person",
    duration: "7 Days · 6 Nights",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=700&q=80",
    amenities: [Plane, Utensils, Car, Wifi],
    featured: false,
  },
];

const services = [
  { icon: Plane, title: "Visa Assistance", desc: "Expert guidance for study, work, PR, and tourist visas to 30+ countries.", backTitle: "Fly Anywhere", backDesc: "30+ countries covered", svgId: "visa" },
  { icon: Map, title: "Tour Packages", desc: "Handcrafted travel packages with flights, hotels, and local experiences.", backTitle: "Explore More", backDesc: "Custom itineraries", svgId: "tour" },
  { icon: Briefcase, title: "Corporate Travel", desc: "End-to-end business travel — conferences, retreats, and executive trips.", backTitle: "Business Class", backDesc: "Executive arrangements", svgId: "corporate" },
  { icon: ShieldCheck, title: "Travel Insurance", desc: "Comprehensive coverage — medical, trip cancellation, and baggage protection.", backTitle: "Travel Safe", backDesc: "Full coverage plans", svgId: "insurance" },
];

/* SVG components for flip cards */
function VisaSvg() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="flip-svg">
      <circle cx="60" cy="60" r="55" fill="#fff3eb" />
      <ellipse cx="30" cy="50" rx="14" ry="6" fill="white" className="cloud cloud-1" />
      <ellipse cx="90" cy="35" rx="12" ry="5" fill="white" className="cloud cloud-2" />
      <ellipse cx="65" cy="70" rx="10" ry="4" fill="white" className="cloud cloud-3" />
      <path d="M15 85 Q40 30 60 50 Q80 70 105 20" stroke="#ff6b35" strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="flight-path" />
      <g className="plane-fly"><polygon points="0,-5 12,0 0,5 2,0" fill="#ff6b35" /></g>
    </svg>
  );
}
function TourSvg() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="flip-svg">
      <circle cx="60" cy="60" r="40" fill="#e6faf5" stroke="#0ead8e" strokeWidth="1.5" />
      <ellipse cx="60" cy="60" rx="20" ry="40" fill="none" stroke="#0ead8e" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="#0ead8e" strokeWidth="1" opacity="0.3" />
      <g className="pin-bounce"><path d="M60 30 C60 30 48 40 48 50 C48 57 53 62 60 62 C67 62 72 57 72 50 C72 40 60 30 60 30Z" fill="#ff6b35" /><circle cx="60" cy="49" r="5" fill="white" /></g>
      <circle cx="60" cy="50" r="8" fill="none" stroke="#ff6b35" strokeWidth="1" className="pulse-ring ring-1" />
      <circle cx="60" cy="50" r="15" fill="none" stroke="#ff6b35" strokeWidth="0.8" className="pulse-ring ring-2" />
    </svg>
  );
}
function CorporateSvg() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="flip-svg">
      <rect x="20" y="35" width="80" height="50" rx="8" fill="white" stroke="#ff6b35" strokeWidth="1.5" />
      <line x1="70" y1="40" x2="70" y2="80" stroke="#ff6b35" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <rect x="28" y="45" width="32" height="4" rx="2" fill="#ffccb3" />
      <rect x="28" y="54" width="24" height="3" rx="1.5" fill="#ffe0cc" />
      <g className="stamp-appear"><circle cx="50" cy="65" r="10" fill="none" stroke="#0ead8e" strokeWidth="2" /><text x="50" y="68" textAnchor="middle" fontSize="7" fontWeight="700" fill="#0ead8e">OK</text></g>
    </svg>
  );
}
function InsuranceSvg() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="flip-svg">
      <path d="M60 20 L90 35 L90 65 Q90 90 60 105 Q30 90 30 65 L30 35 Z" fill="#e6faf5" stroke="#0ead8e" strokeWidth="1.5" />
      <path d="M60 32 L82 43 L82 63 Q82 82 60 93 Q38 82 38 63 L38 43 Z" fill="white" opacity="0.8" />
      <path d="M47 60 L55 70 L73 48" stroke="#0ead8e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" className="check-draw" />
      <circle cx="40" cy="30" r="2" fill="#ff6b35" className="sparkle sp-1" />
      <circle cx="85" cy="28" r="1.5" fill="#f5a623" className="sparkle sp-2" />
      <circle cx="95" cy="55" r="2" fill="#ff6b35" className="sparkle sp-3" />
    </svg>
  );
}
const flipSvgMap: Record<string, React.FC> = { visa: VisaSvg, tour: TourSvg, corporate: CorporateSvg, insurance: InsuranceSvg };

const journeySteps = [
  { num: "01", title: "Dream It", tagline: "Tell us where you want to wake up tomorrow.", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80" },
  { num: "02", title: "Plan It", tagline: "We craft every detail so you don't have to.", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80" },
  { num: "03", title: "Book It", tagline: "One click. Flights, hotels, experiences — done.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?auto=format&fit=crop&w=1200&q=80" },
  { num: "04", title: "Live It", tagline: "Make the memories that last a lifetime.", image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80" },
];

/* Scrollytelling panel — detects when in viewport and tells parent which step is active */
function JourneyPanel({ step, index, onActivate }: { step: typeof journeySteps[0]; index: number; onActivate: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  useEffect(() => { if (isInView) onActivate(index); }, [isInView, index, onActivate]);
  return (
    <motion.div
      ref={ref}
      className="journey-panel"
      initial={{ opacity: 0.15 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: "-40% 0px -40% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="journey-panel-num">{step.num}</span>
      <h3>{step.title}</h3>
      <p>{step.tagline}</p>
    </motion.div>
  );
}

const howItWorks = [
  { step: "01", title: "Tell Us Your Dream", desc: "Share your travel vision — destination, dates, budget.", icon: PhoneCall },
  { step: "02", title: "We Craft Your Journey", desc: "Experts design a tailored itinerary with the best stays.", icon: CalendarDays },
  { step: "03", title: "Pack & Explore", desc: "Everything's handled. Just enjoy your dream trip.", icon: Compass },
];

const stories = [
  { quote: "Lagya made our honeymoon absolutely magical. Every hotel, every sunset — perfectly planned.", name: "Maya & Raj", role: "Bali Honeymoon", avatar: "🌺" },
  { quote: "I was nervous about my Canada PR process, but Lagya made it feel like booking a holiday.", name: "Dhruv Mehta", role: "Canada PR", avatar: "🍁" },
  { quote: "Our family trip to Europe was the best vacation ever. The kids still talk about it.", name: "The Sharma Family", role: "Europe Tour", avatar: "🏔️" },
  { quote: "From university shortlisting to accommodation — everything handled beautifully.", name: "Laura Kim", role: "UK Study Visa", avatar: "🎓" },
  { quote: "The Maldives package was insane value. Private villa, sunset cruise — all included.", name: "Priya & Arjun", role: "Maldives Getaway", avatar: "🐠" },
  { quote: "Best travel agency experience ever. Already planning my next trip with them.", name: "Sarah Verne", role: "Santorini Holiday", avatar: "🌊" },
];

const blogs = [
  { title: "Top 10 Beaches You Must Visit in 2026", tag: "Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
  { title: "A First-Timer's Guide to European Rail Travel", tag: "Europe", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" },
  { title: "Island Hopping in Southeast Asia", tag: "Adventure", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80" },
];

const faqs = [
  { q: "What destinations do you offer packages to?", a: "We cover 30+ countries across Europe, Asia, North America, Australia, and the Middle East." },
  { q: "Can you handle both visa and trip planning?", a: "Absolutely! We handle everything from visa filing to hotel bookings, flights, and sightseeing." },
  { q: "Do you offer group or family tour packages?", a: "Yes! We customize packages for solo travelers, couples, families, and groups." },
  { q: "What's included in your tour packages?", a: "Flights, accommodation, airport transfers, guided sightseeing, travel insurance, and 24/7 support." },
  { q: "How far in advance should I book?", a: "We recommend 2-3 months ahead for international trips, though last-minute getaways are possible." },
];

const travelStats = [
  { number: 50, suffix: "+", label: "Destinations" },
  { number: 12, suffix: "K+", label: "Happy Travelers" },
  { number: 98, suffix: "%", label: "Satisfaction" },
  { number: 24, suffix: "/7", label: "Support" },
];

const marqueeItems = [
  "Santorini 🇬🇷", "Bali 🇮🇩", "Switzerland 🇨🇭", "Dubai 🇦🇪", "Maldives 🇲🇻",
  "Paris 🇫🇷", "Tokyo 🇯🇵", "Canada 🇨🇦", "Australia 🇦🇺", "London 🇬🇧",
  "Singapore 🇸🇬", "Italy 🇮🇹", "New Zealand 🇳🇿", "Iceland 🇮🇸", "Thailand 🇹🇭",
];

const partnerLogos = ["Emirates", "Airbnb", "Booking.com", "Qatar Airways", "Marriott", "Expedia", "Lufthansa", "Hilton"];

/* ═══════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
  );
}
function StaggerReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>{children}</motion.div>
  );
}

/* Animated counter */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* Magnetic button */
function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }, [x, y]);
  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return (
    <motion.a ref={ref} href={href} className={className} style={{ x: springX, y: springY }}
      onMouseMove={handleMouse} onMouseLeave={handleLeave} whileTap={{ scale: 0.95 }}>{children}</motion.a>
  );
}

/* Word-by-word text reveal */
function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
      variants={{ show: { transition: { staggerChildren: 0.04 } } }}>
      {words.map((word, i) => (
        <motion.span key={i} style={{ display: "inline-block", marginRight: "0.3em" }}
          variants={{ hidden: { opacity: 0, y: 20, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>{word}</motion.span>
      ))}
    </motion.span>
  );
}

/* Parallax image */
function ParallaxImage({ src, alt, className, speed = 0.3 }: { src: string; alt: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.img src={src} alt={alt} style={{ y }} />
    </div>
  );
}

/* ═══════════════════════════════════
   PAGE
   ═══════════════════════════════════ */
export default function Page() {
  const [bgIndex, setBgIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  /* Horizontal scroll */
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: galleryProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const galleryX = useTransform(galleryProgress, [0, 1], ["0%", "-30%"]);

  /* Journey scrollytelling */
  const [activeStep, setActiveStep] = useState(0);
  const handleStepActivate = useCallback((i: number) => setActiveStep(i), []);

  const heroBackgrounds = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1800&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=80",
  ];

  useEffect(() => {
    const id = setInterval(() => setBgIndex((p) => (p + 1) % heroBackgrounds.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="page-shell">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="bg-flow bg-flow-one" />
      <div className="bg-flow bg-flow-two" />

      {/* ═══════ HERO ═══════ */}
      <section className="hero">
        <AnimatePresence mode="popLayout">
          <motion.div key={bgIndex} className="hero-dynamic-bg"
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ backgroundImage: `url(${heroBackgrounds[bgIndex]})` }} />
        </AnimatePresence>
        <div className="hero-overlay" />

        <header className="hero-nav">
          <motion.div className="brand" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <div className="brand-badge"><Globe2 size={18} /></div><span>lagya</span>
          </motion.div>
          <nav>
            <a href="#destinations">Destinations</a>
            <a href="#packages">Packages</a>
            <a href="#services">Services</a>
            <a href="#stories">Reviews</a>
            <a href="#blog">Journal</a>
          </nav>
          <MagneticButton href="#contact" className="nav-cta">Book a Trip <ArrowRight size={14} /></MagneticButton>
        </header>

        <div className="hero-inner">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <h1>
              <motion.span className="hero-line" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>Your Next</motion.span>
              <motion.span className="hero-line hero-italic" initial={{ opacity: 0, y: 40, rotateX: 30 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}>Adventure</motion.span>
              <motion.span className="hero-line" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}>Awaits</motion.span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}>
              Discover breathtaking destinations, handcrafted travel packages, and seamless visa services — all in one place.
            </motion.p>
          </motion.div>

          <motion.div className="hero-search" initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}>
            <div><span><MapPin size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />Destination</span><strong>Where to?</strong></div>
            <div><span><CalendarDays size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />When</span><strong>Select dates</strong></div>
            <div><span><Users size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />Travelers</span><strong>2 adults</strong></div>
            <motion.button type="button" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>Search Trips</motion.button>
          </motion.div>

          <motion.div className="hero-bottom-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6 }}>
            {travelStats.map((s) => (<div className="hero-mini" key={s.label}><strong><AnimatedCounter target={s.number} suffix={s.suffix} /></strong><span>{s.label}</span></div>))}
          </motion.div>
        </div>

        <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}>
          <motion.div className="scroll-hint-dot" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (<span key={i}>{item}</span>))}
        </div>
      </div>

      {/* ═══════ PARTNER LOGOS ═══════ */}
      <section className="partner-strip">
        <span className="partner-label">Trusted by leading travel brands</span>
        <div className="partner-logos">
          {partnerLogos.map((name) => (
            <motion.div key={name} className="partner-logo" whileHover={{ scale: 1.1, opacity: 1 }}>{name}</motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ DESTINATIONS ═══════ */}
      <section className="section" id="destinations">
        <Reveal>
          <SectionLabel><MapPin size={14} /> Popular Destinations</SectionLabel>
          <div className="section-head">
            <div><h2><TextReveal text="Explore Our Most Loved Destinations" /></h2></div>
            <MagneticButton className="pill-link" href="#packages">View All Trips <ArrowRight size={14} /></MagneticButton>
          </div>
        </Reveal>
        <StaggerReveal className="card-grid-three">
          {destinations.map((item, i) => (
            <motion.div className="image-card tall-card video-card" key={item.title} variants={scaleIn} transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -12, transition: { duration: 0.3 } }}>
              <video src={item.video} poster={item.poster} autoPlay muted loop playsInline />
              <motion.button type="button" className="plus-button" aria-label={item.title} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><Heart size={16} /></motion.button>
              <div className="image-card-copy">
                <div className="card-chip"><Star size={11} fill="currentColor" />{item.rating}</div>
                <h3>{item.title}</h3>
                <span className="card-duration"><Clock size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />{item.duration}</span>
                <div className="card-price">{item.price}</div>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>
      </section>

      {/* ═══════ HORIZONTAL SCROLL GALLERY ═══════ */}
      <section className="hscroll-section" ref={galleryRef}>
        <Reveal className="hscroll-header">
          <SectionLabel><Camera size={14} /> Gallery</SectionLabel>
          <h2><TextReveal text="Destinations That Take Your Breath Away" /></h2>
        </Reveal>
        <div className="hscroll-outer">
          <motion.div className="hscroll-track" style={{ x: galleryX }}>
            {galleryImages.map((img, i) => (
              <motion.div className="hscroll-card" key={i} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}>
                <img src={img.src} alt={img.label} />
                <div className="hscroll-label">
                  <span className="hscroll-tag">{img.tag}</span>
                  <strong>{img.label}</strong>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ YOUR JOURNEY ═══════ */}
      <section className="journey-section">
        <Reveal className="journey-header">
          <SectionLabel><Compass size={14} /> Your Journey</SectionLabel>
          <h2><TextReveal text="Four Steps to Paradise" /></h2>
        </Reveal>
        <div className="journey-scrolly">
          {/* Sticky image panel */}
          <div className="journey-sticky-img">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activeStep}
                src={journeySteps[activeStep].image}
                alt={journeySteps[activeStep].title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            {/* Step indicator dots */}
            <div className="journey-dots">
              {journeySteps.map((_, i) => (
                <div key={i} className={`journey-ind ${i === activeStep ? "active" : ""}`} />
              ))}
            </div>
          </div>
          {/* Scrolling text panels */}
          <div className="journey-panels">
            {journeySteps.map((step, i) => (
              <JourneyPanel key={step.num} step={step} index={i} onActivate={handleStepActivate} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TRAVEL PACKAGES ═══════ */}
      <section className="section" id="packages">
        <Reveal>
          <SectionLabel><Sparkles size={14} /> Travel Packages</SectionLabel>
          <div className="section-head centered-head">
            <h2><TextReveal text="Handcrafted Packages for Every Kind of Traveler" /></h2>
          </div>
        </Reveal>
        <StaggerReveal className="packages-grid">
          {packages.map((pkg, i) => (
            <motion.div className={`package-card ${pkg.featured ? "featured" : ""}`} key={pkg.title} variants={scaleIn} transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              {pkg.featured && <div className="featured-badge">Most Popular</div>}
              <div className="package-img"><img src={pkg.image} alt={pkg.title} /></div>
              <div className="package-body">
                <span className="package-loc"><MapPin size={13} /> {pkg.location}</span>
                <h3>{pkg.title}</h3>
                <span className="package-dur"><Clock size={13} /> {pkg.duration}</span>
                <div className="package-amenities">
                  {pkg.amenities.map((Ic, j) => (<div key={j} className="amenity-icon"><Ic size={16} /></div>))}
                </div>
                <div className="package-footer">
                  <div className="package-price">{pkg.price}<span>{pkg.perPerson}</span></div>
                  <motion.button className="package-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>View Details</motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="section services-section" id="services">
        <Reveal>
          <SectionLabel><Briefcase size={14} /> Our Services</SectionLabel>
          <div className="section-head centered-head"><h2><TextReveal text="Everything You Need for the Perfect Trip" /></h2></div>
        </Reveal>
        <StaggerReveal className="services-grid">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const BackSvg = flipSvgMap[svc.svgId];
            return (
              <motion.div className="flip-card-outer" key={svc.title} variants={scaleIn} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="flip-card-inner">
                  <div className="flip-front service-card"><div className="service-icon"><Icon size={28} /></div><h3>{svc.title}</h3><p>{svc.desc}</p></div>
                  <div className="flip-back"><BackSvg /><h3>{svc.backTitle}</h3><p>{svc.backDesc}</p></div>
                </div>
              </motion.div>
            );
          })}
        </StaggerReveal>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="section how-section" id="how-it-works">
        <Reveal>
          <SectionLabel><Sparkles size={14} /> How It Works</SectionLabel>
          <div className="section-head centered-head"><h2><TextReveal text="Three Simple Steps to Your Dream Trip" /></h2></div>
        </Reveal>
        <StaggerReveal className="steps-row">
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div className="step-card" key={step.step} variants={fade} transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(255,107,53,0.12)", transition: { duration: 0.3 } }}>
                <div className="step-number">{step.step}</div>
                <div className="step-icon-wrap"><Icon size={32} /></div>
                <h3>{step.title}</h3><p>{step.desc}</p>
              </motion.div>
            );
          })}
        </StaggerReveal>
      </section>

      {/* ═══════ PARALLAX BANNER ═══════ */}
      <section className="section">
        <motion.div className="fullwidth-image-banner" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <ParallaxImage src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80" alt="Lake" className="banner-parallax-wrap" speed={0.4} />
          <div className="banner-overlay">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>Life Is Short.<br />The World Is Wide.</motion.h2>
            <MagneticButton href="#contact" className="pill-link">Start Planning <ArrowRight size={14} /></MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="section stats-bar">
        <div className="stats-bar-inner">
          {travelStats.map((s, i) => (
            <motion.div className="stat-item" key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}>
              <strong><AnimatedCounter target={s.number} suffix={s.suffix} /></strong><span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section stories-block" id="stories">
        <Reveal className="stories-head">
          <SectionLabel><Heart size={14} fill="currentColor" /> Traveler Reviews</SectionLabel>
          <h2><TextReveal text="Loved by Thousands of Happy Travelers" /></h2>
          <div className="stories-toolbar">
            <div className="rating-line">
              <span>4.8/5</span>
              <div>{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={16} fill="currentColor" />))}</div>
              <span>12,000+ reviews</span>
            </div>
            <div className="carousel-controls">
              <motion.button type="button" aria-label="Previous" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronLeft size={20} /></motion.button>
              <motion.button type="button" aria-label="Next" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronRight size={20} /></motion.button>
            </div>
          </div>
        </Reveal>
        <div className="testimonial-carousel">
          {stories.map((story, i) => (
            <motion.div className="quote-card" key={story.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }} whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.08)", transition: { duration: 0.3 } }}>
              <div className="quote-avatar">{story.avatar}</div>
              <p>&ldquo;{story.quote}&rdquo;</p>
              <div className="quote-meta"><div><strong>{story.name}</strong><span>{story.role}</span></div></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="section faq-panel" id="faq">
        <ParallaxImage src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80" alt="Mountains" className="faq-image" speed={0.25} />
        <Reveal className="faq-copy">
          <SectionLabel>FAQ</SectionLabel>
          <h2><TextReveal text="Got Questions? We've Got Answers" /></h2>
          <p className="faq-intro">Planning a trip can raise a lot of questions. Here are the ones travelers ask us most.</p>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}><summary><span>{faq.q}</span><ChevronDown size={18} /></summary><div className="faq-answer">{faq.a}</div></details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════ BLOG ═══════ */}
      <section className="section" id="blog">
        <Reveal>
          <SectionLabel><Compass size={14} /> Travel Journal</SectionLabel>
          <div className="section-head"><div><h2><TextReveal text="Stories & Tips from the Road" /></h2></div>
            <MagneticButton className="pill-link" href="#">Read All <ArrowRight size={14} /></MagneticButton>
          </div>
        </Reveal>
        <StaggerReveal className="card-grid-three compact-grid">
          {blogs.map((blog, i) => (
            <motion.div className="image-card blog-card" key={blog.title} variants={scaleIn} transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <img src={blog.image} alt={blog.title} />
              <div className="image-card-copy"><div className="card-chip">{blog.tag}</div><h3>{blog.title}</h3></div>
            </motion.div>
          ))}
        </StaggerReveal>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="section cta-box" id="contact">
        <Reveal className="cta-copy">
          <SectionLabel><Plane size={14} /> Ready to Go?</SectionLabel>
          <h2><TextReveal text="Book Your Dream Trip Today" /></h2>
          <p>Tell us where you want to go. We&apos;ll handle the rest — flights, hotels, visas, and unforgettable experiences.</p>
          <MagneticButton href="mailto:hello@lagyavisa.com" className="outline-button">Plan My Trip <ArrowRight size={14} /></MagneticButton>
        </Reveal>
        <div className="cta-images">
          <motion.img src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=700&q=80" alt="Santorini" whileHover={{ scale: 1.05, rotate: 1 }} transition={{ duration: 0.4 }} />
          <motion.img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80" alt="Bali" whileHover={{ scale: 1.05, rotate: -1 }} transition={{ duration: 0.4 }} />
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="brand"><div className="brand-badge"><Globe2 size={20} /></div><span>lagya</span></div>
          <p>Your trusted travel partner for unforgettable vacations, seamless visas, and handcrafted journeys around the world.</p>
        </div>
        <div className="footer-columns">
          <div><span>Quick Links</span><a href="#destinations">Destinations</a><a href="#packages">Packages</a><a href="#services">Services</a><a href="#blog">Journal</a></div>
          <div><span>Top Destinations</span><a href="#">Bali, Indonesia</a><a href="#">Santorini, Greece</a><a href="#">Swiss Alps</a><a href="#">Maldives</a></div>
          <div><span>Connect</span><a href="#">Instagram</a><a href="#">WhatsApp</a><a href="#">Facebook</a><a href="mailto:hello@lagyavisa.com">hello@lagyavisa.com</a></div>
        </div>
      </footer>
    </main>
  );
}
