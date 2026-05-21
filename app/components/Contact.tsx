'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '../lib/context';
import { socialLinks } from '../data/site';

const EXT = {
  target: '_blank' as const,
  rel: 'noopener noreferrer nofollow',
};

const containsScriptTag = (value: string) => {
  return /<\s*script\b[^>]*>(.*?)<\s*\/\s*script>/gi.test(value);
};

const isValidContact = (value: string) => {
  const clean = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
  const isTelegram = clean.startsWith('@') && clean.length >= 3;
  const isPhone = /^\+?[0-9\s\-()]{7,15}$/.test(clean);
  return isEmail || isTelegram || isPhone;
};

export function Contact() {
  const { tr, theme, lang } = useApp();

  const [sent, setSent] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currency, setCurrency] = useState<'uah' | 'usd'>('uah');

  const [nameValue, setNameValue] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [budgetValue, setBudgetValue] = useState('');
  const [descValue, setDescValue] = useState('');

  const [requiredError, setRequiredError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState('');

  const sentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (sentTimerRef.current) clearTimeout(sentTimerRef.current);
    };
  }, []);

  const c = tr.contact;
  const f = c.form;

  const isDark = theme === 'dark';

  const inp: React.CSSProperties = {
    background: 'var(--bg2)',
    border: '1px solid var(--border-c)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    fontSize: 14,
    padding: '11px 14px',
    outline: 'none',
    width: '100%',
    fontFamily: 'Geist, system-ui, sans-serif',
    transition: 'border-color 0.2s',
  };

  const checkHasError = (overrides: Record<string, string> = {}) => {
    const fields = {
      name: nameValue,
      contact: contactValue,
      desc: descValue,
      ...overrides,
    };
    const stillInvalid = Object.values(fields).some(containsScriptTag);
    setHasError(stillInvalid);
    return stillInvalid;
  };

  const validateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldKey: string
  ) => {
    const value = e.target.value;
    const invalid = containsScriptTag(value);

    e.target.style.borderColor = invalid ? '#ef4444' : 'var(--border-c)';

    checkHasError({ [fieldKey]: value });
  };

  const validateRequired = () => {
    const isUk = lang === 'uk';

    if (!nameValue.trim() || !contactValue.trim()) {
      setRequiredError(true);
      setValidationErrorMessage(
        c.missing_fields ||
          (isUk
            ? 'Будь ласка, заповніть обовʼязкові поля: Імʼя та Контакт.'
            : 'Please fill in the required fields: Name and Contact.')
      );
      return false;
    }

    if (nameValue.trim().length < 2) {
      setRequiredError(true);
      setValidationErrorMessage(
        isUk
          ? 'Імʼя занадто коротке (мінімум 2 символи).'
          : 'The name is too short (minimum 2 characters).'
      );
      return false;
    }

    if (contactValue.trim().length < 4) {
      setRequiredError(true);
      setValidationErrorMessage(
        isUk ? 'Контактні дані занадто короткі.' : 'Contact information is too short.'
      );
      return false;
    }

    if (!isValidContact(contactValue)) {
      setRequiredError(true);
      setValidationErrorMessage(
        isUk
          ? 'Будь ласка, вкажіть коректний Email або Telegram (починаючи з @).'
          : 'Please provide a valid Email or Telegram username (starting with @).'
      );
      return false;
    }

    setRequiredError(false);
    setValidationErrorMessage('');
    return true;
  };

  const handleSubmit = () => {
    if (hasError) return;
    if (!validateRequired()) return;

    // Debug log
    // const payload = {
    //   name: nameValue,
    //   contact: contactValue,
    //   type: typeValue,
    //   budget: budgetValue,
    //   desc: descValue,
    // };

    // console.log('Contact form payload:', payload);

    setSent(true);
    setNameValue('');
    setContactValue('');
    setTypeValue('');
    setBudgetValue('');
    setDescValue('');

    sentTimerRef.current = setTimeout(() => setSent(false), 3000);
  };

  const info = [
    {
      icon: '📬',
      label: c.email_label,
      value: socialLinks.emailDisplay,
      href: socialLinks.email,
    },
    {
      icon: '✈️',
      label: c.telegram_label,
      value: socialLinks.telegramDisplay,
      href: socialLinks.telegram,
    },
    {
      icon: '🕐',
      label: c.response_label,
      value: c.response_value,
      href: null,
    },
    {
      icon: '📍',
      label: c.location_label,
      value: c.location_value,
      href: socialLinks.location,
    },
  ];

  return (
    <section id="contact" className="section-wrap">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">{c.tag}</span>
        <h2 className="section-title">{c.title}</h2>
        <p className="section-sub">{c.sub}</p>
      </motion.div>

      <div className="contact-layout">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {info.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 0',
                borderBottom: i < info.length - 1 ? '1px solid var(--border-c)' : 'none',
              }}
            >
              <div
                className="no-select"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'var(--bg2)',
                  border: '1px solid var(--border-c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>

              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    marginBottom: 3,
                  }}
                >
                  {item.label}
                </div>

                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith('http') ? EXT : {})}
                    style={{
                      fontSize: 14,
                      color: 'var(--accent)',
                      fontFamily: 'Geist Mono,monospace',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {item.value}
                  </a>
                ) : (
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--text-primary)',
                      fontFamily: 'Geist Mono,monospace',
                    }}
                  >
                    {item.value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="contact-form"
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="no-select" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {f.name_label} *
              </label>

              <input
                type="text"
                placeholder={f.name_placeholder}
                style={inp}
                value={nameValue}
                onChange={e => {
                  setNameValue(e.target.value);
                  validateField(e, 'name');
                  if (requiredError) setRequiredError(false);
                }}
                onFocus={e => {
                  if (!containsScriptTag(e.target.value)) {
                    e.target.style.borderColor = 'var(--blue-mid)';
                  }
                }}
                onBlur={e => {
                  if (!containsScriptTag(e.target.value)) {
                    e.target.style.borderColor = 'var(--border-c)';
                  }
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="no-select" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {f.contact_label} *
              </label>

              <input
                type="text"
                placeholder={f.contact_placeholder}
                style={inp}
                value={contactValue}
                onChange={e => {
                  setContactValue(e.target.value);
                  validateField(e, 'contact');
                  if (requiredError) setRequiredError(false);
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--blue-mid)')}
                onBlur={e => {
                  if (!containsScriptTag(e.target.value)) {
                    e.target.style.borderColor = 'var(--border-c)';
                  }
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label className="no-select" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {f.type_label}
            </label>

            <select
              style={{ ...inp, cursor: 'pointer' }}
              value={typeValue}
              onChange={e => setTypeValue(e.target.value)}
              onFocus={e => (e.target.style.borderColor = 'var(--blue-mid)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-c)')}
            >
              <option value="" disabled>
                {f.type_placeholder}
              </option>

              {f.types.map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <label className="no-select" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {f.budget_label}
              </label>

              <div
                style={{
                  display: 'flex',
                  gap: 2,
                  background: 'var(--bg3)',
                  borderRadius: 6,
                  padding: 2,
                }}
              >
                {(['uah', 'usd'] as const).map(cur => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => {
                      setCurrency(cur);
                      setBudgetValue('');
                    }}
                    style={{
                      fontSize: 11,
                      padding: '3px 10px',
                      borderRadius: 4,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Geist Mono,monospace',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      background: currency === cur ? 'var(--bg)' : 'transparent',
                      color: currency === cur ? 'var(--text-primary)' : 'var(--text-muted)',
                      boxShadow: currency === cur ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                    }}
                  >
                    {cur === 'uah' ? '₴ UAH' : '$ USD'}
                  </button>
                ))}
              </div>
            </div>

            <select
              style={{ ...inp, cursor: 'pointer' }}
              value={budgetValue}
              onChange={e => setBudgetValue(e.target.value)}
              onFocus={e => (e.target.style.borderColor = 'var(--blue-mid)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-c)')}
            >
              <option value="" disabled>
                {f.budget_placeholder}
              </option>

              {(currency === 'uah' ? c.budget_uah : c.budget_usd).map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label className="no-select" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {f.desc_label}
            </label>

            <textarea
              placeholder={f.desc_placeholder}
              rows={4}
              style={{ ...inp, resize: 'none' }}
              value={descValue}
              onChange={e => {
                setDescValue(e.target.value);
                validateField(e, 'desc');
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--blue-mid)')}
              onBlur={e => {
                if (!containsScriptTag(e.target.value)) {
                  e.target.style.borderColor = 'var(--border-c)';
                }
              }}
            />
          </div>

          {(hasError || requiredError) && (
            <div style={{ color: '#ef4444', fontSize: 13, lineHeight: '1.4' }}>
              {hasError ? c.invalid_script : validationErrorMessage}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: 13,
              borderRadius: 9,
              fontWeight: 600,
              fontSize: 14,
              border: 'none',
              cursor: hasError ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
              background: hasError ? '#ef4444' : sent ? '#22c55e' : isDark ? 'white' : '#0a0a0a',
              color: hasError || sent ? 'white' : isDark ? '#0a0a0a' : 'white',
              opacity: hasError ? 0.95 : 1,
            }}
          >
            {hasError ? (
              c.button_error
            ) : sent ? (
              `✓ ${f.submitted}`
            ) : (
              <>
                {f.submit}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

          <a
            href={socialLinks.telegram}
            {...EXT}
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: 9,
              fontSize: 14,
              fontWeight: 500,
              border: '1.5px solid rgba(38,169,224,0.35)',
              color: '#26a9e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              transition: 'all 0.2s',
              background: 'rgba(38,169,224,0.07)',
            }}
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ flexShrink: 0 }}
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.088 14.15l-2.967-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.735.436z" />
            </svg>

            <span className="tg-btn-full">{f.tg_btn}</span>
            <span className="tg-btn-short">Telegram</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 64px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          .contact-info {
            order: -1;
          }

          .contact-form > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }

        .tg-btn-short {
          display: none;
        }

        .tg-btn-full {
          display: inline;
        }

        @media (max-width: 400px) {
          .tg-btn-full {
            display: none;
          }

          .tg-btn-short {
            display: inline;
          }
        }
      `}</style>
    </section>
  );
}
