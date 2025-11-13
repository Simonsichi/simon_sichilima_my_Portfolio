import React from 'react';
import CVDownloadButton from '../../components/CVDownloadButton';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
            <div className="max-w-4xl mx-auto p-4 pt-24">
                <div className="bg-white dark:bg-dark-surface rounded-xl shadow-lg dark:shadow-dark-surface/50 p-8 border border-gray-200 dark:border-dark-border">
                    <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary">About Me</h1>
                    
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                        <p className="mb-6 text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                            Welcome to my portfolio! I am Simon Sichilima, a passionate Software Engineer with expertise in web development and full-stack system development. 
                            My journey in tech began with a fascination for creating digital solutions and has evolved into a career where I enjoy solving 
                            complex problems and building user-friendly applications that make a real difference.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-gray-50 dark:bg-dark-card p-6 rounded-lg border border-gray-200 dark:border-dark-border">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-dark-text-primary">Professional Focus</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-dark-text-secondary">
                                    <li>• Cross-platform Development</li>
                                    <li>• Full-Stack System and Web Development</li>
                                    <li>• Digital Payment Solutions</li>
                                    <li>• Cloud & Digital Transformation</li>
                                    <li></li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-dark-card p-6 rounded-lg border border-gray-200 dark:border-dark-border">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-dark-text-primary">Technologies</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-dark-text-secondary">
                                    <li>• React, Next.js, TypeScript, Laravel PHP</li>
                                    <li>• CodeigniterReact Native, Tailwind CSS</li>
                                    <li>• Node.js, Java Spring Boot</li>
                                    <li>• MYSQL, PostgreSQL</li>
                                </ul>
                            </div>
                        </div>
                        
                        <p className="mb-6 text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                            With over three years of experience, I specialize in developing cross-platform full-stack system and web applications. 
                            My work with MojaLoop, management systems and in data analytics has delivered scalable financial solutions and meaningful insights. 
                            I have a strong background in digital banking, system payment integration, and governance, 
                            risk, and compliance (GRC).
                        </p>
                        
                        <p className="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                            I believe in continuous learning and strive to improve my skills with each project I undertake. 
                            I'm passionate about helping teams turn ideas into real, user-focused solutions that drive digital transformation.
                            Thank you for visiting my portfolio! Feel free to reach out if you have any questions or would like to collaborate.
                        </p>
                    </div>
                    
                    <div className="mt-8 flex gap-4">
                        <a href="#contact" className="px-6 py-3 bg-primary-500 dark:bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-600 dark:hover:bg-primary-700 transition">
                            Get In Touch
                        </a>
                        <CVDownloadButton 
                            variant="outline" 
                            size="md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;