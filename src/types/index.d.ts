// TypeScript type definitions used throughout the project

export interface Post {
    title: string;
    slug: string;
    content: string;
    date: string;
    excerpt: string;
}

export interface SiteMetadata {
    title: string;
    description: string;
    author: string;
    url: string;
}

export interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}