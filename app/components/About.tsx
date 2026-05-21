'use client';
import { motion } from 'framer-motion';
import { useApp } from '../lib/context';
import { socialLinks } from '../data/site';

const EXT = { target: '_blank' as const, rel: 'noopener noreferrer nofollow' };

export function About() {
  const { tr } = useApp();
  const a = tr.about;

  const teamList = a.team_list || [];

  return (
    <section id="about" className="section-wrap">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">{a.tag}</span>
        <h2 className="section-title">{a.title}</h2>
        <p className="section-sub">{a.sub}</p>
      </motion.div>

      <motion.div
        className="about-two-col"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'start',
          marginBottom: 56,
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p
            style={{
              fontSize: 15,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: 14,
            }}
          >
            {a.p1_intro}{' '}
            <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.p1_bold}</strong>{' '}
            {a.p1_rest}
          </p>
          <p
            style={{
              fontSize: 15,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: 14,
            }}
          >
            {a.p2}{' '}
            <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.p2_bold}</strong>
          </p>

          {/* GitHub */}
          <a
            href={socialLinks.github}
            {...EXT}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginTop: 20,
              padding: 16,
              borderRadius: 12,
              background: 'var(--bg2)',
              border: '1px solid var(--border-c)',
              transition: 'border-color 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--text-muted)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-c)')}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'var(--bg3)',
                border: '1px solid var(--border-c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
                github.com/vexorteam
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {a.github_sub}
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>

          {/* Telegram */}
          <a
            href={socialLinks.telegram}
            {...EXT}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginTop: 10,
              padding: 16,
              borderRadius: 12,
              background: 'rgba(38,169,224,0.06)',
              border: '1px solid rgba(38,169,224,0.2)',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(38,169,224,0.5)';
              e.currentTarget.style.background = 'rgba(38,169,224,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(38,169,224,0.2)';
              e.currentTarget.style.background = 'rgba(38,169,224,0.06)';
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(38,169,224,0.1)',
                border: '1px solid rgba(38,169,224,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#26a9e0">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.088 14.15l-2.967-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.735.436z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#26a9e0' }}>
                {socialLinks.telegramDisplay}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {a.telegram_sub}
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(38,169,224,0.6)"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>

        {/* Process */}
        <div
          style={{
            padding: 24,
            borderRadius: 12,
            background: 'var(--bg2)',
            border: '1px solid var(--border-c)',
          }}
        >
          <div
            className="no-select"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 16,
            }}
          >
            {a.process_title}
          </div>
          {(a.process || []).map((step, i, arr) => (
            <div
              key={step.n}
              style={{
                display: 'flex',
                gap: 14,
                paddingBottom: i < arr.length - 1 ? 16 : 0,
                marginBottom: i < arr.length - 1 ? 16 : 0,
                borderBottom: i < arr.length - 1 ? '1px solid var(--border-c)' : 'none',
              }}
            >
              <span
                className="no-select"
                style={{
                  fontSize: 11,
                  fontFamily: 'Geist Mono,monospace',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {step.n}
              </span>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: 2,
                  }}
                >
                  {step.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team */}
      <motion.div
        className="team-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {teamList.map((m, i) => {
          const currentSkills = m.skills || [];
          const initials = m.initials || (m.name ? m.name.substring(0, 2).toUpperCase() : '??');

          return (
            <motion.div
              key={m.id || m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                padding: 22,
                borderRadius: 12,
                background: 'var(--bg2)',
                border: '1px solid var(--border-c)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--text-muted)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-c)')}
            >
              <div
                className="no-select"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'var(--bg3)',
                  border: '2px solid var(--border-c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 14,
                }}
              >
                {initials}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 2,
                }}
              >
                {m.name}
              </div>
              <div
                className="no-select"
                style={{
                  fontSize: 12,
                  color: 'var(--accent)',
                  marginBottom: 10,
                  fontFamily: 'Geist Mono,monospace',
                }}
              >
                {m.role}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: currentSkills.length > 0 ? 12 : 0,
                }}
              >
                {m.desc}
              </div>

              {currentSkills.length > 0 && (
                <div className="no-select" style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {currentSkills.map(s => (
                    <span
                      key={s}
                      style={{
                        fontSize: 10,
                        padding: '2px 8px',
                        borderRadius: 4,
                        background: 'var(--bg3)',
                        border: '1px solid var(--border-c)',
                        color: 'var(--text-secondary)',
                        fontFamily: 'Geist Mono,monospace',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
      <style>{`
        @media (max-width: 1024px) {
          #about .about-two-col { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 768px) {
          #about .team-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 320px) {
          #about .team-grid > div { padding: 14px !important; }
          #about .about-two-col > div > a { padding: 10px !important; gap: 8px !important; }
          #about .about-two-col > div > a > div:first-child { width: 30px !important; height: 30px !important; }
          #about .about-two-col > div > a span, #about .about-two-col > div > a div { font-size: 12px !important; }
        }
      `}</style>
    </section>
  );
}
