'use client';
import { ReactNode } from 'react';
import { useApp } from '../../lib/context';
import type { WorkPost } from '../../lib/mdx';

const EXT = { target: '_blank' as const, rel: 'noopener noreferrer nofollow' };

export function BackLink({ href }: { href: string }) {
  const { tr } = useApp();
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: 'var(--text-muted)',
        marginBottom: 48,
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
      {tr.work.back}
    </a>
  );
}

export function CaseContent({
  postUk,
  postEn,
  mdxUk,
  mdxEn,
}: {
  postUk: WorkPost;
  postEn: WorkPost;
  mdxUk: ReactNode;
  mdxEn: ReactNode;
}) {
  const { tr, lang } = useApp();
  const w = tr.work;
  const post = lang === 'en' ? postEn : postUk;
  const mdx = lang === 'en' ? mdxEn : mdxUk;
  const cats = w.categories as Record<string, string>;

  return (
    <div>
      <div style={{ marginBottom: 48 }}>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'Geist Mono, monospace',
            color: 'var(--accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 12,
          }}
        >
          {cats[post.type as keyof typeof cats] ?? post.type} · {post.year}
        </span>
        <h1
          style={{
            fontSize: 'clamp(32px,5vw,52px)',
            fontWeight: 700,
            letterSpacing: -2,
            color: 'var(--text-primary)',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontSize: 18,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          {post.description}
        </p>
        <div
          style={{
            borderRadius: 14,
            marginBottom: 32,
            border: '1px solid var(--border-c)',
            overflow: 'hidden',
            background: post.gradient,
          }}
        >
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '600px',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              style={{
                height: 'clamp(180px,25vw,300px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 70,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
            </div>
          )}
        </div>
        <MetaRow client={post.client} year={post.year} stack={post.stack} />
      </div>
      <div style={{ lineHeight: 1.8 }}>{mdx}</div>
    </div>
  );
}

export function MetaRow({
  client,
  year,
  stack,
}: {
  client: string;
  year: number;
  stack: string[];
}) {
  const { tr } = useApp();
  const w = tr.work;
  return (
    <div
      style={{
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap',
        padding: '20px 0',
        borderTop: '1px solid var(--border-c)',
        borderBottom: '1px solid var(--border-c)',
        marginBottom: 48,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            marginBottom: 4,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily: 'Geist Mono, monospace',
          }}
        >
          {w.client}
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{client}</div>
      </div>
      <div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            marginBottom: 4,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily: 'Geist Mono, monospace',
          }}
        >
          {w.year}
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{year}</div>
      </div>
      <div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            marginBottom: 4,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily: 'Geist Mono, monospace',
          }}
        >
          {w.stack}
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 2 }}>
          {stack.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 11,
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
  );
}

// Icons
function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function DribbbleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.424 25.424 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.32 35.32 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="13" height="15" viewBox="0 0 38 57" fill="currentColor">
      <path d="M19 28.5A9.5 9.5 0 1028.5 19 9.5 9.5 0 0019 28.5z" />
      <path d="M9.5 57A9.5 9.5 0 0019 47.5V38H9.5a9.5 9.5 0 000 19z" />
      <path d="M9.5 19H19V0H9.5a9.5 9.5 0 000 19z" />
      <path d="M9.5 38H19V19H9.5a9.5 9.5 0 000 19z" />
      <path d="M28.5 0H19v19h9.5a9.5 9.5 0 000-19z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const btnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  padding: '11px 24px',
  borderRadius: 9,
  border: '1px solid var(--border-c)',
  color: 'var(--text-secondary)',
  transition: 'all 0.2s',
  textDecoration: 'none',
};

export function CTARow({ post, postEn }: { post: WorkPost; postEn?: WorkPost }) {
  const { tr, lang } = useApp();
  const w = tr.work;
  const p = lang === 'en' && postEn ? postEn : post;

  return (
    <div
      style={{
        marginTop: 64,
        paddingTop: 40,
        borderTop: '1px solid var(--border-c)',
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {/* Primary CTA */}
      <a
        href="/#contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 600,
          padding: '11px 24px',
          borderRadius: 9,
          background: 'var(--text-primary)',
          color: 'var(--bg)',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        {w.discuss}
      </a>

      {/* Demo link */}
      {p.demo && (
        <a
          href={p.demo}
          {...EXT}
          style={btnBase}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--text-muted)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-c)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <ExternalIcon />
          {w.demo ?? 'Demo'}
        </a>
      )}

      {/* GitHub link */}
      {p.github && (
        <a
          href={p.github}
          {...EXT}
          style={btnBase}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--text-muted)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-c)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <GitHubIcon />
          {w.github ?? 'GitHub'}
        </a>
      )}

      {/* Dribbble link */}
      {p.dribbble && (
        <a
          href={p.dribbble}
          {...EXT}
          style={{ ...btnBase, borderColor: 'rgba(234,76,137,0.3)', color: '#ea4c89' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(234,76,137,0.7)';
            e.currentTarget.style.background = 'rgba(234,76,137,0.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(234,76,137,0.3)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <DribbbleIcon />
          Dribbble
        </a>
      )}

      {/* Figma link */}
      {p.figma && (
        <a
          href={p.figma}
          {...EXT}
          style={{ ...btnBase, borderColor: 'rgba(162,89,255,0.3)', color: '#a259ff' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(162,89,255,0.7)';
            e.currentTarget.style.background = 'rgba(162,89,255,0.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(162,89,255,0.3)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <FigmaIcon />
          Figma
        </a>
      )}

      {/* Fallback: legacy link field */}
      {!p.demo && !p.github && !p.dribbble && !p.figma && p.link && (
        <a
          href={p.link}
          {...EXT}
          style={btnBase}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--text-muted)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-c)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <ExternalIcon />
          Link
        </a>
      )}
    </div>
  );
}
