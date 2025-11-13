import { Post } from '@/types';

const posts: Post[] = [
  {
    title: "Hello World",
    slug: "hello-world",
    excerpt: "This is my first post.",
    content: "This is the full content of my first post.",
    date: "2023-01-01"
  }
];

export async function getAllPosts(): Promise<Post[]> {
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = posts.find((p) => p.slug === slug);
  return post || null;
}
