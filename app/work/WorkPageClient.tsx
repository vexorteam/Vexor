'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useApp } from '../lib/context';
import type { WorkMeta } from '../lib/mdx';

const CATEGORY_KEYS = [
  'all',
  'Landing Page',
  'Mobile App',
  'SaaS Platform',
  'Web App',
  'Design',
  'Automation & AI',
] as const;

export function WorkPageClient({
  projectsUk,
  projectsEn,
}: {
  projectsUk: WorkMeta[];
  projectsEn: WorkMeta[];
}) {
  const [active, setActive] = useState('all');
  const { tr, lang } = useApp();
  const w = tr.work;
  const cats = w.categories as Record<string, string>;

  const projects = lang === 'en' ? projectsEn : projectsUk;
  const filtered = active === 'all' ? projects : projects.filter(p => p.type === active);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 80 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(40px,6vw,80px) clamp(16px,5vw,48px)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: 'var(--text-muted)',
            marginBottom: 40,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {w.back2}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            style={{
              fontSize: 12,
              fontFamily: 'Geist Mono, monospace',
              color: 'var(--accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 12,
            }}
          >
            {w.tag}
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px,5vw,56px)',
              fontWeight: 700,
              letterSpacing: -2,
              color: 'var(--text-primary)',
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            {w.all_title}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 40 }}>
            {w.all_sub.replace('{n}', String(projects.length))}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="work-filters"
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {CATEGORY_KEYS.map(cat => {
            const label = cats[cat] ?? cat;
            const count =
              cat === 'all' ? projects.length : projects.filter(p => p.type === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  fontSize: 13,
                  padding: '7px 16px',
                  borderRadius: 8,
                  border: '1px solid',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  fontFamily: 'Geist, sans-serif',
                  borderColor: active === cat ? 'var(--accent)' : 'var(--border-c)',
                  background: active === cat ? 'rgba(74,158,255,0.1)' : 'transparent',
                  color: active === cat ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                {label}
                {cat !== 'all' && (
                  <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.6 }}>{count}</span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
            gap: 16,
          }}
        >
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link href={`/work/${p.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'var(--bg2)',
                    border: '1px solid var(--border-c)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--text-muted)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-c)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      height: 160,
                      background: p.gradient,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: 64,
                            height: 44,
                            borderRadius: 6,
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                        />
                      </div>
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 14,
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.5)',
                        zIndex: 1,
                      }}
                    >
                      ↗
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 12,
                        left: 14,
                        fontSize: 10,
                        fontFamily: 'Geist Mono, monospace',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.06em',
                        zIndex: 1,
                      }}
                    >
                      {p.year}
                    </span>
                  </div>
                  <div style={{ padding: '16px 18px 20px' }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: 'Geist Mono, monospace',
                        color: 'var(--accent)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: 5,
                      }}
                    >
                      {cats[p.type as keyof typeof cats] ?? p.type}
                    </span>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        letterSpacing: -0.3,
                        marginBottom: 6,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.55,
                        marginBottom: 12,
                      }}
                    >
                      {p.description}
                    </p>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {p.stack.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 10,
                            fontFamily: 'Geist Mono, monospace',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg3)',
                            border: '1px solid var(--border-c)',
                            padding: '2px 8px',
                            borderRadius: 4,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <style>{`
          .work-filters button {
            white-space: nowrap;
          }
          @media (max-width: 320px) {
            .work-filters {
              flex-wrap: nowrap;
              overflow-x: auto;
              padding-bottom: 8px;
              -webkit-overflow-scrolling: touch;
            }
            .work-filters::-webkit-scrollbar { display: none; }
          }
        `}</style>
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              color: 'var(--text-muted)',
              fontSize: 15,
            }}
          >
            {w.empty}
          </div>
        )}
      </div>
    </main>
  );
}
