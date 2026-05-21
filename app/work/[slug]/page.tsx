import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getWorkBySlug, getAllWorkSlugs } from '../../lib/mdx';
import { BackLink, CTARow, CaseContent } from './CaseClient';

export async function generateStaticParams() {
  return getAllWorkSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getWorkBySlug(slug, 'uk');
  if (!post) return {};
  return { title: post.title, description: post.description };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      style={{
        fontSize: 'clamp(20px,3vw,28px)',
        fontWeight: 700,
        letterSpacing: -0.8,
        color: 'var(--text-primary)',
        marginTop: 48,
        marginBottom: 16,
        lineHeight: 1.2,
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 18 }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      style={{
        paddingLeft: 20,
        marginBottom: 18,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 8,
      }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }} {...props} />
  ),
};

export default async function WorkCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postUk = getWorkBySlug(slug, 'uk');
  const postEn = getWorkBySlug(slug, 'en');
  if (!postUk) notFound();

  const mdxUk = <MDXRemote source={postUk.content} components={mdxComponents} />;
  const mdxEn = postEn ? <MDXRemote source={postEn.content} components={mdxComponents} /> : mdxUk;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 80 }}>
      <article
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: 'clamp(40px,6vw,80px) clamp(16px,5vw,48px)',
        }}
      >
        <BackLink href="/work" />
        <CaseContent postUk={postUk} postEn={postEn ?? postUk} mdxUk={mdxUk} mdxEn={mdxEn} />
        <CTARow post={postUk} postEn={postEn ?? postUk} />
      </article>
    </main>
  );
}
