/* ================================================================
   HNK SOFTWARE — app.jsx (React + JSX, transpilado pelo Babel no navegador)
   Landing page. Sem painel de editor (produção). Tema/cor fixos.
   ================================================================ */

/* ============ SHARED DATA + UI HELPERS ============ */

// ---- Reveal on scroll (state-driven so re-renders don't drop it) ----
function Reveal({ children, delay = 0, as = "div", style, className = "", ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => { if (done) return; done = true; setShown(true); cleanup(); };
    const check = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.92 && r.bottom > 0) reveal();
    };
    let io = null;
    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      if (io) io.disconnect();
    };
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) reveal(); });
      }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
      io.observe(el);
    } catch (e) { io = null; }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    requestAnimationFrame(check);
    const t1 = setTimeout(check, 140);
    const t2 = setTimeout(check, 450);
    const t3 = setTimeout(reveal, 1600); // hard safety: never stay hidden
    return () => { cleanup(); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [shown]);
  const Tag = as;
  return (
    <Tag ref={ref} className={"reveal " + (shown ? "in " : "") + className} style={{ transitionDelay: delay + "ms", ...style }} {...rest}>
      {children}
    </Tag>
  );
}

// ---- HNK monogram logo (geometric, not illustrative) ----
function Logo({ size = 30 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="7" stroke="var(--accent)" strokeWidth="1.4" />
        <rect x="8" y="8" width="3.2" height="16" rx="1" fill="var(--accent)" />
        <rect x="20.8" y="8" width="3.2" height="16" rx="1" fill="var(--accent)" />
        <rect x="11.2" y="14.4" width="9.6" height="3.2" rx="1" fill="currentColor" />
      </svg>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18.5, letterSpacing: "-0.02em" }}>
        HNK<span style={{ color: "var(--fg-2)", fontWeight: 500 }}> SOFTWARE</span>
      </span>
    </span>
  );
}

// ---- Section heading ----
function SectionHead({ eyebrow, title, intro, align = "left", max = 620 }) {
  return (
    <div style={{ textAlign: align, maxWidth: max, margin: align === "center" ? "0 auto" : undefined }}>
      <Reveal as="div" className="eyebrow" style={{ marginBottom: 18 }}>{eyebrow}</Reveal>
      <Reveal delay={60}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.06 }}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={120}>
          <p style={{ marginTop: 18, fontSize: 18.5, color: "var(--fg-2)", maxWidth: 560, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

// ---- Minimal line icons (stroke = currentColor) ----
const Icon = {
  rocket: <path d="M14 4c3 0 6 3 6 6 0 4-4 7-6 9-2-2-6-5-6-9 0-3 3-6 6-6Zm0 5.2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM9.5 17.5C7 18 6 21 6 21s3-1 3.5-3.5M14 19v3" />,
  flow: <g><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="12" cy="18" r="2.4" /><path d="M8 7.5l3 8.5M16 7.5l-3 8.5M8.4 6h7.2" /></g>,
  plug: <g><path d="M9 3v5M15 3v5" /><path d="M6 8h12v3a6 6 0 0 1-12 0V8Z" /><path d="M12 17v4" /></g>,
  window: <g><rect x="3" y="5" width="18" height="14" rx="2.4" /><path d="M3 9h18" /><circle cx="6.2" cy="7" r="0.5" fill="currentColor" /><circle cx="8.2" cy="7" r="0.5" fill="currentColor" /></g>,
  bot: <g><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16h5" /><circle cx="12" cy="4" r="1" /></g>,
  search: <g><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></g>,
  pen: <path d="M5 19l1-4L16 5l3 3L9 18l-4 1Zm9-12 3 3" />,
  build: <g><path d="M14.5 6.5a3.5 3.5 0 0 0-4.8 4.3l-5 5a1.6 1.6 0 0 0 2.3 2.3l5-5a3.5 3.5 0 0 0 4.3-4.8l-2.1 2.1-1.8-.3-.3-1.8 2.4-2.1Z" /></g>,
  chart: <g><path d="M5 19V5M5 19h14" /><path d="M9 16l3-4 3 2 3-5" /></g>,
  arrow: <path d="M5 12h13M12 5l7 7-7 7" />,
  check: <path d="M5 12.5l4 4 10-10" />,
  calendar: <g><rect x="4" y="5" width="16" height="16" rx="2.5" /><path d="M4 9h16M8 3v4M16 3v4" /></g>,
  clock: <g><circle cx="12" cy="12" r="8" /><path d="M12 8v4.5l3 1.8" /></g>,
  spark: <path d="M12 3l1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3Z" />,
};
function Ic({ name, size = 22, sw = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {Icon[name]}
    </svg>
  );
}

// ---- Content ----
const NAV = [
  { id: "servicos", label: "Serviços" },
  { id: "processo", label: "Como funciona" },
  { id: "cases", label: "Cases" },
  { id: "sobre", label: "Sobre" },
];

const SERVICES = [
  { icon: "rocket", title: "Landing pages de alta conversão", desc: "Páginas rápidas, persuasivas e mensuráveis — construídas para transformar tráfego em reuniões e vendas.", tags: ["Copy + design", "A/B testing", "Core Web Vitals"] },
  { icon: "flow", title: "Automação de processos", desc: "Eliminamos tarefas manuais e repetitivas conectando suas ferramentas em fluxos confiáveis.", tags: ["Workflows", "Webhooks", "Agendamentos"] },
  { icon: "plug", title: "Integrações & APIs", desc: "Seus sistemas conversando entre si: CRM, pagamentos, planilhas, ERPs e o que mais precisar.", tags: ["REST", "CRMs", "Pagamentos"] },
  { icon: "window", title: "Sites institucionais", desc: "Presença digital sólida e profissional, fácil de manter e otimizada para ser encontrada.", tags: ["SEO", "CMS", "Performance"] },
  { icon: "bot", title: "Bots & fluxos", desc: "Atendimento e qualificação automáticos no WhatsApp e e-mail, 24 horas por dia.", tags: ["WhatsApp", "E-mail", "Qualificação"] },
];

const PROCESS = [
  { n: "01", icon: "search", title: "Diagnóstico", desc: "Entendo seu negócio, gargalos e metas numa conversa direta. Saio com o escopo e o resultado esperado claros." },
  { n: "02", icon: "pen", title: "Proposta", desc: "Você recebe um plano objetivo: o que será feito, prazos, investimento e como mediremos o sucesso." },
  { n: "03", icon: "build", title: "Construção", desc: "Desenvolvo com entregas frequentes e visíveis. Sem caixa-preta — você acompanha cada passo." },
  { n: "04", icon: "chart", title: "Entrega & otimização", desc: "Lançamos, medimos e ajustamos. O foco é resultado contínuo, não só ir ao ar." },
];

const CASES = [
  { tag: "Landing page", title: "Captação para clínica local", metric: "+38%", metricLabel: "em agendamentos", desc: "Página de captação com formulário inteligente e integração ao WhatsApp." },
  { tag: "Automação", title: "Onboarding sem trabalho manual", metric: "-12h", metricLabel: "por semana", desc: "Fluxo que cadastra, notifica e organiza novos clientes automaticamente." },
  { tag: "Integração", title: "CRM + pagamentos + planilhas", metric: "100%", metricLabel: "sincronizado", desc: "Dados unificados em tempo real entre as ferramentas do time comercial." },
  { tag: "Bot", title: "Qualificação no WhatsApp", metric: "24/7", metricLabel: "atendimento", desc: "Bot que filtra e encaminha apenas leads prontos para falar com vendas." },
];

const STATS = [
  { v: "100%", l: "feito sob medida" },
  { v: "<1.5s", l: "carregamento das páginas" },
  { v: "5+", l: "frentes de solução" },
];

/* ============ SCHEDULE MEETING MODAL ============ */
const inp = {
  width: "100%", padding: "13px 15px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)",
  background: "var(--bg-2)", color: "var(--fg)", fontSize: 15.5, fontFamily: "var(--font-body)", outline: "none", transition: "border-color .15s",
};

function ScheduleModal({ open, onClose }) {
  const [step, setStep] = React.useState(0); // 0 date, 1 time, 2 form, 3 done
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [form, setForm] = React.useState({ nome: "", email: "", whats: "", msg: "" });

  React.useEffect(() => {
    if (open) { setStep(0); setDate(null); setTime(null); setForm({ nome: "", email: "", whats: "", msg: "" }); }
  }, [open]);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // build next ~18 weekdays
  const days = [];
  const cur = new Date(2026, 5, 8); // Mon Jun 8 2026
  while (days.length < 18) {
    const d = new Date(cur);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) days.push(d);
    cur.setDate(cur.getDate() + 1);
  }
  const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const MON = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const canForm = form.nome.trim() && /\S+@\S+\.\S+/.test(form.email);
  const stepLabels = ["Data", "Horário", "Seus dados", "Pronto"];

  const overlay = {
    position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
    padding: 20, background: "color-mix(in oklab, #000 55%, transparent)", backdropFilter: "blur(6px)",
  };
  const panel = {
    width: "min(560px, 100%)", background: "var(--card)", color: "var(--fg)",
    borderRadius: "calc(var(--radius) + 4px)", border: "1px solid var(--line)",
    boxShadow: "0 30px 80px -20px hsl(var(--shadow-color)/0.5)", overflow: "hidden",
    animation: "popIn .32s cubic-bezier(.2,.8,.2,1)",
  };
  const pill = (active, done) => ({
    fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: ".04em",
    display: "flex", alignItems: "center", gap: 7, color: active ? "var(--accent)" : done ? "var(--fg)" : "var(--fg-2)",
    opacity: active || done ? 1 : 0.5,
  });
  const dot = (active, done) => ({
    width: 20, height: 20, borderRadius: 99, display: "grid", placeItems: "center", fontSize: 10.5,
    border: "1px solid " + (active || done ? "var(--accent)" : "var(--line)"),
    background: done ? "var(--accent)" : active ? "color-mix(in oklab,var(--accent) 14%,transparent)" : "transparent",
    color: done ? "var(--on-accent)" : "inherit",
  });

  return (
    <div style={overlay} onClick={onClose}>
      <style>{`@keyframes popIn{from{transform:translateY(16px)}to{transform:none}}`}</style>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600 }}>
            <span style={{ color: "var(--accent)", display: "inline-flex" }}><Ic name="calendar" size={20} /></span>
            Agendar reunião
          </div>
          <button onClick={onClose} aria-label="Fechar" style={{ background: "transparent", border: "none", color: "var(--fg-2)", fontSize: 22, lineHeight: 1, padding: 4 }}>×</button>
        </div>

        {/* steps */}
        {step < 3 && (
          <div style={{ display: "flex", gap: 18, padding: "14px 24px", borderBottom: "1px solid var(--line-2)", flexWrap: "wrap" }}>
            {stepLabels.slice(0, 3).map((l, i) => (
              <div key={l} style={pill(step === i, step > i)}>
                <span style={dot(step === i, step > i)}>{step > i ? "✓" : i + 1}</span>{l}
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: 24 }}>
          {/* STEP 0 — date */}
          {step === 0 && (
            <div>
              <p style={{ color: "var(--fg-2)", fontSize: 15, marginBottom: 16 }}>Escolha um dia. Reuniões de 30 min, online.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(78px,1fr))", gap: 8 }}>
                {days.map((d, i) => {
                  const sel = date && d.getTime() === date.getTime();
                  return (
                    <button key={i} onClick={() => { setDate(d); setStep(1); }}
                      style={{ padding: "11px 6px", borderRadius: "var(--radius-sm)", textAlign: "center", lineHeight: 1.25,
                        border: "1px solid " + (sel ? "var(--accent)" : "var(--line)"), background: sel ? "color-mix(in oklab,var(--accent) 12%,transparent)" : "var(--bg-2)", color: "var(--fg)", transition: "all .15s" }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = sel ? "var(--accent)" : "var(--line)"}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg-2)", textTransform: "uppercase" }}>{DOW[d.getDay()]}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700 }}>{d.getDate()}</div>
                      <div style={{ fontSize: 10.5, color: "var(--fg-2)" }}>{MON[d.getMonth()]}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 1 — time */}
          {step === 1 && (
            <div>
              <p style={{ color: "var(--fg-2)", fontSize: 15, marginBottom: 16 }}>
                {DOW[date.getDay()]}, {date.getDate()} de {MON[date.getMonth()]} — escolha o horário <span style={{ opacity: .7 }}>(GMT-3)</span>
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 8 }}>
                {TIMES.map((t) => {
                  const sel = time === t;
                  return (
                    <button key={t} onClick={() => { setTime(t); setStep(2); }}
                      style={{ padding: "13px 6px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)", fontSize: 15,
                        border: "1px solid " + (sel ? "var(--accent)" : "var(--line)"), background: sel ? "color-mix(in oklab,var(--accent) 12%,transparent)" : "var(--bg-2)", color: "var(--fg)", transition: "all .15s" }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = sel ? "var(--accent)" : "var(--line)"}>
                      {t}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setStep(0)} style={{ marginTop: 18, background: "transparent", border: "none", color: "var(--fg-2)", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>← Voltar para datas</button>
            </div>
          )}

          {/* STEP 2 — form */}
          {step === 2 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: "var(--fg-2)", marginBottom: 18, background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "10px 14px" }}>
                <span style={{ color: "var(--accent)", display: "inline-flex" }}><Ic name="clock" size={17} /></span>
                {DOW[date.getDay()]}, {date.getDate()}/{MON[date.getMonth()]} às <strong style={{ color: "var(--fg)" }}>{time}</strong>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { k: "nome", ph: "Seu nome", type: "text" },
                  { k: "email", ph: "E-mail", type: "email" },
                  { k: "whats", ph: "WhatsApp (opcional)", type: "tel" },
                ].map((f) => (
                  <input key={f.k} type={f.type} placeholder={f.ph} value={form[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    style={inp} onFocus={(e) => e.target.style.borderColor = "var(--accent)"} onBlur={(e) => e.target.style.borderColor = "var(--line)"} />
                ))}
                <textarea placeholder="Conte rapidamente o que você precisa (opcional)" rows={3} value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  style={{ ...inp, resize: "vertical", fontFamily: "var(--font-body)" }} onFocus={(e) => e.target.style.borderColor = "var(--accent)"} onBlur={(e) => e.target.style.borderColor = "var(--line)"} />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ flex: "0 0 auto" }}>Voltar</button>
                <button onClick={() => canForm && setStep(3)} className="btn btn-primary" disabled={!canForm}
                  style={{ flex: 1, opacity: canForm ? 1 : 0.5, cursor: canForm ? "pointer" : "not-allowed" }}>
                  Confirmar reunião
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — done */}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "12px 4px 8px" }}>
              <div style={{ width: 58, height: 58, margin: "0 auto 18px", borderRadius: 99, display: "grid", placeItems: "center", background: "color-mix(in oklab,var(--accent) 16%,transparent)", color: "var(--accent)" }}>
                <Ic name="check" size={28} sw={2} />
              </div>
              <h3 style={{ fontSize: 24, marginBottom: 10 }}>Reunião solicitada!</h3>
              <p style={{ color: "var(--fg-2)", fontSize: 15.5, maxWidth: 360, margin: "0 auto 6px" }}>
                Obrigado, <strong style={{ color: "var(--fg)" }}>{form.nome.split(" ")[0]}</strong>. Vou confirmar em{" "}
                <strong style={{ color: "var(--fg)" }}>{DOW[date.getDay()]}, {date.getDate()}/{MON[date.getMonth()]} às {time}</strong> pelo seu e-mail.
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-2)", marginTop: 10 }}>{form.email}</p>
              <button onClick={onClose} className="btn btn-primary" style={{ marginTop: 22 }}>Fechar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ SECTIONS: Nav, Hero, Services, Process ============ */

function Nav({ onSchedule }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "color-mix(in oklab, var(--bg) 82%, transparent)" : "transparent",
      backdropFilter: scrolled ? "blur(14px) saturate(1.4)" : "none",
      borderBottom: "1px solid " + (scrolled ? "var(--line)" : "transparent"),
      transition: "background .3s, border-color .3s",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 74 }}>
        <a href="#top"><Logo /></a>
        <nav style={{ display: "flex", alignItems: "center", gap: 30 }} className="nav-links">
          {NAV.map((n) => (
            <a key={n.id} href={"#" + n.id} style={{ fontSize: 15.5, color: "var(--fg-2)", transition: "color .2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-2)"}>{n.label}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn btn-primary nav-cta" onClick={onSchedule} style={{ padding: "11px 20px", fontSize: 15 }}>
            Agendar reunião
          </button>
          <button className="nav-burger" aria-label="Menu" onClick={() => setOpenMenu(!openMenu)}
            style={{ display: "none", background: "transparent", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "9px 11px", color: "var(--fg)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
      {openMenu && (
        <div className="mobile-menu" style={{ borderTop: "1px solid var(--line)", padding: "8px 0 14px", background: "var(--bg)" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map((n) => (
              <a key={n.id} href={"#" + n.id} onClick={() => setOpenMenu(false)} style={{ padding: "11px 0", fontSize: 16, borderBottom: "1px solid var(--line-2)" }}>{n.label}</a>
            ))}
          </div>
        </div>
      )}
      <style>{`
        @media(max-width:860px){
          .nav-links{display:none!important;}
          .nav-burger{display:inline-flex!important;}
        }
        @media(min-width:861px){ .mobile-menu{display:none;} }
        @media(max-width:480px){ .nav-cta{display:none!important;} }
      `}</style>
    </header>
  );
}

function Hero({ onSchedule }) {
  return (
    <section id="top" style={{ padding: "clamp(56px,9vw,96px) 0 clamp(64px,7vw,92px)", position: "relative", overflow: "hidden" }}>
      <div className="hero-grid" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(120% 90% at 78% 0%, color-mix(in oklab,var(--accent) 9%, transparent) 0%, transparent 55%)" }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="hero-grid-cols" style={{ display: "grid", gridTemplateColumns: "1.08fr 0.92fr", gap: 56, alignItems: "center" }}>
          <div>
            <Reveal className="eyebrow" style={{ marginBottom: 22 }}>Software sob medida</Reveal>
            <Reveal delay={70}>
              <h1 style={{ fontSize: "clamp(36px, 5.6vw, 64px)", lineHeight: 1.02 }}>
                Sites que vendem e processos que rodam <span style={{ color: "var(--accent)" }}>sozinhos</span>.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ marginTop: 24, fontSize: "clamp(17px,2.2vw,20px)", color: "var(--fg-2)", maxWidth: 520 }}>
                A HNK SOFTWARE constrói landing pages de alta conversão e automações que tiram o trabalho manual do seu caminho — para você focar no que cresce o negócio.
              </p>
            </Reveal>
            <Reveal delay={210} style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={onSchedule}>
                Agendar uma conversa <span className="btn-arrow"><Ic name="arrow" size={18} /></span>
              </button>
              <a href="#servicos" className="btn btn-ghost">Ver serviços</a>
            </Reveal>
            <Reveal delay={280} style={{ display: "flex", gap: 30, marginTop: 44, flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <div key={s.l}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26 }}>{s.v}</div>
                  <div style={{ fontSize: 13.5, color: "var(--fg-2)" }}>{s.l}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={180} className="hero-visual">
            <div className="shadow-lg" style={{ borderRadius: "calc(var(--radius) + 4px)", border: "1px solid var(--line)", background: "var(--card)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "13px 16px", borderBottom: "1px solid var(--line)" }}>
                <span style={{ width: 11, height: 11, borderRadius: 99, background: "color-mix(in oklab,var(--fg) 18%,transparent)" }} />
                <span style={{ width: 11, height: 11, borderRadius: 99, background: "color-mix(in oklab,var(--fg) 18%,transparent)" }} />
                <span style={{ width: 11, height: 11, borderRadius: 99, background: "color-mix(in oklab,var(--fg) 18%,transparent)" }} />
                <span style={{ marginLeft: 10, fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--fg-2)", background: "var(--bg-2)", padding: "4px 12px", borderRadius: 99, border: "1px solid var(--line)" }}>seudominio.com.br</span>
              </div>
              <div style={{ padding: 18 }}>
                <div className="ph" style={{ height: 132, marginBottom: 12 }}><span>preview da landing</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "13px 15px", background: "var(--bg-2)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--accent)", fontSize: 12.5, fontFamily: "var(--font-mono)" }}><Ic name="chart" size={15} /> conversão</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, marginTop: 4 }}>+38%</div>
                  </div>
                  <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "13px 15px", background: "var(--bg-2)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--accent)", fontSize: 12.5, fontFamily: "var(--font-mono)" }}><Ic name="flow" size={15} /> automação</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, marginTop: 4 }}>ativa</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="float-chip shadow-sm" style={{ position: "absolute", right: -10, bottom: -14, background: "var(--card)", border: "1px solid var(--line)", borderRadius: 99, padding: "9px 15px", display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "oklch(0.7 0.17 150)", boxShadow: "0 0 0 4px color-mix(in oklab, oklch(0.7 0.17 150) 25%, transparent)" }} />
              Lead novo capturado
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        .hero-visual{position:relative;}
        @media(max-width:900px){
          .hero-grid-cols{grid-template-columns:1fr!important;gap:44px!important;}
          .hero-visual{max-width:480px;}
        }
      `}</style>
    </section>
  );
}

function Services({ onSchedule }) {
  return (
    <section id="servicos" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <SectionHead eyebrow="O que eu faço" title="Soluções para captar, converter e automatizar"
          intro="Cinco frentes que funcionam isoladas ou combinadas — desenhadas em torno do resultado que você precisa." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 50 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="svc-card" style={{ height: "100%", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: 28, transition: "transform .25s, border-color .25s, box-shadow .25s" }}>
                <div style={{ width: 48, height: 48, borderRadius: "var(--radius-sm)", display: "grid", placeItems: "center", color: "var(--accent)", background: "color-mix(in oklab,var(--accent) 12%,transparent)", marginBottom: 20 }}>
                  <Ic name={s.icon} size={24} />
                </div>
                <h3 style={{ fontSize: 20.5, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "var(--fg-2)", fontSize: 15.5, marginBottom: 18 }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--fg-2)", border: "1px solid var(--line)", borderRadius: 99, padding: "4px 10px", whiteSpace: "nowrap" }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={SERVICES.length * 70}>
            <div style={{ height: "100%", minHeight: 220, borderRadius: "var(--radius)", padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--accent)", color: "var(--on-accent)" }}>
              <div>
                <div style={{ display: "inline-flex", marginBottom: 18, opacity: .9 }}><Ic name="spark" size={26} /></div>
                <h3 style={{ fontSize: 22, color: "var(--on-accent)" }}>Não sabe por onde começar?</h3>
                <p style={{ fontSize: 15.5, marginTop: 10, opacity: .92 }}>Conversamos 30 minutos e eu aponto o caminho mais rápido para um resultado.</p>
              </div>
              <button onClick={onSchedule} className="btn" style={{ background: "var(--on-accent)", color: "var(--accent)", marginTop: 22, alignSelf: "flex-start" }}>
                Agendar reunião <span className="btn-arrow"><Ic name="arrow" size={17} /></span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`.svc-card:hover{transform:translateY(-4px);border-color:color-mix(in oklab,var(--accent) 45%,var(--line));box-shadow:0 18px 40px -18px hsl(var(--shadow-color)/calc(var(--shadow-strength)*2));}`}</style>
    </section>
  );
}

function Process() {
  return (
    <section id="processo">
      <div className="wrap">
        <SectionHead eyebrow="Como funciona" title="Do diagnóstico ao resultado, sem caixa-preta"
          intro="Um processo simples e transparente. Você sempre sabe onde estamos e para onde vamos." />
        <div className="proc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 50 }}>
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <div style={{ position: "relative", height: "100%" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)", marginBottom: 16 }}>{p.n}</div>
                <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", display: "grid", placeItems: "center", color: "var(--fg)", border: "1px solid var(--line)", marginBottom: 18, background: "var(--card)" }}>
                  <Ic name={p.icon} size={22} />
                </div>
                <h3 style={{ fontSize: 18.5, marginBottom: 9 }}>{p.title}</h3>
                <p style={{ color: "var(--fg-2)", fontSize: 14.5 }}>{p.desc}</p>
                {i < PROCESS.length - 1 && (
                  <div className="proc-line" style={{ position: "absolute", top: 7, right: -8, color: "var(--line)", opacity: .9 }}>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7h13M9 2l5 5-5 5" /></svg>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:840px){.proc-grid{grid-template-columns:1fr 1fr!important;gap:32px 20px!important;}.proc-line{display:none;}}@media(max-width:460px){.proc-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

function Cases() {
  return (
    <section id="cases" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <SectionHead eyebrow="Portfólio" title="Resultados que falam por si"
            intro="Uma amostra do tipo de problema que resolvo. Casos reais entram aqui assim que você liberar." />
          <Reveal delay={120}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--fg-2)", border: "1px dashed var(--line)", borderRadius: 99, padding: "7px 14px" }}>
              espaço reservado p/ seus cases
            </span>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 50 }}>
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="case-card" style={{ height: "100%", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden", transition: "transform .25s, box-shadow .25s" }}>
                <div className="ph" style={{ height: 158, borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}>
                  <span>case shot</span>
                </div>
                <div style={{ padding: 22 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".08em" }}>{c.tag}</span>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>{c.metric}</span>
                      <span style={{ fontSize: 11.5, color: "var(--fg-2)", display: "block", lineHeight: 1 }}>{c.metricLabel}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 18.5, marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ color: "var(--fg-2)", fontSize: 14.5 }}>{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`.case-card:hover{transform:translateY(-4px);box-shadow:0 20px 44px -20px hsl(var(--shadow-color)/calc(var(--shadow-strength)*2));}`}</style>
    </section>
  );
}

function About({ onSchedule }) {
  const points = [
    "Atendimento direto comigo — sem camadas, sem ruído.",
    "Entregas frequentes e visíveis, do início ao fim.",
    "Foco obsessivo em resultado mensurável, não em entregar e sumir.",
  ];
  return (
    <section id="sobre">
      <div className="wrap">
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "center" }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <div className="ph" style={{ aspectRatio: "4/5", borderRadius: "var(--radius)" }}><span>foto / retrato</span></div>
              <div className="shadow-sm" style={{ position: "absolute", left: -14, bottom: -14, background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "12px 16px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-2)" }}>HNK SOFTWARE</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>desde o primeiro commit</div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal className="eyebrow" style={{ marginBottom: 18 }}>Quem está por trás</Reveal>
            <Reveal delay={70}>
              <h2 style={{ fontSize: "clamp(26px,3.6vw,40px)" }}>Tecnologia que resolve problema de verdade</h2>
            </Reveal>
            <Reveal delay={130}>
              <p style={{ marginTop: 18, fontSize: 17.5, color: "var(--fg-2)", maxWidth: 540 }}>
                A HNK SOFTWARE nasceu de uma ideia simples: pequenas empresas e criadores merecem software de gente grande, sem complicação e sem promessas vazias. Eu desenho, construo e entrego — e fico junto para garantir que funcione.
              </p>
            </Reveal>
            <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
              {points.map((p, i) => (
                <Reveal key={i} delay={180 + i * 70} style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
                  <span style={{ flex: "0 0 auto", marginTop: 2, width: 24, height: 24, borderRadius: 99, display: "grid", placeItems: "center", background: "color-mix(in oklab,var(--accent) 14%,transparent)", color: "var(--accent)" }}>
                    <Ic name="check" size={15} sw={2} />
                  </span>
                  <span style={{ fontSize: 16, color: "var(--fg)" }}>{p}</span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={420}>
              <button onClick={onSchedule} className="btn btn-ghost" style={{ marginTop: 30 }}>
                Vamos conversar <span className="btn-arrow"><Ic name="arrow" size={17} /></span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:840px){.about-grid{grid-template-columns:1fr!important;gap:60px!important;}.about-grid .ph{max-width:360px;}}`}</style>
    </section>
  );
}

function FinalCTA({ onSchedule }) {
  return (
    <section id="contato" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: "calc(var(--radius) + 6px)", padding: "clamp(40px,6vw,72px)", background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 120% at 50% -20%, color-mix(in oklab,var(--accent) 50%, transparent) 0%, transparent 60%)", opacity: .9 }} />
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ justifyContent: "center", color: "color-mix(in oklab,var(--accent) 70%, var(--bg))" }}>Próximo passo</div>
              <h2 style={{ fontSize: "clamp(30px,5vw,52px)", marginTop: 18, color: "var(--bg)" }}>
                Pronto para tirar a ideia do papel?
              </h2>
              <p style={{ marginTop: 18, fontSize: 18.5, color: "color-mix(in oklab,var(--bg) 70%, var(--fg))", maxWidth: 520, marginInline: "auto" }}>
                Agende 30 minutos. Saímos da conversa com um caminho claro — sem compromisso e sem juridiquês.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 34 }}>
                <button onClick={onSchedule} className="btn btn-primary" style={{ fontSize: 17, padding: "16px 28px" }}>
                  <Ic name="calendar" size={18} /> Agendar reunião
                </button>
                <a href="mailto:contato@hnksoftware.com.br" className="btn" style={{ fontSize: 17, padding: "16px 24px", background: "transparent", border: "1px solid color-mix(in oklab,var(--bg) 35%, transparent)", color: "var(--bg)" }}>
                  contato@hnksoftware.com.br
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "44px 0" }}>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <Logo />
        <div style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
          {NAV.map((n) => (
            <a key={n.id} href={"#" + n.id} style={{ fontSize: 14.5, color: "var(--fg-2)" }}>{n.label}</a>
          ))}
          <a href="privacidade.html" style={{ fontSize: 14.5, color: "var(--fg-2)" }}>Privacidade</a>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--fg-2)" }}>
          © 2026 HNK SOFTWARE
        </div>
      </div>
    </footer>
  );
}

/* ============ APP ROOT ============ */
function App() {
  const [modal, setModal] = React.useState(false);
  const openModal = React.useCallback(() => setModal(true), []);

  // tema/direção/cor fixos (sem painel de tweaks em produção)
  React.useEffect(() => {
    document.body.dataset.theme = "light";
    document.body.dataset.dir = "clarity";
    const root = document.documentElement;
    root.style.setProperty("--accent", "#2f6bd6");
    root.style.setProperty("--accent-2", "color-mix(in oklab, #2f6bd6 78%, white)");
    root.style.setProperty("--on-accent", "#ffffff");
  }, []);

  return (
    <React.Fragment>
      <Nav onSchedule={openModal} />
      <main>
        <Hero onSchedule={openModal} />
        <Services onSchedule={openModal} />
        <Process />
        <Cases />
        <About onSchedule={openModal} />
        <FinalCTA onSchedule={openModal} />
      </main>
      <Footer />
      <ScheduleModal open={modal} onClose={() => setModal(false)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
