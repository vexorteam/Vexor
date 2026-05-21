'use client';
import { DiamondMark } from './Logo';
import { socialLinks } from '../data/site';
import { useApp } from '../lib/context';

const EXT = { target: '_blank' as const, rel: 'noopener noreferrer nofollow' };

export function Footer() {
  const { tr, toggleTheme, toggleLang, lang, theme } = useApp();
  const f = tr.footer;
  const isDark = theme === 'dark';

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-c)',
        padding: '28px 48px',
        maxWidth: 1196,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <DiamondMark size={16} />
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>© 2026 Vexor. {f.rights}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <a
            href={socialLinks.github}
            {...EXT}
            style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {f.github}
          </a>
          <a
            href={socialLinks.telegram}
            {...EXT}
            style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {f.telegram}
          </a>
          <a
            href="#contact"
            style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {f.contact}
          </a>
          <a
            href="/sitemap.xml"
            style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {f.sitemap}
          </a>
          <button
            onClick={toggleLang}
            style={{
              fontSize: 11,
              fontFamily: 'Geist Mono,monospace',
              fontWeight: 600,
              color: 'var(--text-muted)',
              background: 'transparent',
              border: '1px solid var(--border-c)',
              borderRadius: 6,
              padding: '3px 10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--text-muted)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border-c)';
            }}
          >
            {lang === 'uk' ? 'EN' : 'UA'}
          </button>
          <button
            onClick={toggleTheme}
            style={{
              fontSize: 14,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </footer>
  );
}
