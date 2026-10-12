import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
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
      {(kind === "robot" || kind === "chrome") && (
        <img
          src={`/images/${kind === "robot" ? "hero-robot" : "chrome-knot"}.png`}
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
              <span className="tiny-label">MAKE ROOM FOR</span>
              <strong>
                big
                <br />
                ideas
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
          <span className="art-coordinate">CREATE. ITERATE. REPEAT.</span>
        </>
      )}
      {kind === "chip" && (
        <>
          <div className="circuit-lines" />
          <div className="microchip">
            <span>NEURAL ENGINE</span>
            <strong>AI</strong>
            <small>SMALL IS POWERFUL.</small>
          </div>
          <span className="art-coordinate">NEXT GEN / 001</span>
        </>
      )}
      {kind === "terminal" && (
        <>
          <div className="terminal-top">
            <span />
            <span />
            <span />
            <span>understanding_ai.md</span>
          </div>
          <div className="terminal-copy">
            <span>&gt;_</span>
            <strong>
              hello,
              <br />
              intelligence<span>_</span>
            </strong>
            <small>// a new way to understand</small>
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
          <span className="art-coordinate">CONNECTED BY INTELLIGENCE.</span>
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
          <span className="art-coordinate">LESS WORK. MORE FLOW.</span>
        </>
      )}
      {kind === "governance" && (
        <>
          <span className="governance-star">
            <KineticStar />
          </span>
          <strong className="governance-copy">
            WITH
            <br />
            GREAT
            <br />
            POWER.
          </strong>
          <span className="art-coordinate">AI / RESPONSIBILITY</span>
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
          {article.videoId ? "Tonton di YouTube" : "Jelajahi sumber asli"}
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
      className="content-card"
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <div className="card-art">
        <button
          className="card-image-button"
          onClick={onOpen}
          aria-label={`Buka ${article.title}`}
        >
          <Artwork kind={article.visual} />
          {article.videoId && (
            <span className="video-play">
              <Play size={18} fill="currentColor" />
            </span>
          )}
          <span className="image-tag">
            {article.videoId ? (
              <>
                <Play size={10} fill="currentColor" />
                {article.meta}
              </>
            ) : (
              article.category
            )}
          </span>
        </button>
        <button
          className={`save-button ${saved ? "is-saved" : ""}`}
          aria-label={`${saved ? "Hapus simpanan" : "Simpan"}: ${article.title}`}
          aria-pressed={saved}
          onClick={onSave}
        >
          <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="card-body">
        <span className="card-label">
          <span />
          {article.label}
        </span>
        <h3>
          <button onClick={onOpen}>{article.title}</button>
        </h3>
        <div className="card-meta">
          <span>{article.author}</span>
          <span className="meta-dot">·</span>
          <span>{article.videoId ? "Video" : article.meta}</span>
        </div>
      </div>
    </article>
  );
}

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
  const searchRef = useRef<HTMLInputElement>(null);
  const featured = [articles[0], articles[1], articles[8]];
  const hero = featured[slide];
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
    try {
      localStorage.setItem("ovylus-theme", theme);
    } catch {
      /* Theme still works for this session. */
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

  function toggleSave(id: string) {
    const exists = saved.includes(id);
    const next = exists ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem("ovylus-saved", JSON.stringify(next));
      setToast(
        exists
          ? "Konten dihapus dari simpanan."
          : "Tersimpan. Temukan lagi di koleksi kamu.",
      );
    } catch {
      setToast(
        "Simpanan aktif untuk sesi ini. Penyimpanan browser tidak tersedia.",
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
    if (item === "Beranda" || item === "Berita AI") {
      setQuery("");
      setTopic("Semua");
      setSavedOnly(false);
    }
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

  return (
    <>
      <a className="skip-link" href="#main">
        Langsung ke konten
      </a>
      <header className="site-header">
        <div className="header-inner">
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
                className={activeNav === item ? "nav-link active" : "nav-link"}
                aria-current={activeNav === item ? "page" : undefined}
                onClick={() => navigate(item)}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Buka pencarian"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <span className="header-divider" />
            <button
              className="icon-button theme-button"
              aria-label={
                theme === "light"
                  ? "Aktifkan tema gelap"
                  : "Aktifkan tema terang"
              }
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
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
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => navigate(item)}
                className={activeNav === item ? "active" : ""}
              >
                {item}
                <ArrowUpRight size={16} />
              </button>
            ))}
            <button onClick={showSaved}>
              Simpanan saya ({saved.length})<Bookmark size={16} />
            </button>
          </nav>
        )}
        {searchOpen && (
          <form
            className="search-panel"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              scrollTo("jelajahi");
            }}
          >
            <Search size={22} />
            <input
              ref={searchRef}
              aria-label="Cari konten AI"
              placeholder="Apa yang ingin kamu jelajahi?"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSavedOnly(false);
              }}
            />
            <button className="button button-dark" type="submit">
              Cari
              <ArrowRight size={17} />
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
      </header>

      <main id="main">
        <section className="intro container" id="beranda">
          <div className="intro-topline">
            <span className="eyebrow">
              <span className="orange-dot" /> YOUR NEXT PERSPECTIVE
            </span>
            <span className="edition">
              EDISI EKSPLORASI <span>—</span> VOL. 01
            </span>
          </div>
          <div className="intro-main">
            <h1>
              Selangkah
              <br />
              <span>di depan.</span>
              <span className="headline-asterisk" aria-hidden="true">
                <KineticStar />
              </span>
            </h1>
            <div className="intro-description">
              <p>
                Dunia AI bergerak cepat.
                <br />
                Temukan ide, wawasan, dan kemungkinan
                <br className="desktop-break" /> baru untuk bergerak bersamanya.
              </p>
              <a href="#jelajahi" className="explore-link">
                Mulai eksplorasi
                <span>
                  <ArrowDownRight size={19} />
                </span>
              </a>
            </div>
            <span className="intro-coordinate" aria-hidden="true">
              EXPLORE / EVOLVE
            </span>
          </div>
        </section>

        <section className="hero container" aria-label="Konten pilihan">
          <div className={`hero-frame hero-${hero.visual}`}>
            <div className="hero-image" key={hero.id}>
              <Artwork kind={hero.visual} priority />
            </div>
            <div className="hero-shade" />
            <div className="hero-top">
              <span className="hero-badge">
                <span />
                PILIHAN EDITOR
              </span>
              <span className="hero-issue">0{slide + 1} / 03</span>
            </div>
            <div className="hero-copy" key={`copy-${hero.id}`}>
              <span className="hero-category">
                {hero.topic}
                <span />
                PERSPEKTIF BARU
              </span>
              <h2>{hero.title}</h2>
              <p>{hero.description}</p>
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
                    size={18}
                    fill={saved.includes(hero.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
            <div className="hero-bottom">
              <span className="hero-credit">
                <span className="small-brand">O.</span>
                {hero.author}
                <i />
                {hero.meta}
              </span>
              <div className="hero-pagination">
                <div
                  className="slide-dots"
                  role="group"
                  aria-label="Pilih artikel utama"
                >
                  {featured.map((article, i) => (
                    <button
                      key={article.id}
                      aria-label={`Artikel utama ${i + 1}`}
                      aria-pressed={slide === i}
                      className={slide === i ? "active" : ""}
                      onClick={() => setSlide(i)}
                    />
                  ))}
                </div>
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
          </div>
        </section>

        <div className="topic-strip container">
          <span>
            <Zap size={15} fill="currentColor" /> DALAM RADAR
          </span>
          <button
            onClick={() => {
              setTopic("Model AI");
              scrollTo("jelajahi");
            }}
          >
            Era AI agent
            <ArrowUpRight size={13} />
          </button>
          <i />
          <button
            onClick={() => {
              setTopic("Tools");
              scrollTo("jelajahi");
            }}
          >
            Tools untuk kreator
            <ArrowUpRight size={13} />
          </button>
          <i />
          <button
            onClick={() => {
              setTopic("Bisnis");
              scrollTo("jelajahi");
            }}
          >
            Kerja lebih cerdas
            <ArrowUpRight size={13} />
          </button>
          <span className="strip-end">THE FUTURE IS A WORK IN PROGRESS.</span>
        </div>

        <section className="discovery section container" id="jelajahi">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-eyebrow">
                01 / TEMUKAN PERSPEKTIF
              </span>
              <h2>
                {savedOnly
                  ? "Ruang simpan kamu."
                  : isFiltered
                    ? "Temukan yang kamu cari."
                    : "Yang baru. Yang berarti."}
              </h2>
            </div>
            <button
              className={`text-button collection-button ${savedOnly ? "is-saved" : ""}`}
              onClick={showSaved}
              aria-pressed={savedOnly}
            >
              <Bookmark size={17} fill={savedOnly ? "currentColor" : "none"} />
              Simpanan<span className="count-badge">{saved.length}</span>
            </button>
          </div>
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
                  onClick={() => setTopic(t)}
                  aria-pressed={topic === t}
                >
                  {t === "Semua" && <Command size={14} />}
                  {t}
                </button>
              ))}
            </div>
            <label className="sort-control">
              <SlidersHorizontal size={15} />
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
              <button
                onClick={() => {
                  setQuery("");
                  setTopic("Semua");
                  setSavedOnly(false);
                }}
              >
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
                  ? "Ide bagus layak disimpan."
                  : "Belum ada yang cocok."}
              </h3>
              <p>
                {savedOnly
                  ? "Tekan ikon bookmark pada konten yang menarik. Koleksi kamu akan muncul di sini."
                  : "Coba kata kunci lain atau jelajahi semua topik."}
              </p>
              <button
                className="button button-dark"
                onClick={() => {
                  setQuery("");
                  setTopic("Semua");
                  setSavedOnly(false);
                }}
              >
                Jelajahi semua konten
                <ArrowRight size={16} />
              </button>
            </div>
          )}
          {!isFiltered && (
            <div className="section-bottom">
              <span className="demo-caption">
                Edisi demo · Konten editorial contoh
              </span>
              <button
                className="text-button"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Tampilkan lebih sedikit" : "Lihat semua berita"}
                {expanded ? (
                  <ChevronLeft size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </div>
          )}
        </section>

        <section className="video-section section container" id="video">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-eyebrow">
                02 / TONTON. PAHAMI. TERINSPIRASI.
              </span>
              <h2>
                Perspektif dalam gerak<span className="orange-text">.</span>
              </h2>
            </div>
            <span className="section-aside">
              <span className="live-dot" />
              KURASI VIDEO AI
            </span>
          </div>
          <div className="video-grid">
            {articles.filter((a) => a.category === "Video AI").map(card)}
          </div>
        </section>

        <section className="automation-section container" id="automation">
          <div className="automation-panel">
            <div className="automation-intro">
              <span className="eyebrow">
                <Zap size={14} />
                03 / WORK SMARTER
              </span>
              <h2>
                Kurangi repetisi.
                <br />
                Perbesar <span>potensi.</span>
              </h2>
              <p>
                Biarkan alur kerja mengurus rutinitas.
                <br />
                Sisakan energi untuk hal yang berarti.
              </p>
              <button
                className="button button-orange"
                onClick={() =>
                  setSelected(articles.find((a) => a.id === "workflow")!)
                }
              >
                Temukan alur pertamamu
                <ArrowUpRight size={17} />
              </button>
              <div className="automation-signature">
                <Workflow size={18} />
                <span>BUILT FOR YOUR NEXT MOVE.</span>
              </div>
            </div>
            <div className="automation-list">
              {articles
                .filter((a) => a.category === "Automation")
                .map((article, i) => (
                  <button
                    className="automation-item"
                    key={article.id}
                    onClick={() => setSelected(article)}
                  >
                    <span className="automation-number">0{i + 1}</span>
                    <span>
                      <small>{article.label}</small>
                      <strong>{article.title}</strong>
                      <span className="automation-meta">
                        {article.meta}
                        <span>↗</span>
                      </span>
                    </span>
                    <span className="automation-item-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </button>
                ))}
            </div>
            <span className="automation-decoration" aria-hidden="true">
              <KineticStar />
            </span>
          </div>
        </section>

        <section className="learn-section section container" id="belajar">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-eyebrow">
                04 / SELALU ADA LANGKAH PERTAMA
              </span>
              <h2>Rasa ingin tahu, jadi bisa.</h2>
            </div>
            <span className="section-aside">BELAJAR DENGAN RITMEMU.</span>
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
                  <div className="learn-card-top">
                    <span className="learn-number">
                      0{i + 1}
                      <span>/</span>
                    </span>
                    <span className="level-badge">{article.label}</span>
                  </div>
                  <div>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                  </div>
                  <div className="learn-card-bottom">
                    <span>
                      <Clock3 size={14} />
                      {article.meta}
                    </span>
                    <span className="learn-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </section>

        <section className="creators-section section container" id="kreator">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-eyebrow">
                05 / IDE HEBAT PUNYA SUARA
              </span>
              <h2>Kenali pemikir di baliknya.</h2>
            </div>
            <span className="section-aside">KREATOR & KOMUNITAS PILIHAN</span>
          </div>
          <div className="creators-grid">
            {creators.map((creator) => (
              <a
                className="creator-card"
                key={creator.name}
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`creator-avatar avatar-${creator.color}`}
                  aria-hidden="true"
                >
                  {creator.initials}
                </div>
                <div className="creator-copy">
                  <span>{creator.mark}</span>
                  <h3>{creator.name}</h3>
                  <p>{creator.role}</p>
                </div>
                <ArrowUpRight className="creator-arrow" size={19} />
                <span className="sr-only"> (buka kanal di tab baru)</span>
              </a>
            ))}
          </div>
        </section>

        <section
          className="trending-section container"
          aria-label="Pilihan populer"
        >
          <div className="trending-heading">
            <span className="eyebrow">
              <span className="orange-dot" />
              ON THE RADAR
            </span>
            <h2>
              Layak kamu
              <br />
              jelajahi.
            </h2>
            <ArrowDownRight size={35} strokeWidth={1.5} />
          </div>
          <div className="trending-list">
            {[articles[0], articles[1], articles[8]].map((a, i) => (
              <button key={a.id} onClick={() => setSelected(a)}>
                <span className="trend-number">0{i + 1}</span>
                <span>
                  <small>
                    {a.category} <span> / </span> {a.topic}
                  </small>
                  <strong>{a.title}</strong>
                </span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <span className="eyebrow">
                <span className="orange-dot" />
                STAY CURIOUS. KEEP MOVING.
              </span>
              <h2>
                Masa depan
                <br />
                dimulai dari <span>rasa ingin tahu.</span>
              </h2>
              <button
                className="footer-explore"
                onClick={() => {
                  setQuery("");
                  setTopic("Semua");
                  setSavedOnly(false);
                  scrollTo("jelajahi");
                }}
              >
                Terus eksplorasi
                <ArrowUpRight size={22} />
              </button>
            </div>
            <div className="footer-links">
              <span>JELAJAHI OVYLUS</span>
              {navItems.slice(1).map((item) => (
                <button key={item} onClick={() => navigate(item)}>
                  {item}
                  <ArrowUpRight size={14} />
                </button>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-wordmark">
              ovylus<span>®</span>
            </span>
            <span>© {new Date().getFullYear()} Ovylus Portal</span>
            <div>
              <button onClick={() => setInfo("Tentang Ovylus")}>Tentang</button>
              <button onClick={() => setInfo("Kebijakan editorial")}>
                Editorial
              </button>
              <button onClick={() => setInfo("Privasi")}>Privasi</button>
              <a href="#beranda" aria-label="Kembali ke atas">
                <ArrowDown className="back-top" size={17} />
              </a>
            </div>
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
                  Homepage ini menyimpan pilihan tema dan daftar konten yang
                  kamu simpan di penyimpanan lokal browser. Data tersebut tetap
                  berada di perangkatmu; tidak ada akun, analitik, atau formulir
                  pengumpulan data pada versi ini.
                </p>
                <p>
                  Video dari YouTube baru dimuat setelah kamu menekan tombol
                  putar. Tautan eksternal dan pemutar video mengikuti kebijakan
                  privasi penyedia masing-masing.
                </p>
                <button
                  className="button button-dark"
                  onClick={() => {
                    try {
                      localStorage.removeItem("ovylus-saved");
                      localStorage.removeItem("ovylus-theme");
                    } catch {
                      /* Current state can still be cleared. */
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
                  Ovylus mengutamakan informasi yang jelas, sumber yang dapat
                  ditelusuri, dan rasa ingin tahu yang bertanggung jawab.
                </p>
                <p>
                  Versi homepage ini adalah demonstrasi desain. Artikel dan
                  ringkasan merupakan konten contoh, bukan berita terkini. Video
                  tertaut berasal dari kreator aslinya. Gambar robot dan bentuk
                  krom dibuat dengan AI untuk kebutuhan visual.
                </p>
                <p>
                  Saat portal diterbitkan sebagai media, setiap artikel perlu
                  melalui verifikasi fakta, pencantuman tanggal, dan peninjauan
                  editorial. Konten berbayar harus diberi label Sponsored atau
                  Promoted.
                </p>
              </>
            ) : (
              <>
                <p>
                  Ovylus Portal adalah ruang eksplorasi AI berbahasa Indonesia.
                  Tempat menemukan perspektif, memahami teknologi, dan mengubah
                  rasa ingin tahu menjadi langkah nyata.
                </p>
                <p>
                  Jelajahi berita, video pilihan, ide automation, panduan
                  belajar, serta kreator dan komunitas AI. Selangkah di depan,
                  bersama.
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
