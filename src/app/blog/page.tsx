export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 pt-24">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text-primary mb-6">
            Blog
          </h1>
          <p className="text-lg text-gray-700 dark:text-dark-text-secondary mb-8">
            I'm currently working on some exciting blog posts about software development, 
            web app development, and digital transformation. Check back soon for insights 
            and tutorials!
          </p>
          
          <div className="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg dark:shadow-dark-surface/50 border border-gray-200 dark:border-dark-border">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-dark-text-secondary">
              Stay tuned for articles on React, React Native, TypeScript, and more!
            </p>
          </div>
          
          <div className="mt-8">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 dark:bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-600 dark:hover:bg-primary-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get Notified When I Publish
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}