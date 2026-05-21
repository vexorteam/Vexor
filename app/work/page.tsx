import type { Metadata } from 'next';
import { getAllWork } from '../lib/mdx';
import { WorkPageClient } from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Проєкти',
  description:
    'Всі реалізовані проєкти команди Vexor — лендинги, мобільні застосунки, SaaS-платформи та дизайн.',
};

export default function WorkPage() {
  // Both langs preloaded — client switches between them
  const projectsUk = getAllWork('uk');
  const projectsEn = getAllWork('en');
  return <WorkPageClient projectsUk={projectsUk} projectsEn={projectsEn} />;
}
