# Next.js Portfolio

This is a portfolio project built with Next.js, featuring a blog and responsive design. The project is designed to showcase personal projects and blog posts, providing a clean and modern user experience.

## Features

- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across devices.
- **Blog**: A dedicated blog section where you can read and explore various posts.
- **Dynamic Routing**: Individual blog posts are accessible via dynamic routes based on the post slug.
- **SEO Optimization**: Built-in SEO features to enhance visibility on search engines.
- **Tailwind CSS**: Utilizes Tailwind CSS for utility-first styling.

## Project Structure

```
nextjs-portfolio
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about
│   │   │   └── page.tsx
│   │   ├── projects
│   │   │   └── page.tsx
│   │   ├── blog
│   │   │   ├── page.tsx
│   │   │   └── [slug]
│   │   │       └── page.tsx
│   │   └── api
│   │       └── rss.ts
│   ├── components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx
│   │   └── Layout.tsx
│   ├── styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── lib
│   │   ├── posts.ts
│   │   └── seo.ts
│   ├── hooks
│   │   └── useWindowSize.ts
│   └── types
│       └── index.d.ts
├── content
│   └── posts
│       └── hello-world.md
├── public
│   └── robots.txt
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
├── vercel.json
└── README.md
```

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nextjs-portfolio.git
   ```

2. Navigate to the project directory:
   ```
   cd nextjs-portfolio
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to see the application in action.

## Deployment

This project is configured for deployment on Vercel. To deploy, simply connect your GitHub repository to Vercel, and it will automatically build and deploy your application.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.