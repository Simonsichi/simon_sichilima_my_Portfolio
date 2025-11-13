import React from 'react';
import Link from 'next/link';

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, slug, date }) => {
  const formattedDate = React.useMemo(() => {
    try {
      return new Date(date).toLocaleDateString();
    } catch (e) {
      return date;
    }
  }, [date]);

  return (
    <article className="border border-gray-200 dark:border-dark-border rounded-xl p-5 shadow-sm hover:shadow-lg dark:shadow-dark-surface/50 transform hover:-translate-y-1 transition-all duration-200 bg-white dark:bg-dark-surface">
      <header className="mb-3">
        <h3 className="text-lg font-semibold">
          <Link href={`/blog/${slug}`} className="text-slate-900 dark:text-dark-text-primary hover:text-primary-500 dark:hover:text-primary-400">
            {title}
          </Link>
        </h3>
        <div className="text-xs text-gray-400 dark:text-dark-text-muted mt-1">{formattedDate}</div>
      </header>
      <p className="text-gray-600 dark:text-dark-text-secondary mb-4">{excerpt}</p>
      <footer>
        <Link href={`/blog/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
          Read article →
        </Link>
      </footer>
    </article>
  );
};

export default PostCard;