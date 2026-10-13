import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  BookOpen,
  Cpu,
  Layers3,
  MessagesSquare,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Command,
  ExternalLink,
  FileText,
  Menu,
  Moon,
  MousePointer2,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { articles, creators, navItems, topics, type Article } from "./data";

function KineticStar() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="45"
          y="3"
          width="10"
          height="48"
          rx="2"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
    </svg>
  );
}

function readSaved(): string[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem("ovylus-saved") || "[]",
    );
    return Array.isArray(value)
      ? value.filter(
          (id): id is string =>
            typeof id === "string" && articles.some((a) => a.id === id),
        )
      : [];
  } catch {
    return [];
  }
}

function Artwork({
  kind,
  priority = false,
}: {
  kind: string;
  priority?: boolean;
}) {
  return (
    <div className={`artwork art-${kind}`} aria-hidden="true">
      {["robot", "chrome", "hand", "studio"].includes(kind) && (
        <img
          src={`/images/${({ robot: "hero-robot", chrome: "chrome-knot", hand: "robotic-hand", studio: "editorial-studio" } as Record<string, string>)[kind]}.png`}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      )}
      {kind === "workspace" && (
        <>
          <div className="art-grid" />
          <div className="creative-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <span className="window-name">OVYLUS / STUDIO</span>
            </div>
            <div className="window-content">
              <span className="tiny-label">ATUR IDE</span>
              <strong>
                susun
                <br />
                ide
                <span>
                  <KineticStar />
                </span>
              </strong>
              <div className="color-swatches">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <MousePointer2 className="art-cursor" size={37} />
          </div>
          <span className="art-coordinate">BUAT. PERIKSA. PERBAIKI.</span>
        </>
      )}
      {kind === "chip" && (
        <>
          <div className="circuit-lines" />
          <div className="microchip">
            <span>MODEL AI</span>
            <strong>AI</strong>
            <small>MODEL RINGKAS</small>
          </div>
          <span className="art-coordinate">UKURAN / EFISIENSI</span>
        </>
      )}
      {kind === "terminal" && (
        <>
          <div className="terminal-top">
            <span />
            <span />
            <span />
            <span>contoh_instruksi.txt</span>
          </div>
          <div className="terminal-copy">
            <span>&gt;_</span>
            <strong>
              tulis tugas,
              <br />
              beri konteks<span>_</span>
            </strong>
            <small>// jelaskan hasil yang kamu butuhkan</small>
          </div>
          <AudioLines className="terminal-wave" size={70} strokeWidth={1} />
        </>
      )}
      {kind === "network" && (
        <>
          <svg viewBox="0 0 400 240">
            <g stroke="currentColor" strokeWidth="1" opacity=".32">
              {[45, 120, 195].flatMap((y, i) =>
                [30, 90, 150, 210].map((z, j) => (
                  <path
                    key={`${i}-${j}`}
                    d={`M75 ${y} L195 ${z} M195 ${z} L320 ${y}`}
                  />
                )),
              )}
            </g>
            {[45, 120, 195].map((y) => (
              <g key={y}>
                <circle cx="75" cy={y} r="12" fill="#FF4000" />
                <circle cx="320" cy={y} r="12" fill="#040404" />
              </g>
            ))}
            {[30, 90, 150, 210].map((y) => (
              <circle
                key={y}
                cx="195"
                cy={y}
                r="15"
                fill="#FBFBFB"
                stroke="#040404"
                strokeWidth="2"
              />
            ))}
          </svg>
          <span className="art-coordinate">BELAJAR DARI DATA</span>
        </>
      )}
      {kind === "workflow" && (
        <>
          <div className="art-grid" />
          <div className="flow-art">
            <div>
              <FileText />
              <small>INPUT</small>
            </div>
            <ArrowRight />
            <div className="flow-ai">
              <Sparkles />
              <small>AI AGENT</small>
            </div>
            <ArrowRight />
            <div>
              <Check />
              <small>DONE</small>
            </div>
          </div>
          <span className="art-coordinate">
            FORMULIR → DATA → PEMBERITAHUAN
          </span>
        </>
      )}
      {kind === "governance" && (
        <>
          <span className="governance-star">
            <KineticStar />
          </span>
          <strong className="governance-copy">
            DATA
            <br />
            DAN
            <br />
            TANGGUNG JAWAB
          </strong>
          <span className="art-coordinate">AI / TANGGUNG JAWAB</span>
        </>
      )}
    </div>
  );
}

function Modal({
  children,
  onClose,
  label,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="icon-button modal-close"
          aria-label="Tutup detail"
          onClick={onClose}
        >
          <X size={21} />
        </button>
        {children}
      </div>
    </dialog>
  );
}

function ArticleDetail({
  article,
  saved,
  toggleSave,
  onClose,
}: {
  article: Article;
  saved: boolean;
  toggleSave: () => void;
  onClose: () => void;
}) {
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <Modal onClose={onClose} label={article.title}>
      <div className="detail-art">
        <Artwork kind={article.visual} />
        {article.videoId && !playVideo && (
          <button className="detail-play" onClick={() => setPlayVideo(true)}>
            <Play fill="currentColor" size={24} /> Putar video
          </button>
        )}
        {article.videoId && playVideo && (
          <iframe
            title={article.title}
            src={`https://www.youtube-nocookie.com/embed/${article.videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
      <div className="detail-body">
        <span className="eyebrow">
          <span className="orange-dot" />
          {article.category} / {article.topic}
        </span>
        <h2>{article.title}</h2>
        <p className="detail-description">{article.description}</p>
        <div className="detail-meta">
          <span>{article.author}</span>
          <span>
            <Clock3 size={14} />
            {article.meta}
          </span>
          <button
            className={`text-button ${saved ? "is-saved" : ""}`}
            onClick={toggleSave}
            aria-pressed={saved}
          >
            <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
            {saved ? "Tersimpan" : "Simpan"}
          </button>
        </div>
        <div className="editorial-note">
          Edisi demo ·{" "}
          {article.videoId
            ? "Kurasi dan ringkasan contoh. Video milik kreator asli."
            : "Konten editorial contoh, bukan berita terkini."}
        </div>
        {article.paragraphs.map((p) => (
          <p className="article-paragraph" key={p}>
            {p}
          </p>
        ))}
        <a
          href={article.source}
          className="button button-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          {article.videoId ? "Tonton di YouTube" : "Baca sumber asli"}
          <ExternalLink size={16} />
        </a>
        {article.videoId && (
          <p className="video-note">
            Pemutaran video memerlukan akses YouTube. Jika pemutar tidak
            tersedia, gunakan tautan di atas.
          </p>
        )}
      </div>
    </Modal>
  );
}

function ContentCard({
  article,
  saved,
  onOpen,
  onSave,
  index,
}: {
  article: Article;
  saved: boolean;
  onOpen: () => void;
  onSave: () => void;
  index: number;
}) {
  return (
    <article
      className={`content-card ${article.videoId ? "video-card" : "poster-card"}`}
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <div className="card-art">
        <button
          className="card-image-button"
          onClick={onOpen}
          aria-label={`Buka ${article.title}`}
        >
          <Artwork kind={article.visual} />
          <span className="image-tag">{article.label}</span>
          {article.videoId ? (
            <span className="video-play">
              <Play size={23} fill="currentColor" />
              <span>Tonton video</span>
            </span>
          ) : (
            <span className="poster-open">
              Baca artikel
              <ArrowUpRight size={18} />
            </span>
          )}
          <span className="poster-time">
            <Clock3 size={12} />
            {article.meta}
          </span>
        </button>
        <button
          className={`save-button ${saved ? "is-saved" : ""}`}
          aria-label={`${saved ? "Hapus simpanan" : "Simpan"}: ${article.title}`}
          aria-pressed={saved}
          onClick={onSave}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="card-body">
        <span className="card-label">
          {article.author}
          <span> / </span>
          {article.topic}
        </span>
        <h3>
          <button onClick={onOpen}>{article.title}</button>
        </h3>
        <p className="card-description">{article.description}</p>
      </div>
    </article>
  );
}

const interests = [
  {
    id: "dasar",
    label: "Saya baru mengenal AI",
    ids: ["ai-basics", "llm-video"],
  },
  {
    id: "kerja",
    label: "Saya ingin menghemat waktu kerja",
    ids: ["workflow", "research-flow"],
  },
  {
    id: "teknis",
    label: "Saya ingin memahami cara kerjanya",
    ids: ["neural-video", "first-agent"],
  },
];

export default function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const [saved, setSaved] = useState<string[]>(readSaved);
  const [activeNav, setActiveNav] = useState("Beranda");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("Semua");
  const [savedOnly, setSavedOnly] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sort, setSort] = useState("editor");
  const [slide, setSlide] = useState(0);
  const [selected, setSelected] = useState<Article | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [interest, setInterest] = useState("dasar");
  const [railState, setRailState] = useState({ previous: false, next: true });
  const searchRef = useRef<HTMLInputElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const tiltFrame = useRef<number>(0);
  const featured = [articles[0], articles[1], articles[8]];
  const hero = featured[slide];
  const heroHeadlines = [
    ["AI agent bisa", "membantu apa?"],
    ["Bagaimana AI", "menyelesaikan soal?"],
    ["Otomatisasi tugas,", "mulai dari mana?"],
  ];
  const heroSummaries = [
    "Kenali cara AI menyusun langkah, menggunakan alat, dan menjalankan tugas. Pelajari juga kapan hasilnya perlu diperiksa.",
    "Model reasoning dirancang untuk mengerjakan masalah dalam beberapa langkah. Pahami kegunaannya dan cara menilai hasilnya.",
    "Mulai dari satu pekerjaan sederhana: mencatat formulir ke spreadsheet dan mengirim pemberitahuan dengan n8n.",
  ];
  const isFiltered = !!query.trim() || topic !== "Semua" || savedOnly;
  const visibleArticles = (
    isFiltered
      ? articles.filter(
          (a) =>
            (!savedOnly || saved.includes(a.id)) &&
            (topic === "Semua" || a.topic === topic) &&
            `${a.title} ${a.description} ${a.category} ${a.topic} ${a.author}`
              .toLocaleLowerCase("id")
              .includes(query.trim().toLocaleLowerCase("id")),
        )
      : articles
          .filter((a) => a.category === "Berita AI")
          .slice(0, expanded ? undefined : 4)
  ).sort((a, b) => (sort === "az" ? a.title.localeCompare(b.title, "id") : 0));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#040404" : "#FBFBFB");
    try {
      localStorage.setItem("ovylus-theme", theme);
    } catch {
      /* Session theme remains usable. */
    }
  }, [theme]);
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(id);
  }, [toast]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("reveal-ready");
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      document
        .querySelectorAll(".reveal-ready")
        .forEach((el) => el.classList.remove("reveal-ready"));
    };
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance =
          document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty(
          "--page-progress",
          `${distance > 0 ? (window.scrollY / distance) * 100 : 0}%`,
        );
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(tiltFrame.current);
    };
  }, []);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () =>
      setRailState({
        previous: rail.scrollLeft > 4,
        next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
      });
    const resize = new ResizeObserver(update);
    resize.observe(rail);
    rail.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      resize.disconnect();
      rail.removeEventListener("scroll", update);
    };
  }, []);

  function toggleSave(id: string) {
    const exists = saved.includes(id);
    const next = exists ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem("ovylus-saved", JSON.stringify(next));
      setToast(
        exists
          ? "Artikel dihapus dari simpanan."
          : "Artikel tersimpan. Buka menu Simpanan untuk membacanya lagi.",
      );
    } catch {
      setToast(
        "Artikel disimpan untuk sesi ini. Penyimpanan browser tidak tersedia.",
      );
    }
  }
  function scrollTo(id: string) {
    requestAnimationFrame(() =>
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        }),
    );
  }
  function navigate(item: string) {
    setActiveNav(item);
    setMenuOpen(false);
    if (item === "Beranda" || item === "Berita AI") resetFilters();
    const ids: Record<string, string> = {
      Beranda: "beranda",
      "Berita AI": "jelajahi",
      "Video AI": "video",
      Automation: "automation",
      "Belajar AI": "belajar",
      Kreator: "kreator",
    };
    scrollTo(ids[item]);
  }
  function resetFilters() {
    setQuery("");
    setTopic("Semua");
    setSavedOnly(false);
  }
  function showSaved() {
    setSavedOnly((v) => !v);
    setQuery("");
    setTopic("Semua");
    setMenuOpen(false);
    scrollTo("jelajahi");
  }
  function card(article: Article, index: number) {
    return (
      <ContentCard
        key={article.id}
        article={article}
        index={index}
        saved={saved.includes(article.id)}
        onOpen={() => setSelected(article)}
        onSave={() => toggleSave(article.id)}
      />
    );
  }
  function moveVideo(direction: number) {
    const rail = railRef.current;
    if (rail)
      rail.scrollBy({
        left:
          direction *
          (rail.querySelector("article")!.getBoundingClientRect().width +
            parseFloat(getComputedStyle(rail).columnGap)),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  function tiltHero(event: React.PointerEvent<HTMLButtonElement>) {
    if (
      !window.matchMedia(
        "(hover: hover) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const target = event.currentTarget,
      bounds = target.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5,
      y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(tiltFrame.current);
    tiltFrame.current = requestAnimationFrame(() => {
      target.style.setProperty("--tilt-x", `${-y * 4}deg`);
      target.style.setProperty("--tilt-y", `${x * 4}deg`);
    });
  }
  function resetTilt(event: React.PointerEvent<HTMLButtonElement>) {
    cancelAnimationFrame(tiltFrame.current);
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Langsung ke konten
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <a
            className="brand"
            href="#beranda"
            aria-label="Ovylus Portal, beranda"
            onClick={(e) => {
              e.preventDefault();
              navigate("Beranda");
            }}
          >
            <img
              src="/images/ovylus-logo.png"
              alt="Ovylus Portal"
              width="474"
              height="150"
            />
          </a>
          <nav className="desktop-nav" aria-label="Navigasi utama">
            {navItems.map((item) => (
              <button
                key={item}
                className={`nav-link ${activeNav === item ? "active" : ""}`}
                aria-current={activeNav === item ? "page" : undefined}
                onClick={() => navigate(item)}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="search-toggle"
              aria-label="Buka pencarian"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search size={16} />
              <span>Cari topik...</span>
            </button>
            <button
              className="icon-button theme-button"
              aria-label={
                theme === "light"
                  ? "Aktifkan tema gelap"
                  : "Aktifkan tema terang"
              }
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button
              className="icon-button mobile-menu-button"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="Navigasi mobile"
          >
            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => navigate(item)}
                className={activeNav === item ? "active" : ""}
              >
                <span>
                  <small aria-hidden="true">0{i + 1}</small>
                  {item}
                </span>
                <ArrowUpRight size={20} />
              </button>
            ))}
            <button onClick={showSaved}>
              <span>Simpanan saya ({saved.length})</span>
              <Bookmark size={18} />
            </button>
          </nav>
        )}
        {searchOpen && (
          <form
            className="search-panel container"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              scrollTo("jelajahi");
            }}
          >
            <Search size={20} />
            <input
              ref={searchRef}
              aria-label="Cari konten AI"
              placeholder="Cari artikel, topik, atau kreator"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSavedOnly(false);
              }}
            />
            <button className="button button-dark" type="submit">
              Cari
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="Tutup pencarian"
              onClick={() => setSearchOpen(false)}
            >
              <X size={18} />
            </button>
          </form>
        )}
        <div className="reading-progress" aria-hidden="true" />
      </header>

      <main id="main">
        <section className="hero" id="beranda" aria-label="Konten pilihan">
          <div className="hero-line container">
            <span>
              <span className="orange-dot" /> AI, dijelaskan dengan sederhana.
            </span>
            <span>ARTIKEL · VIDEO · PANDUAN</span>
          </div>
          <div className="hero-main container">
            <div className="hero-copy" key={hero.id}>
              <span className="eyebrow hero-category">
                <span className="mini-line" />
                PANDUAN PILIHAN
                <span className="hero-count">0{slide + 1} / 03</span>
              </span>
              <h1>
                {heroHeadlines[slide][0]}
                <br />
                <span>{heroHeadlines[slide][1]}</span>
              </h1>
              <p>{heroSummaries[slide]}</p>
              <div className="hero-buttons">
                <button
                  className="button button-orange"
                  onClick={() => setSelected(hero)}
                >
                  Baca Selengkapnya
                  <ArrowUpRight size={18} />
                </button>
                <button
                  className={`hero-save ${saved.includes(hero.id) ? "is-saved" : ""}`}
                  aria-label={`${saved.includes(hero.id) ? "Hapus simpanan" : "Simpan"} artikel pilihan`}
                  aria-pressed={saved.includes(hero.id)}
                  onClick={() => toggleSave(hero.id)}
                >
                  <Bookmark
                    size={17}
                    fill={saved.includes(hero.id) ? "currentColor" : "none"}
                  />
                  <span>
                    {saved.includes(hero.id) ? "Tersimpan" : "Simpan artikel"}
                  </span>
                </button>
              </div>
              <span className="hero-credit">
                <Clock3 size={13} />
                {hero.meta}
                <span>·</span>
                {hero.author}
              </span>
            </div>
            <div className="hero-visual">
              <div className="hero-orbit" aria-hidden="true" />
              <button
                className="hero-media"
                onPointerMove={tiltHero}
                onPointerLeave={resetTilt}
                onClick={() => setSelected(hero)}
                aria-label={`Buka pilihan: ${hero.title}`}
              >
                <Artwork
                  kind={hero.visual === "workflow" ? "studio" : hero.visual}
                  priority
                />
                <span className="hero-image-index">OVYLUS / 0{slide + 1}</span>
                <span className="hero-image-caption">
                  <span>
                    <small>{hero.topic}</small>
                    <strong>
                      {
                        [
                          "Dari chatbot ke AI agent",
                          "Memahami model reasoning",
                          "Alur kerja yang bisa kamu coba",
                        ][slide]
                      }
                    </strong>
                  </span>
                  <span className="circle-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div className="hero-bottom container">
            <div
              className="hero-chapters"
              role="group"
              aria-label="Pilih artikel utama"
            >
              {[
                "Mengenal AI agent",
                "Cara AI menyelesaikan soal",
                "Otomatisasi pekerjaan",
              ].map((title, i) => (
                <button
                  key={title}
                  aria-label={`Artikel utama ${i + 1}`}
                  aria-pressed={slide === i}
                  className={slide === i ? "active" : ""}
                  onClick={() => setSlide(i)}
                >
                  <span>0{i + 1}</span>
                  <strong>{title}</strong>
                  <ArrowUpRight size={13} />
                </button>
              ))}
            </div>
            <div className="hero-pagination">
              <button
                className="hero-arrow"
                aria-label="Artikel utama sebelumnya"
                onClick={() => setSlide((slide + 2) % 3)}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="hero-arrow"
                aria-label="Artikel utama berikutnya"
                onClick={() => setSlide((slide + 1) % 3)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section
          className="discovery section container"
          id="jelajahi"
          data-reveal
        >
          <div className="filter-bar">
            <div
              className="topic-filters"
              role="group"
              aria-label="Filter topik"
            >
              {topics.map((t) => (
                <button
                  key={t}
                  className={`filter-chip ${topic === t ? "active" : ""}`}
                  aria-pressed={topic === t}
                  onClick={() => setTopic(t)}
                >
                  {t === "Semua" && <Command size={13} />}
                  <span>{t === "Semua" ? "Semua topik" : t}</span>
                </button>
              ))}
            </div>
            <button
              className={`text-button collection-button ${savedOnly ? "is-saved" : ""}`}
              aria-pressed={savedOnly}
              onClick={showSaved}
            >
              <Bookmark size={16} fill={savedOnly ? "currentColor" : "none"} />
              <span>Simpanan</span>
              <span className="count-badge">{saved.length}</span>
            </button>
          </div>
          <div className="section-heading">
            <div>
              <span className="eyebrow section-eyebrow">
                <span className="orange-dot" />
                BACA & PAHAMI
              </span>
              <h2>
                {savedOnly
                  ? "Artikel yang kamu simpan"
                  : isFiltered
                    ? "Hasil pencarian & filter"
                    : "Artikel seputar AI"}
              </h2>
            </div>
            <label className="sort-control">
              <SlidersHorizontal size={14} />
              <select
                aria-label="Urutkan konten"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="editor">Pilihan editor</option>
                <option value="az">Judul A–Z</option>
              </select>
            </label>
          </div>
          {isFiltered && (
            <div className="result-summary" aria-live="polite">
              <span>
                {visibleArticles.length} konten
                {query.trim() ? ` untuk “${query.trim()}”` : ""}
                {topic !== "Semua" ? ` · ${topic}` : ""}
              </span>
              <button onClick={resetFilters}>
                Reset filter
                <X size={13} />
              </button>
            </div>
          )}
          {visibleArticles.length ? (
            <div className="news-grid">{visibleArticles.map(card)}</div>
          ) : (
            <div className="empty-state">
              <Search size={30} />
              <h3>
                {savedOnly
                  ? "Belum ada artikel tersimpan"
                  : "Tidak ada hasil yang cocok"}
              </h3>
              <p>
                {savedOnly
                  ? "Tekan ikon bookmark pada artikel atau video untuk menyimpannya di sini."
                  : "Coba kata kunci yang lebih singkat atau pilih topik lain."}
              </p>
              <button className="button button-dark" onClick={resetFilters}>
                Jelajahi semua konten
                <ArrowRight size={16} />
              </button>
            </div>
          )}
          {!isFiltered && (
            <div className="section-bottom">
              <span className="demo-caption">
                Konten contoh untuk pratinjau desain.
              </span>
              <button
                className="text-button"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Tampilkan lebih sedikit" : "Lihat semua artikel"}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        <section className="video-section" id="video">
          <div className="container" data-reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow section-eyebrow">
                  <span className="orange-dot" />
                  BELAJAR LEWAT VIDEO
                </span>
                <h2>
                  Lihat cara kerjanya<span className="orange-text">.</span>
                </h2>
                <p className="section-description">
                  Penjelasan dari kreator pilihan, dengan ringkasan berbahasa
                  Indonesia.
                </p>
              </div>
              <div className="rail-controls">
                <button
                  className="hero-arrow"
                  disabled={!railState.previous}
                  aria-label="Video sebelumnya"
                  onClick={() => moveVideo(-1)}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="hero-arrow"
                  disabled={!railState.next}
                  aria-label="Video berikutnya"
                  onClick={() => moveVideo(1)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div
              className="video-grid"
              ref={railRef}
              tabIndex={0}
              role="region"
              aria-label="Daftar video, dapat digeser"
            >
              {articles.filter((a) => a.category === "Video AI").map(card)}
            </div>
            <span className="rail-hint">
              <ArrowRight size={13} />
              Geser untuk melihat video berikutnya
            </span>
          </div>
        </section>

        <section
          className="automation-section section container"
          id="automation"
          data-reveal
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow section-eyebrow">
                <span className="orange-dot" />
                AUTOMATION
              </span>
              <h2>Kurangi pekerjaan berulang.</h2>
            </div>
            <p className="heading-note">
              Contoh alur kerja yang bisa kamu pelajari
              <br className="desktop-break" /> dan sesuaikan dengan kebutuhanmu.
            </p>
          </div>
          <div className="automation-grid">
            {articles
              .filter((a) => a.category === "Automation")
              .map((article, i) => (
                <button
                  className={`automation-card ${i === 1 ? "featured" : ""}`}
                  key={article.id}
                  onClick={() => setSelected(article)}
                >
                  <div className="automation-card-top">
                    <span>
                      {
                        [
                          "PENCATATAN DATA",
                          "DOKUMEN & RISET",
                          "OPERASIONAL BISNIS",
                        ][i]
                      }
                    </span>
                    {i === 0 ? (
                      <Workflow size={19} />
                    ) : i === 1 ? (
                      <FileText size={19} />
                    ) : (
                      <Layers3 size={19} />
                    )}
                  </div>
                  <div className="workflow-preview" aria-hidden="true">
                    {i === 0 ? (
                      <>
                        <span>
                          <FileText size={18} />
                          <small>Formulir</small>
                        </span>
                        <i />
                        <span>
                          <Layers3 size={18} />
                          <small>Data</small>
                        </span>
                        <i />
                        <span>
                          <Check size={18} />
                          <small>Tercatat</small>
                        </span>
                      </>
                    ) : i === 1 ? (
                      <div className="document-preview">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span className="doc-check">
                          <Check size={16} />
                          Sumber terhubung
                        </span>
                      </div>
                    ) : (
                      <div className="checklist-preview">
                        <span>
                          <Check size={14} /> Catat tugas berulang
                        </span>
                        <span>
                          <Check size={14} /> Hitung waktu pengerjaan
                        </span>
                        <span>
                          <Check size={14} /> Pilih satu untuk dicoba
                        </span>
                      </div>
                    )}
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="automation-tags">
                    {(i === 0
                      ? ["n8n", "Spreadsheet", "Pemula"]
                      : i === 1
                        ? ["Ringkasan", "Verifikasi sumber"]
                        : ["Pemetaan tugas", "Bisnis"]
                    ).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="automation-card-bottom">
                    <span>Baca panduan</span>
                    <ArrowUpRight size={20} />
                  </div>
                </button>
              ))}
          </div>
        </section>

        <section
          className="learn-section section container"
          id="belajar"
          data-reveal
        >
          <div className="learn-intro">
            <span className="eyebrow section-eyebrow">
              <span className="orange-dot" />
              BELAJAR AI
            </span>
            <h2>
              Mulai dari dasar.
              <br />
              Lanjutkan dengan praktik.
            </h2>
            <p>
              Tiga panduan singkat untuk mengenal AI, menulis instruksi, dan
              merancang agent pertama.
            </p>
            <div className="learning-mark" aria-hidden="true">
              <span className="book-spine" />
              <BookOpen size={58} strokeWidth={1.1} />
              <span className="learning-mark-label">
                CATATAN
                <br />
                BELAJAR AI
              </span>
              <span className="learning-star">
                <KineticStar />
              </span>
            </div>
          </div>
          <div className="learn-grid">
            {articles
              .filter((a) => a.category === "Belajar AI")
              .map((article, i) => (
                <button
                  className="learn-card"
                  key={article.id}
                  onClick={() => setSelected(article)}
                >
                  <span className="learn-number">0{i + 1}</span>
                  <span className="learn-content">
                    <span className="level-badge">
                      {article.label}
                      <span> / </span>
                      {article.meta}
                    </span>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                  </span>
                  <span className="learn-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </button>
              ))}
          </div>
        </section>

        <section
          className="creators-section section container"
          id="kreator"
          data-reveal
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow section-eyebrow">
                <span className="orange-dot" />
                KREATOR & KOMUNITAS
              </span>
              <h2>Belajar dari yang membagikan ilmunya.</h2>
            </div>
            <p className="heading-note">
              Kanal pilihan untuk memperdalam
              <br className="desktop-break" /> pemahaman tentang AI.
            </p>
          </div>
          <div className="creators-grid">
            {creators.map((creator, i) => (
              <a
                className="creator-card"
                key={creator.name}
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="creator-card-top">
                  <span className="creator-index">0{i + 1}</span>
                  <span>{creator.mark}</span>
                </div>
                <div
                  className={`creator-avatar avatar-${creator.color}`}
                  aria-hidden="true"
                >
                  {creator.initials}
                </div>
                <h3>{creator.name}</h3>
                <p>{creator.role}</p>
                <div className="creator-link">
                  {i === 2 ? "Buka materi belajar" : "Buka kanal YouTube"}
                  <ArrowUpRight size={17} />
                </div>
                <span className="sr-only"> (tab baru)</span>
              </a>
            ))}
          </div>
        </section>

        <section className="starter-section container" data-reveal>
          <div className="starter-intro">
            <span className="eyebrow">
              <span className="orange-dot" />
              PILIH BACAAN PERTAMAMU
            </span>
            <h2>
              Ingin belajar apa
              <br />
              hari ini?
            </h2>
            <p>Pilih kebutuhanmu. Kami bantu temukan bacaan yang sesuai.</p>
          </div>
          <div className="starter-content">
            <div
              className="interest-options"
              role="group"
              aria-label="Pilih kebutuhan belajar"
            >
              {interests.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={interest === item.id}
                  className={interest === item.id ? "active" : ""}
                  onClick={() => setInterest(item.id)}
                >
                  <span className="interest-radio">
                    {interest === item.id && <Check size={12} />}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
            <div
              className="recommendations"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>BACAAN UNTUKMU</span>
              {interests
                .find((i) => i.id === interest)!
                .ids.map((id) => {
                  const article = articles.find((a) => a.id === id)!;
                  return (
                    <button key={id} onClick={() => setSelected(article)}>
                      <span>{article.title}</span>
                      <ArrowUpRight size={18} />
                    </button>
                  );
                })}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-about">
              <span className="footer-wordmark">
                OVYLUS<span> PORTAL</span>
                <i />
              </span>
              <p>
                Artikel, video, dan panduan praktis untuk memahami AI dan
                menggunakannya dalam pekerjaan sehari-hari.
              </p>
              <button
                className="footer-explore"
                onClick={() => {
                  resetFilters();
                  scrollTo("jelajahi");
                }}
              >
                Jelajahi artikel
                <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="footer-links">
              <span>JELAJAHI</span>
              {navItems.slice(1).map((item) => (
                <button key={item} onClick={() => navigate(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="footer-links">
              <span>TENTANG PORTAL</span>
              <button onClick={() => setInfo("Tentang Ovylus")}>
                Tentang Ovylus
              </button>
              <button onClick={() => setInfo("Kebijakan editorial")}>
                Kebijakan editorial
              </button>
              <button onClick={() => setInfo("Privasi")}>Privasi</button>
              <button onClick={showSaved}>
                Simpanan saya ({saved.length})
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Ovylus Portal</span>
            <span>Dirancang untuk pembaca yang ingin memahami AI.</span>
            <a href="#beranda" aria-label="Kembali ke atas">
              Kembali ke atas
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </footer>
      {selected && (
        <ArticleDetail
          key={selected.id}
          article={selected}
          saved={saved.includes(selected.id)}
          toggleSave={() => toggleSave(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
      {info && (
        <Modal label={info} onClose={() => setInfo(null)}>
          <div className="info-body">
            <span className="eyebrow">
              <span className="orange-dot" />
              OVYLUS PORTAL
            </span>
            <h2>{info}</h2>
            {info === "Privasi" ? (
              <>
                <p>
                  Halaman ini menyimpan pilihan tema dan daftar artikel di
                  browser pada perangkatmu. Versi ini tidak memiliki akun,
                  analitik, atau formulir pengumpulan data.
                </p>
                <p>
                  Video YouTube baru dimuat setelah kamu menekan putar. Layanan
                  tersebut dan tautan eksternal memiliki kebijakan privasi
                  masing-masing.
                </p>
                <button
                  className="button button-dark"
                  onClick={() => {
                    try {
                      localStorage.removeItem("ovylus-saved");
                      localStorage.removeItem("ovylus-theme");
                    } catch {
                      /* Local state can still be cleared. */
                    }
                    setSaved([]);
                    setTheme("light");
                    setToast(
                      "Simpanan dihapus dan tema dikembalikan ke terang.",
                    );
                  }}
                >
                  Hapus simpanan & reset tema
                </button>
              </>
            ) : info === "Kebijakan editorial" ? (
              <>
                <p>
                  Artikel harus menjelaskan topik dengan bahasa yang mudah
                  dipahami, menyertakan sumber, dan membedakan fakta dari
                  pendapat.
                </p>
                <p>
                  Versi ini berisi konten contoh untuk pratinjau desain. Artikel
                  bukan laporan berita terkini. Video berasal dari kanal kreator
                  yang ditautkan. Gambar ilustrasi dibuat dengan AI; gambar
                  tersebut bukan dokumentasi peristiwa atau orang tertentu.
                </p>
                <p>
                  Sebelum terbit sebagai media, artikel perlu diperiksa faktanya
                  dan dilengkapi tanggal publikasi. Konten berbayar harus diberi
                  label yang jelas.
                </p>
              </>
            ) : (
              <>
                <p>
                  Ovylus Portal menyediakan artikel, video pilihan, dan panduan
                  praktis tentang AI dalam bahasa Indonesia.
                </p>
                <p>
                  Kamu bisa mulai dari penjelasan dasar, mencari alat untuk
                  pekerjaan tertentu, atau mempelajari cara mengotomatisasi
                  tugas. Setiap bacaan menyertakan sumber untuk dipelajari lebih
                  lanjut.
                </p>
              </>
            )}
          </div>
        </Modal>
      )}
      <div
        className={`toast ${toast ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Check size={16} />
            {toast}
          </>
        )}
      </div>
    </>
  );
}
