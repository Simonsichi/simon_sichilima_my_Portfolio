import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '@/lib/posts';
import { Feed } from 'feed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const posts = await getAllPosts();
    const feed = new Feed({
        title: "My Blog",
        description: "This is my personal blog.",
        id: "https://your-website.com/",
        link: "https://your-website.com/",
        language: "en",
        image: "https://your-website.com/logo.png",
        favicon: "https://your-website.com/favicon.ico",
        copyright: "All rights reserved 2023, Your Name",
    });

    posts.forEach(post => {
        feed.addItem({
            title: post.title,
            id: `https://your-website.com/blog/${post.slug}`,
            link: `https://your-website.com/blog/${post.slug}`,
            description: post.excerpt,
            date: new Date(post.date),
        });
    });

    res.setHeader('Content-Type', 'application/xml');
    res.write(feed.atom1());
    res.end();
}