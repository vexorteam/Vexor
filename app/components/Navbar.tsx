'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DiamondMark } from './Logo';
import { useApp } from '../lib/context';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, lang, tr, toggleTheme, toggleLang } = useApp();
  const isDark = theme === 'dark';
  const n = tr.nav;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    // Lock body scroll when menu open
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const links = [
    { href: '/#services', label: n.services },
    { href: '/#work', label: n.work },
    { href: '/#about', label: n.team },
    { href: '/#faq', label: n.faq },
  ];

  const navBg = scrolled
    ? isDark
      ? 'rgba(10,10,10,0.88)'
      : 'rgba(255,255,255,0.92)'
    : 'transparent';

  const iconBtn: React.CSSProperties = {
    width: 34,
    height: 34,
    borderRadius: 8,
    border: '1px solid var(--border-c)',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    transition: 'all 0.2s',
    color: 'var(--text-secondary)',
    flexShrink: 0,
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 60,
          borderBottom: scrolled ? '1px solid var(--border-c)' : '1px solid transparent',
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '100%',
            padding: '0 clamp(12px, 3vw, 32px)',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DiamondMark size={20} />
            <span
              className="no-select"
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: -0.5,
                color: 'var(--text-primary)',
              }}
            >
              vexor
            </span>
          </Link>

          {/* Center links — desktop only */}
          <div
            className="nav-links-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 14,
                  color: 'var(--text-muted)',
                  padding: '6px 14px',
                  borderRadius: 7,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(0,0,0,0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}
          >
            {/* Theme + Lang — desktop */}
            <div
              className="nav-controls-desktop"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <button
                onClick={toggleTheme}
                style={iconBtn}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--text-muted)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-c)')}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button
                onClick={toggleLang}
                style={{
                  ...iconBtn,
                  width: 42,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'Geist Mono, monospace',
                  letterSpacing: 0.5,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--text-muted)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-c)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {lang === 'uk' ? 'EN' : 'UA'}
              </button>
            </div>

            {/* CTA — desktop */}
            <a
              href="/#contact"
              className="nav-cta-desktop"
              style={{
                marginLeft: 8,
                fontSize: 13,
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: 8,
                background: isDark ? 'white' : '#0a0a0a',
                color: isDark ? '#0a0a0a' : 'white',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {n.cta}
            </a>

            {/* Burger — mobile */}
            <button
              className="nav-burger"
              onClick={() => setMenuOpen(p => !p)}
              style={{ ...iconBtn, display: 'none' }}
              aria-label="Toggle menu"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                {menuOpen ? (
                  <>
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-height mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: isDark ? 'rgba(10,10,10,0.98)' : 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 20px 40px',
            overflowY: 'auto',
          }}
        >
          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 'clamp(16px,5vw,22px)',
                  color: 'var(--text-secondary)',
                  padding: 'clamp(10px,2vw,14px) 12px',
                  borderRadius: 10,
                  transition: 'all 0.15s',
                  borderBottom: '1px solid var(--border-c)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = isDark
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(0,0,0,0.03)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Controls row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <button
              onClick={toggleTheme}
              style={{
                ...iconBtn,
                flex: 1,
                width: 'auto',
                height: 44,
                borderRadius: 10,
                gap: 8,
                fontSize: 13,
              }}
            >
              {isDark ? '☀️' : '🌙'}
              <span className="burger-btn-text">{isDark ? 'Light' : 'Dark'}</span>
            </button>
            <button
              onClick={toggleLang}
              style={{
                ...iconBtn,
                flex: 1,
                width: 'auto',
                height: 44,
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'Geist Mono, monospace',
                gap: 6,
              }}
            >
              {lang === 'uk' ? '🇬🇧' : '🇺🇦'}
              <span className="burger-btn-text">{lang === 'uk' ? 'EN' : 'UA'}</span>
            </button>
          </div>

          {/* CTA */}
          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              fontSize: 15,
              fontWeight: 600,
              padding: '14px',
              borderRadius: 12,
              background: isDark ? 'white' : '#0a0a0a',
              color: isDark ? '#0a0a0a' : 'white',
            }}
          >
            {n.cta}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 1000px) {
          .nav-links-desktop { display: none !important; }
          .nav-controls-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        @media (max-width: 280px) {
          .burger-btn-text { display: none; }
        }
      `}</style>
    </>
  );
}
