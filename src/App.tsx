import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ShieldCheck,
  Star,
  Leaf,
  Wrench,
  CircleDot,
  Disc3,
  Snowflake,
  ChevronRight,
  Calendar,
} from "lucide-react";

/* ============================================================
   M MÉCANIQUE 360 — Saint-Bruno-de-Montarville
   Design inspiré de la référence "auto repair shop",
   décliné aux couleurs de la marque (vert / clé verte).
   ============================================================ */

const PHONE = "(450) 461-2411";
const PHONE_HREF = "tel:+14504612411";
const ADDRESS = "2070, boul. Sir Wilfrid Laurier, Saint-Bruno-de-Montarville, QC";

/* --- Logo recréé en SVG (emblème MM360 + swoosh) --- */
function Logo({ light = false }: { light?: boolean }) {
  const ink = light ? "#ffffff" : "#14181D";
  return (
    <div className="flex items-center gap-3 select-none">
      <svg width="46" height="46" viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M6 42c13-16 39-16 52 0"
          fill="none"
          stroke="#1FAE4E"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <text
          x="32"
          y="33"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontWeight={900}
          fontSize="20"
          fill={ink}
        >
          MM
        </text>
        <text
          x="32"
          y="52"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontWeight={900}
          fontSize="14"
          fill="#1FAE4E"
        >
          360
        </text>
      </svg>
      <div className="leading-none">
        <div
          className="font-display font-extrabold tracking-tight text-[17px]"
          style={{ color: ink }}
        >
          M MÉCANIQUE <span className="text-[var(--accent)]">360</span>
        </div>
        <div
          className="text-[10px] tracking-[0.22em] mt-1 font-medium"
          style={{ color: light ? "rgba(255,255,255,.6)" : "#7A8290" }}
        >
          PNEUS &amp; MÉCANIQUE
        </div>
      </div>
    </div>
  );
}

/* --- Image avec fallback dégradé + fade-in --- */
function Img({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#1b2026] to-[#0c0f12] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        // @ts-ignore
        fetchpriority={eager ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

const NAV = ["Accueil", "À propos", "Services", "Avis", "Contact"];

const SERVICES = [
  {
    icon: CircleDot,
    title: "Pneus & jantes",
    desc: "Vente, installation, équilibrage et entreposage. Toutes marques, été comme hiver, au meilleur prix.",
    img: "/images/service-1.webp",
  },
  {
    icon: Disc3,
    title: "Freins & suspension",
    desc: "Plaquettes, disques, amortisseurs et direction. Une route sûre commence par un freinage impeccable.",
    img: "/images/service-2.webp",
  },
  {
    icon: Snowflake,
    title: "Climatisation & diagnostic",
    desc: "Recharge A/C, diagnostic électronique et entretien préventif pour rouler confortablement, en toute saison.",
    img: "/images/service-3.webp",
  },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Garantie sur nos services", sub: "Travail certifié et garanti" },
  { icon: Clock, title: "Experts depuis des années", sub: "Une équipe d'expérience" },
  { icon: Star, title: "Noté 4,5 / 5", sub: "Par nos clients satisfaits" },
  { icon: Leaf, title: "Certifié Clé Verte", sub: "Garage éco-responsable" },
];

export default function App() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 150}px, ${
          e.clientY - 150
        }px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[var(--ink)] font-body antialiased overflow-x-hidden">
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden md:block"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(31,174,78,0.18) 0%, rgba(31,174,78,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ===== Top utility bar ===== */}
      <div className="relative z-20 bg-[var(--accent)] text-white">
        <div className="mx-auto max-w-7xl px-5 py-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-1 text-[12.5px] font-medium tracking-wide">
          <span className="flex items-center gap-2">
            <MapPin size={14} strokeWidth={2.4} /> {ADDRESS}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} strokeWidth={2.4} /> Lun–Jeu 8h–17h · Ven 8h–15h
          </span>
          <a href={PHONE_HREF} className="flex items-center gap-2 hover:opacity-80">
            <Phone size={14} strokeWidth={2.4} /> {PHONE}
          </a>
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 h-[74px] flex items-center justify-between">
          <a href="#accueil">
            <Logo />
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-[14px] font-semibold tracking-wide text-[#3a424d]">
            {NAV.map((n) => (
              <a
                key={n}
                href="#"
                className="relative py-1 transition-colors hover:text-[var(--accent)]"
              >
                {n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-[13px] font-bold tracking-wide uppercase px-5 py-3 transition-colors"
              style={{ borderRadius: 2 }}
            >
              <Calendar size={16} /> Prendre rendez-vous
            </a>
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-black/5 px-5 py-4 flex flex-col gap-3 text-[15px] font-semibold">
            {NAV.map((n) => (
              <a key={n} href="#" onClick={() => setMenuOpen(false)}>
                {n}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section id="accueil" className="relative">
        <div className="absolute inset-0">
          <Img
            src="/images/hero.webp"
            alt="Mécanicien M Mécanique 360 réparant un véhicule"
            className="h-full w-full"
            eager
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-[120px] md:py-[170px]">
          <p className="text-[var(--accent-bright)] font-semibold tracking-[0.22em] text-[12px] uppercase mb-5">
            Saint-Bruno-de-Montarville · QC
          </p>
          <h1 className="font-display font-black text-white uppercase leading-[0.92] tracking-[-0.02em] text-[15vw] sm:text-[80px] md:text-[96px] max-w-4xl">
            Garage
            <br />
            Pneus &amp;
            <br />
            <span className="text-[var(--accent-bright)]">Mécanique</span>
          </h1>
          <p className="mt-7 text-white/85 text-[17px] md:text-[19px] max-w-xl leading-relaxed font-medium">
            Maître de la route, avec vous. Nos copilotes réparent tout type de
            véhicules et vous conseillent en toute confiance.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-[14px] font-bold uppercase tracking-wide px-7 py-4 transition-all hover:-translate-y-1"
              style={{ borderRadius: 2 }}
            >
              Prendre rendez-vous <ChevronRight size={18} />
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 border border-white/35 text-white text-[14px] font-bold uppercase tracking-wide px-7 py-4 transition-all hover:bg-white/10"
              style={{ borderRadius: 2 }}
            >
              <Phone size={17} /> {PHONE}
            </a>
          </div>
        </div>

        {/* Feature strip */}
        <div className="relative bg-[var(--ink)]">
          <div className="mx-auto max-w-7xl px-5 py-9 grid grid-cols-2 lg:grid-cols-4 gap-y-7 gap-x-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3.5">
                <span className="shrink-0 grid place-items-center w-11 h-11 bg-[var(--accent)]/15 text-[var(--accent-bright)]" style={{ borderRadius: 2 }}>
                  <f.icon size={22} strokeWidth={2.2} />
                </span>
                <div>
                  <div className="text-white font-bold text-[14px] uppercase tracking-wide leading-tight">
                    {f.title}
                  </div>
                  <div className="text-white/55 text-[12.5px] mt-1">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== À PROPOS ===== */}
      <section id="apropos" className="bg-[#F6F7F8]">
        <div className="mx-auto max-w-7xl px-5 py-[110px] grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <Img
              src="/images/editorial.webp"
              alt="Atelier de M Mécanique 360"
              className="aspect-[3/2] w-full shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            />
            <div
              className="absolute -bottom-6 -right-4 sm:right-6 bg-[var(--accent)] text-white px-7 py-5 shadow-lg"
              style={{ borderRadius: 2 }}
            >
              <div className="font-display font-black text-3xl leading-none">4,5/5</div>
              <div className="text-[11px] uppercase tracking-[0.18em] mt-1.5 text-white/85">
                Note des clients
              </div>
            </div>
          </div>
          <div>
            <p className="text-[var(--accent)] font-semibold tracking-[0.22em] text-[12px] uppercase mb-4">
              À propos
            </p>
            <h2 className="font-display font-black uppercase text-[34px] md:text-[46px] leading-[0.98] tracking-[-0.015em]">
              À propos de{" "}
              <span className="text-[var(--accent)]">M Mécanique 360</span>
            </h2>
            <p className="mt-6 text-[#454d57] text-[16.5px] leading-[1.75] max-w-xl">
              Depuis nos débuts, nous offrons aux automobilistes de Saint-Bruno-de-Montarville
              et de la Rive-Sud un service honnête, rapide et complet. De la simple
              installation de pneus à la mécanique générale, nos copilotes prennent
              soin de votre véhicule comme du leur.
            </p>
            <p className="mt-4 text-[#454d57] text-[16.5px] leading-[1.75] max-w-xl">
              Fiers d'être certifiés <strong>Clé Verte</strong>, nous travaillons dans
              le respect de l'environnement, sans jamais compromettre la qualité ni
              votre sécurité.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-lg">
              {[
                "Mécanique générale & entretien préventif",
                "Inspection avant achat",
                "Échappement & batterie",
                "Remorquage & assistance routière",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2.5 text-[14.5px] font-medium text-[#2a313a]">
                  <Wrench size={17} className="text-[var(--accent)] mt-0.5 shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-[110px]">
          <div className="max-w-2xl mb-14">
            <p className="text-[var(--accent)] font-semibold tracking-[0.22em] text-[12px] uppercase mb-4">
              Nos services
            </p>
            <h2 className="font-display font-black uppercase text-[34px] md:text-[46px] leading-[0.98] tracking-[-0.015em]">
              Tout pour votre véhicule, sous un même toit
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="group bg-white border border-black/8 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
                style={{ borderRadius: 2 }}
              >
                <Img src={s.img} alt={s.title} className="aspect-[4/3] w-full" />
                <div className="p-7">
                  <span className="inline-grid place-items-center w-12 h-12 bg-[var(--accent)]/12 text-[var(--accent)] mb-5" style={{ borderRadius: 2 }}>
                    <s.icon size={24} strokeWidth={2.1} />
                  </span>
                  <h3 className="font-display font-extrabold text-[21px] uppercase tracking-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[#54606e] text-[15px] leading-[1.7]">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact" className="relative">
        <div className="absolute inset-0">
          <Img src="/images/cta.webp" alt="Atelier M Mécanique 360" className="h-full w-full" />
          <div className="absolute inset-0 bg-[var(--ink)]/90" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 py-[120px] text-center">
          <p className="text-[var(--accent-bright)] font-semibold tracking-[0.22em] text-[12px] uppercase mb-5">
            Prêt à reprendre la route ?
          </p>
          <h2 className="font-display font-black uppercase text-white text-[36px] md:text-[56px] leading-[0.98] tracking-[-0.015em]">
            Réservez votre rendez-vous dès aujourd'hui
          </h2>
          <p className="mt-6 text-white/75 text-[17px] max-w-xl mx-auto leading-relaxed">
            Un conseil, une estimation ou une réparation ? Notre équipe vous répond
            avec le sourire.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-[15px] font-bold uppercase tracking-wide px-8 py-4 transition-all hover:-translate-y-1"
              style={{ borderRadius: 2 }}
            >
              <Phone size={18} /> Appeler le {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0c0f12] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 grid md:grid-cols-3 gap-12">
          <div>
            <Logo light />
            <p className="mt-5 text-white/55 text-[14px] leading-relaxed max-w-xs">
              Garage de pneus et mécanique certifié Clé Verte à
              Saint-Bruno-de-Montarville. Maître de la route, avec vous.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase tracking-wide text-[14px] mb-5 text-[var(--accent-bright)]">
              Coordonnées
            </h4>
            <ul className="space-y-3 text-white/65 text-[14.5px]">
              <li className="flex gap-3">
                <MapPin size={17} className="text-[var(--accent)] shrink-0 mt-0.5" /> {ADDRESS}
              </li>
              <li className="flex gap-3">
                <Phone size={17} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <a href={PHONE_HREF} className="hover:text-white">{PHONE}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase tracking-wide text-[14px] mb-5 text-[var(--accent-bright)]">
              Heures d'ouverture
            </h4>
            <ul className="space-y-2 text-white/65 text-[14.5px]">
              <li className="flex justify-between max-w-[230px]"><span>Lun · Mar · Jeu</span><span>8h – 17h</span></li>
              <li className="flex justify-between max-w-[230px]"><span>Mercredi</span><span>Fermé</span></li>
              <li className="flex justify-between max-w-[230px]"><span>Vendredi</span><span>8h – 15h</span></li>
              <li className="flex justify-between max-w-[230px]"><span>Sam · Dim</span><span>Fermé</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/45 text-[13px]">
            <span>© {new Date().getFullYear()} M Mécanique 360 — Saint-Bruno-de-Montarville. Tous droits réservés.</span>
            <span className="tracking-[0.18em] uppercase text-[11px]">Pneus &amp; Mécanique · Clé Verte</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
