'use client';
import { motion } from 'framer-motion';
import { useApp } from '../lib/context';

export function Services() {
  const { tr } = useApp();
  const s = tr.services;
  const list = tr.services_list;

  return (
    <section id="services" className="section-wrap">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">{s.tag}</span>
        <h2 className="section-title">{s.title}</h2>
        <p className="section-sub">{s.sub}</p>
      </motion.div>

      <div className="services-grid">
        {list.map((svc, i) => (
          <motion.div
            key={svc.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="service-card"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}
          >
            <div className="no-select" style={{ fontSize: 28, marginBottom: 16, lineHeight: 1 }}>
              {svc.icon}
            </div>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: -0.2,
                marginBottom: 8,
              }}
            >
              {svc.name}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: 14,
              }}
            >
              {svc.desc}
            </p>
            <div className="no-select" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {svc.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    padding: '3px 9px',
                    borderRadius: 5,
                    border: '1px solid var(--border-c)',
                    color: 'var(--text-secondary)',
                    fontFamily: 'Geist Mono,monospace',
                    background: 'var(--bg3)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border-c);
          border: 1px solid var(--border-c);
          border-radius: 14px;
          overflow: hidden;
        }
        .service-card {
          background: var(--bg);
          padding: 28px 26px;
          transition: background 0.2s;
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; border-radius: 10px; }
          .service-card { padding: 20px 18px; }
        }
      `}</style>
    </section>
  );
}
