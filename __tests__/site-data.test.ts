import { socialLinks } from '@/app/data/site';
import uk from '@/app/i18n/uk.json';
import en from '@/app/i18n/en.json';

describe('site data integrity', () => {
  describe('socialLinks', () => {
    it('should have all required fields', () => {
      expect(socialLinks.telegram).toMatch(/^https?:\/\//);
      expect(socialLinks.github).toMatch(/^https?:\/\//);
      expect(socialLinks.email).toMatch(/^mailto:/);
      expect(socialLinks.emailDisplay).toContain('@');
      expect(socialLinks.telegramDisplay).toMatch(/^@/);
      expect(socialLinks.location).toMatch(/^https?:\/\//);
    });
  });

  describe('services_list', () => {
    it('should have 6 services in uk', () => {
      expect(uk.services_list).toHaveLength(6);
    });
    it('should have 6 services in en', () => {
      expect(en.services_list).toHaveLength(6);
    });
    it('each service should have required fields', () => {
      uk.services_list.forEach(s => {
        expect(s.icon).toBeTruthy();
        expect(s.name).toBeTruthy();
        expect(s.desc).toBeTruthy();
        expect(Array.isArray(s.tags)).toBe(true);
      });
    });
  });

  describe('work.projects_list', () => {
    it('should have 3 projects in uk', () => {
      expect(uk.work.projects_list).toHaveLength(3);
    });
    it('should have 3 projects in en', () => {
      expect(en.work.projects_list).toHaveLength(3);
    });
    it('each project should have required fields', () => {
      uk.work.projects_list.forEach(p => {
        expect(p.slug).toBeTruthy();
        expect(p.type).toBeTruthy();
        expect(p.name).toBeTruthy();
        expect(p.desc).toBeTruthy();
        expect(p.gradient).toBeTruthy();
        expect(Array.isArray(p.stack)).toBe(true);
      });
    });
  });

  describe('about.team_list', () => {
    it('should have 6 team members in uk', () => {
      expect(uk.about.team_list).toHaveLength(6);
    });
    it('should have 6 team members in en', () => {
      expect(en.about.team_list).toHaveLength(6);
    });
    it('each member should have required fields', () => {
      uk.about.team_list.forEach(m => {
        expect(m.initials).toHaveLength(2);
        expect(m.name).toBeTruthy();
        expect(m.role).toBeTruthy();
        expect(m.desc).toBeTruthy();
        expect(Array.isArray(m.skills)).toBe(true);
        expect(m.skills).toHaveLength(3);
      });
    });
  });

  describe('faq', () => {
    it('should have 6 items in uk', () => {
      expect(uk.faq.items).toHaveLength(6);
    });
    it('should have 6 items in en', () => {
      expect(en.faq.items).toHaveLength(6);
    });
    it('each item should have question and answer', () => {
      uk.faq.items.forEach(item => {
        expect(item.q).toBeTruthy();
        expect(item.a.length).toBeGreaterThan(20);
      });
    });
  });

  describe('contact budget options', () => {
    it('UAH budget should have options with ₴', () => {
      expect(uk.contact.budget_uah.length).toBeGreaterThan(0);
      uk.contact.budget_uah.slice(0, -1).forEach(opt => expect(opt).toContain('₴'));
    });
    it('USD budget should have options', () => {
      expect(en.contact.budget_usd.length).toBeGreaterThan(0);
    });
    it('UAH and USD should have equal number of options', () => {
      expect(uk.contact.budget_uah.length).toBe(uk.contact.budget_usd.length);
    });
  });

  describe('i18n completeness', () => {
    it('uk and en should have same top-level keys', () => {
      const ukKeys = Object.keys(uk).sort();
      const enKeys = Object.keys(en).sort();
      expect(ukKeys).toEqual(enKeys);
    });
  });
});
