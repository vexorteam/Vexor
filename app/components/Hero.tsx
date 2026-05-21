'use client';
import { motion } from 'framer-motion';
import { DiamondMark } from './Logo';
import { useApp } from '../lib/context';

export function Hero() {
  const { tr, theme } = useApp();
  const h = tr.hero;
  const s = tr.stats;

  const statsData = [
    { num: '30+', label: s.projects },
    { num: '4+', label: s.years },
    { num: '92%', label: s.clients },
    { num: 'UA ➜ EU', label: s.vector },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(100px,15vw,140px) clamp(16px,5vw,48px) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%)',
          opacity: theme === 'dark' ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(12,68,124,0.2) 0%,transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{ position: 'relative', zIndex: 1, maxWidth: 820, width: '100%', margin: '0 auto' }}
      >
        <motion.div
          style={{ display: 'inline-block', marginBottom: 28 }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DiamondMark size={60} />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ marginBottom: 24 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <span
            className="no-select"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: 'var(--text-muted)',
              padding: '5px 14px',
              borderRadius: 100,
              border: '1px solid var(--border-c)',
              fontFamily: 'Geist Mono,monospace',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                flexShrink: 0,
              }}
            />
            {h.badge}
          </span>
        </motion.div>

        <motion.h1
          style={{
            fontSize: 'clamp(36px,7.5vw,80px)',
            fontWeight: 700,
            letterSpacing: 'clamp(-2px,-0.04em,-3px)',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: 20,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {h.title1}
          <span style={{ color: 'var(--text-muted)' }}>{h.title2}</span>
        </motion.h1>

        <motion.p
          style={{
            fontSize: 'clamp(15px,2vw,18px)',
            color: 'var(--text-secondary)',
            maxWidth: 520,
            lineHeight: 1.75,
            margin: '0 auto 36px',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {h.sub}
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a
            href="#contact"
            style={{
              display: 'inline-flex',
              fontSize: 14,
              fontWeight: 600,
              padding: '12px 0',
              borderRadius: 9,
              minWidth: 180,
              justifyContent: 'center',
              alignItems: 'center',
              background: 'var(--text-primary)',
              color: 'var(--bg)',
              textDecoration: 'none',
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {h.cta_primary}
          </motion.a>
          <motion.a
            href="#work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'var(--text-secondary)',
              padding: '14px 0',
              borderRadius: 9,
              minWidth: 180,
              justifyContent: 'center',
              border: '1px solid var(--border-c)',
              textDecoration: 'none',
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {h.cta_secondary}
          </motion.a>
        </motion.div>

        <motion.div
          style={{
            display: 'flex',
            gap: 'clamp(24px,5vw,56px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 72,
            paddingTop: 48,
            borderTop: '1px solid var(--border-c)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {statsData.map((st, i) => (
            <motion.div
              key={st.label}
              className="no-select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
            >
              <div
                style={{
                  fontSize: 'clamp(24px,4vw,34px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: -1,
                }}
              >
                {st.num}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                {st.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
