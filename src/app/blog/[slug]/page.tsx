'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPostBySlug } from '../../../lib/posts';
import { Post } from '../../../types';

const PostPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const fetchedPost = await getPostBySlug(slug as string);
          setPost(fetchedPost);
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 dark:border-primary-400"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 dark:bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-600 dark:hover:bg-primary-700 transition"
            >
              ← Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-4 pt-24">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-dark-text-secondary mb-4">
                {post.excerpt}
              </p>
            )}
            {post.date && (
              <time className="text-gray-500 dark:text-dark-text-muted">
                {new Date(post.date).toLocaleDateString()}
              </time>
            )}
          </header>
          
          <div 
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-dark-text-primary prose-p:text-gray-700 dark:prose-p:text-dark-text-secondary prose-a:text-primary-500 dark:prose-a:text-primary-400"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 dark:bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-600 dark:hover:bg-primary-700 transition"
            >
              ← Back to Blog
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostPage;