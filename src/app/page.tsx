'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CVDownloadButton from '../components/CVDownloadButton';
import { certificates, viewCertificate, Certificate } from '@/lib/certificatesData';

const HomePage = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Skills filtering state
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'mobile' | 'backend' | 'tools'>('all');

  // Skills data with categories
  const skillsData = [
    // Frontend
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'React', level: 70, category: 'frontend' },
    { name: 'TypeScript', level: 65, category: 'frontend' },
    { name: 'Tailwind CSS', level: 80, category: 'frontend' },

    // Mobile
    { name: 'Android Studio | Java', level: 70, category: 'mobile' },


    // Backend
    { name: 'Java Spring Boot', level: 65, category: 'backend' },
    { name: 'NestJs', level: 65, category: 'backend' },
    { name: 'PostgreSQL', level: 65, category: 'backend' },
    
    { name: 'Codeigniter', level: 65, category: 'backend' },
    { name: 'Laravel', level: 65, category: 'backend' },
    // Tools
    { name: 'Git/GitHub', level: 75, category: 'tools' },
    { name: 'Docker', level: 70, category: 'tools' },
    { name: 'Figma', level: 75, category: 'tools' },
    { name: 'VS Code', level: 85, category: 'tools' },
    { name: 'NetBeans', level: 65, category: 'tools' },
    { name: 'Andriod Studio', level: 65, category: 'tools' },
    { name: 'Adobe Suits', level: 65, category: "tools"},
    { name: 'Postman', level: 65, category: 'tools' },

  ];

  // Filter skills based on active filter
  const filteredSkills = activeFilter === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeFilter);

  // Handle filter change
  const handleFilterChange = (filter: 'all' | 'frontend' | 'mobile' | 'backend' | 'tools') => {
    setActiveFilter(filter);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      setFormStatus('idle');
      return;
    }

    try {
      // Enhanced email detection and auto-opening logic
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Hi Simon,

I'm reaching out through your portfolio website.

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

Best regards,
${formData.name}`);
      
      const mailtoLink = `mailto:simonsichilima4597@gmail.com?subject=${subject}&body=${body}`;
      
      // Prepare clipboard backup (always do this first)
      const messageText = `Subject: Portfolio Contact from ${formData.name}

Hi Simon,

I'm reaching out through your portfolio website.

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

Best regards,
${formData.name}`;
      
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(messageText);
      }

      // Enhanced email app detection and opening
      let emailOpened = false;
      
      // Method 1: Try mailto (works with most desktop email clients)
      try {
        const mailtoWindow = window.open(mailtoLink, '_blank');
        if (mailtoWindow) {
          emailOpened = true;
        }
      } catch (error) {
        console.log('Mailto failed, trying alternatives');
      }

      // Method 2: Try Gmail web interface (universal fallback)
      if (!emailOpened) {
        try {
          const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=simonsichilima4597@gmail.com&subject=${subject}&body=${body}`;
          window.open(gmailUrl, '_blank');
          emailOpened = true;
        } catch (error) {
          console.log('Gmail web failed');
        }
      }

      // Show appropriate feedback based on what worked
      if (emailOpened) {
        setFormStatus('sent');
        
        // Enhanced success message with instructions
        alert(`✅ Email app opened successfully!

📱 What happens next:
1️⃣ Your email app/Gmail should now be open
2️⃣ Check that all details are correct
3️⃣ Click "Send" in your email app
4️⃣ You'll get a "sent" confirmation in your email app

📋 Backup: Your message is copied to clipboard
🔄 This form will reset in 5 seconds

Thank you for reaching out! 🚀`);

        // Extended timer to allow for actual sending
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setFormStatus('idle');
        }, 5000);

      } else {
        // If both methods failed, show comprehensive alternatives
        setFormStatus('error');
        alert(`📧 Automatic email opening not available on this device.

✅ Your message has been copied to clipboard!

📱 Choose the best option for your device:

🌐 OPTION 1 - Web Email (Recommended):
   • Open Gmail.com, Outlook.com, or Yahoo.com
   • Click "Compose" or "New Email"
   • Paste your message

� OPTION 2 - Mobile Email App:
   • Open your phone's email app
   • Tap "Compose" or "+"
   • Send to: simonsichilima4597@gmail.com
   • Paste your message

�️ OPTION 3 - Desktop Email:
   • Open Outlook, Mail app, or Thunderbird
   • Create new email
   • Paste your message

📋 Your complete message is ready to paste!`);

        setTimeout(() => setFormStatus('idle'), 6000);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      
      // Comprehensive error handling with device-specific guidance
      alert(`⚠️ Email system temporarily unavailable.

📋 Your message has been saved to clipboard!

🚀 Quick Solutions:

📧 DIRECT EMAIL (Fastest):
   Send to: simonsichilima4597@gmail.com
   
📱 MOBILE USERS:
   • Open your email app
   • Tap the "+" or "Compose" button
   • Paste your message

💻 DESKTOP USERS:
   • Open Gmail.com in your browser
   • Click "Compose"
   • Paste your message

🔗 BACKUP OPTIONS:
   • Use the "Gmail Web" button below
   • Check my social links in footer
   • Call/text if urgent (see contact info)

Your message: "${formData.message.substring(0, 50)}..."

I'll respond within 24 hours! 📩`);
      
      setTimeout(() => setFormStatus('idle'), 8000);
    }
  };

  // Mobile detection and smart email opening
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const openSmartEmail = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(`Hi Simon,

I'm reaching out through your portfolio website.

Name: ${formData.name || '[Please fill]'}
Email: ${formData.email || '[Please fill]'}

Message:
${formData.message || '[Please fill your message]'}

Best regards,
${formData.name || 'Visitor'}`);

    if (isMobile()) {
      // Mobile: Try native email app first, then Gmail app, then web
      const mailtoLink = `mailto:simonsichilima4597@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    } else {
      // Desktop: Try default client, then Gmail web
      try {
        const mailtoLink = `mailto:simonsichilima4597@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
      } catch (error) {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=simonsichilima4597@gmail.com&subject=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
      }
    }
  };

  const openEmail = () => {
    window.open('mailto:simonsichilima4597@gmail.com');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
      alert('Message copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50/40 to-secondary-100/30 dark:from-dark-bg dark:via-dark-surface/40 dark:to-dark-card/30 relative overflow-hidden transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 dark:from-primary-400/10 dark:via-transparent dark:to-accent-400/10"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/10 dark:bg-accent-400/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8 sm:mb-12 animate-fade-in">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border border-primary-200/50 dark:border-dark-border/50 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg hover:shadow-xl dark:shadow-dark-surface/50 transition-all duration-300">
              <div className="relative">
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-success-500 dark:bg-success-400 rounded-full animate-pulse block"></span>
                <span className="absolute inset-0 w-2 h-2 sm:w-3 sm:h-3 bg-success-500 dark:bg-success-400 rounded-full animate-ping"></span>
              </div>
              Available for new opportunities
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-secondary-900 dark:text-dark-text-primary mb-6 sm:mb-8 leading-tight sm:leading-tight md:leading-[1.1] tracking-tight px-2">
              <span className="block mb-2 sm:mb-3">Hello</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 bg-clip-text text-transparent animate-slide-up">
                  Simon Sichilima
                </span>
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-primary-500/30 via-primary-600/30 to-accent-500/30 dark:from-primary-400/40 dark:via-primary-500/40 dark:to-accent-400/40 rounded-full blur-sm"></div>
                <div className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 rounded-full"></div>
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="mb-4 sm:mb-6 mt-6 sm:mt-8">
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-secondary-600 dark:text-dark-text-secondary font-semibold mb-2">
                Software Engineer
              </p>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-secondary-500 dark:text-dark-text-muted font-medium">
                Web Application & Full-Stack Developer
              </p>
            </div>
            
            {/* Description */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-secondary-600 dark:text-dark-text-secondary mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
              Passionate about making everyday life easier through technology. <span className="text-primary-600 dark:text-primary-400 font-semibold">Creating innovative digital solutions that make a real difference</span> and building products that users can truly rely and depend on. 
              From simple web-based systems and mobile apps to transformative, life-changing solutions powered by technology.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center mb-12 sm:mb-20 px-2">
            <a 
              href="#projects" 
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
            
            <a 
              href="#contact" 
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-primary-50 dark:hover:bg-primary-900/30 w-full sm:w-auto"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Let's Talk
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden sm:flex flex-col items-center text-secondary-400 animate-fade-in" style={{animationDelay: '1s'}}>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4 font-medium tracking-wider uppercase">Discover More</p>
            <div className="relative">
              <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-secondary-300 dark:border-secondary-700 rounded-full flex justify-center p-2 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm">
                <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full animate-bounce"></div>
              </div>
              <div className="absolute -inset-2 border border-secondary-200 dark:border-secondary-800 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50/50 dark:from-dark-bg dark:to-dark-surface/50 transition-colors duration-500">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
              Get to know me
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-dark-text-primary mb-6">
              About <span className="bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-6">
                Software Engineer | Full-Stack Developer | <br />
                Graphic Designer | Digital Solutions Expert | IT Specialist 
              </h3>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-6 leading-relaxed">
                With <span className="font-semibold text-primary-600 dark:text-primary-400">3+ years crafting digital solutions</span>, I specialize in developing scalable web applications and mobile solutions that drive business value. My expertise spans full-stack development, from creating intuitive user interfaces to building robust backend systems and integrating secure payment solutions.
              </p>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-6 leading-relaxed">
                I hold a <span className="font-semibold text-secondary-900 dark:text-dark-text-primary">Bachelor's degree in Computer Science</span> from Mulungushi University, where I built a strong foundation in software engineering principles, algorithms, and system design. My technical expertise spans the full development stack—from intuitive frontend interfaces to powerful backend architectures and seamless payment integrations.
              </p>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-8 leading-relaxed">
                Beyond code, I'm passionate about <span className="font-semibold text-accent-600 dark:text-accent-400">digital transformation</span> and helping businesses leverage technology to achieve their goals. Whether it's modernizing legacy systems, implementing cloud solutions, or designing user-centric applications, I thrive on turning complex challenges into elegant, scalable solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium">
                  <span className="text-lg">🎓</span>
                  BSc Computer Science
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-300 rounded-lg text-sm font-medium">
                  <span className="text-lg">💼</span>
                  3+ Years Experience
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg text-sm font-medium">
                  <span className="text-lg">🚀</span>
                  5+ Projects Delivered
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <CVDownloadButton variant="secondary" size="md" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="group relative p-8 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm border border-primary-100 dark:border-dark-border rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-dark-surface/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                    💻
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-secondary-900 dark:text-dark-text-primary mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Full-Stack Development</h4>
                    <p className="text-secondary-600 dark:text-dark-text-secondary leading-relaxed">Building modern web applications and systems using React, Next.js, Spring Boot, and cloud technologies.</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative p-8 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm border border-primary-100 dark:border-dark-border rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-dark-surface/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 dark:from-accent-400 dark:to-accent-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                    💳
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-secondary-900 dark:text-dark-text-primary mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">Payment Integration</h4>
                    <p className="text-secondary-600 dark:text-dark-text-secondary leading-relaxed">Implementing secure payment systems and financial technology solutions for businesses.</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative p-8 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm border border-primary-100 dark:border-dark-border rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-dark-surface/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-success-50/50 to-transparent dark:from-success-900/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 dark:from-success-400 dark:to-success-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                    ☁️
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-secondary-900 dark:text-dark-text-primary mb-3 group-hover:text-success-600 dark:group-hover:text-success-400 transition-colors duration-300">Cloud Solutions</h4>
                    <p className="text-secondary-600 dark:text-dark-text-secondary leading-relaxed">Designing and deploying scalable cloud infrastructure and digital transformation strategies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-dark-surface transition-colors duration-500">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              My <span className="text-primary-500 dark:text-primary-400">Skills</span>
            </h2>
          </div>
          <div className="mb-8 flex justify-center">
            <div className="flex gap-2 bg-white dark:bg-dark-surface rounded-lg p-1 shadow-sm dark:shadow-dark-surface/50">
              <button 
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === 'all' 
                    ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => handleFilterChange('frontend')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === 'frontend' 
                    ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                Frontend
              </button>
              <button 
                onClick={() => handleFilterChange('mobile')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === 'mobile' 
                    ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                Mobile
              </button>
              <button 
                onClick={() => handleFilterChange('backend')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === 'backend' 
                    ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                Backend
              </button>
              <button 
                onClick={() => handleFilterChange('tools')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === 'tools' 
                    ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-sm' 
                    : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                Tools
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
            {filteredSkills.map((skill, index) => (
              <div 
                key={`${skill.name}-${activeFilter}`} 
                className="group relative bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg dark:shadow-dark-surface/50 border border-gray-100/50 dark:border-dark-border/50 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-400/20 hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Gradient background overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50 dark:from-primary-900/20 dark:via-transparent dark:to-accent-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card content */}
                <div className="relative z-10">
                  {/* Header with skill name and level */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 mb-1">
                        {skill.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-dark-text-muted">
                          Proficiency
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                i < Math.ceil(skill.level / 20)
                                  ? 'bg-primary-500 dark:bg-primary-400 shadow-sm'
                                  : 'bg-gray-200 dark:bg-dark-card'
                              }`}
                              style={{ animationDelay: `${index * 150 + i * 100}ms` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Modern progress bar */}
                  <div className="space-y-2">
                    <div className="relative w-full bg-gray-100 dark:bg-dark-card rounded-full h-3 overflow-hidden">
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 via-primary-50/30 to-accent-100/50 dark:from-primary-900/30 dark:via-primary-800/20 dark:to-accent-900/30 rounded-full"></div>
                      
                      {/* Progress fill with gradient */}
                      <div 
                        className="relative h-full bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 rounded-full transition-all duration-1000 ease-out shadow-inner"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${index * 150 + 300}ms`,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)'
                        }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Progress indicator dot */}
                      <div 
                        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-dark-surface rounded-full shadow-lg border-2 border-primary-500 dark:border-primary-400 transition-all duration-1000 ease-out"
                        style={{ 
                          left: `calc(${skill.level}% - 8px)`,
                          animationDelay: `${index * 150 + 500}ms`
                        }}
                      >
                        <div className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                      skill.category === 'frontend' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : skill.category === 'mobile'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : skill.category === 'backend'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                    </span>
                    
                    {/* Experience level indicator */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 dark:text-dark-text-muted">
                        {skill.level >= 90 ? 'Expert' : skill.level >= 70 ? 'Advanced' : skill.level >= 50 ? 'Intermediate' : 'Beginner'}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        skill.level >= 90 
                          ? 'bg-emerald-500' 
                          : skill.level >= 70 
                          ? 'bg-blue-500' 
                          : skill.level >= 50 
                          ? 'bg-yellow-500' 
                          : 'bg-gray-400'
                      }`}></div>
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary-500/20 to-transparent dark:from-primary-400/30 rounded-2xl transform rotate-45 translate-x-4 -translate-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-dark-bg transition-colors duration-500 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-400/10 dark:bg-accent-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-400/10 dark:bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Featured <span className="text-primary-500 dark:text-primary-400">Projects</span>
            </h2>
            <p className="text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto text-lg">
              Here are some of my recent projects. Each project was carefully crafted with attention to detail, performance, and user experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'ZUCT_SMART_SMS',
                description: 'Web based student information system that is automated and uses obfuscation technology to advance and encrypt the system from any unauthorised users. a Web based student accommodation system which makes it easier for students to find accommodation near campus',
                tech: ['PHP', 'LARAVEL_PHP', 'Data_Mining', 'Web_Based_Application'],
                image: '/api/placeholder/400/250',
                category: 'Education',
                status: 'not yet hosted (unavailable)',
                year: '2024'
              },

               {
                title: 'Book Collection system',
                description: 'Modern Book management system that stores a collection of different kinds of books by category , prices, Authors and their respctive Book titles.',
                tech: ['PHP', 'RestAPI', 'React', 'tailwindCSS', "Web_Based_Application"],
                image: '/api/placeholder/400/250',
                category: 'Education',
                status: 'Not available',
                year: '2024'
              },
              
              {
                title: 'My Portfolio',
                description: 'Web based morden Portfolio.',
                tech: ['JavaScript', 'NestJS', 'TwailwindCSS', 'vercel.json'],
                image: '/api/placeholder/400/250',
                category: 'Carreer',
                status: 'Available',
                year: '2023'
              },
              {
                title: 'Leave_Web_App',
                description: 'Leave form is a web based application that administrated the leave management process in an organization to simplify the communication channel and simplifys the manual operation by the human resource.',
                tech: ['Java', 'SpringBoot', 'TwailwindCSS', 'RestAPI', 'MVC'],
                image: '/api/placeholder/400/250',
                category: 'FinTech',
                status: 'Available',
                year: '2025'
              },
              
            ].map((project, index) => (
              <div 
                key={index} 
                className="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-400/30 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {/* Glass sliding overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                {/* Secondary glass layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-primary-500/5 dark:from-primary-400/10 dark:via-accent-400/10 dark:to-primary-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Status badge */}
                <div className="absolute top-4 right-4 z-30">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full border border-white/40 dark:border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                    {project.status}
                  </span>
                </div>

                {/* Image container with overlay */}
                <div className="relative h-52 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 dark:from-primary-900/40 dark:via-primary-800/30 dark:to-accent-900/40 flex items-center justify-center overflow-hidden">
                  
                  {/* Animated background glass pattern */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 dark:bg-white/10 rounded-full blur-2xl transform -translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-1000"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-400/20 dark:bg-accent-400/10 rounded-full blur-3xl transform translate-x-8 translate-y-8 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 dark:from-white/20 dark:via-transparent dark:to-white/5"></div>
                  
                  {/* Icon/Logo placeholder */}
                  <div className="relative z-20 w-20 h-20 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl border border-white/50 dark:border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <svg className="w-10 h-10 text-primary-500 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {project.category === 'Mobile App' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
                      ) : project.category === 'Web App' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9 9v-9m9-9v9" />
                      ) : project.category === 'Backend' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                  </div>

                  {/* Sliding light reflection */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent w-1/3 h-full transform -skew-x-12 -translate-x-full opacity-0 group-hover:translate-x-[300%] group-hover:opacity-100 transition-all duration-1200 ease-out"></div>

                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10 dark:opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent transform rotate-12"></div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6 relative bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm">
                  {/* Project header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-white/70 dark:bg-primary-900/30 backdrop-blur-md rounded-lg mb-3 border border-primary-200/50 dark:border-primary-700/50 group-hover:shadow-md transition-all duration-300">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300 mb-2 group-hover:translate-x-1">
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-dark-text-muted font-medium bg-white/60 dark:bg-dark-card/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/30 dark:border-white/10">
                      {project.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-dark-text-secondary text-sm mb-5 leading-relaxed group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: techIndex % 4 === 0 ? 'rgb(59 130 246 / 0.1)' : 
                                         techIndex % 4 === 1 ? 'rgb(16 185 129 / 0.1)' :
                                         techIndex % 4 === 2 ? 'rgb(245 101 101 / 0.1)' : 'rgb(139 92 246 / 0.1)',
                          color: techIndex % 4 === 0 ? 'rgb(59 130 246)' : 
                                techIndex % 4 === 1 ? 'rgb(16 185 129)' :
                                techIndex % 4 === 2 ? 'rgb(245 101 101)' : 'rgb(139 92 246)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                    <button className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-primary-500/90 to-primary-600/90 dark:from-primary-600/90 dark:to-primary-700/90 backdrop-blur-md text-white px-4 py-3 rounded-xl font-medium text-sm transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-500/30 flex items-center justify-center gap-2 border border-white/20">
                      {/* Button glass overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      <svg className="relative z-10 w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="relative z-10">Live Demo</span>
                    </button>
                    <button className="group/btn bg-white/70 dark:bg-dark-card/70 backdrop-blur-md text-gray-700 dark:text-dark-text-secondary px-4 py-3 rounded-xl font-medium text-sm hover:bg-white/80 dark:hover:bg-dark-card/80 transform hover:scale-105 transition-all duration-300 flex items-center justify-center border border-white/40 dark:border-white/20 hover:shadow-lg">
                      <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Bottom glass reflection */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"></div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 dark:from-primary-400/10 dark:via-transparent dark:to-accent-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* View all projects button */}
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 text-white font-medium rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 dark:hover:shadow-primary-400/25">
              <span>View All Projects</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-b from-white to-slate-50/50 dark:from-dark-bg dark:to-dark-surface/50 transition-colors duration-500 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-400/10 dark:bg-accent-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary-400/10 dark:bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Work <span className="text-accent-500 dark:text-accent-400">Experience</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {/* Card 1 - iZyane InovSolution */}
            <div className="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden">
              {/* Glass sliding overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              {/* Secondary glass layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-primary-500/5 dark:from-primary-400/10 dark:via-accent-400/10 dark:to-primary-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-semibold">2025 - Date</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary mb-1">Software Developer</h3>
              <p className="text-sm text-gray-700 dark:text-dark-text-secondary font-medium mb-1">iZyane InovSolution</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-dark-text-muted mb-2">
                <svg className="w-4 h-4 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Lusaka, Zambia
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-dark-text-secondary mb-2 space-y-1">
                <li>Software Development</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded text-xs">Software Development</span>
              </div>
              </div>
              
              {/* Bottom glass reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"></div>
            </div>
            
            {/* Card 2 - SIKA Diagnostics */}
            <div className="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-accent-500/20 dark:hover:shadow-accent-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden">
              {/* Glass sliding overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              {/* Secondary glass layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-purple-500/5 to-accent-500/5 dark:from-accent-400/10 dark:via-purple-400/10 dark:to-accent-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-semibold">2023 - Date</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary mb-1">Graphics Designer</h3>
              <p className="text-sm text-gray-700 dark:text-dark-text-secondary font-medium mb-1">SIKA Diagnostics</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-dark-text-muted mb-2">
                <svg className="w-4 h-4 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Lusaka, Zambia
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-dark-text-secondary mb-2 space-y-1">
                <li>Graphics designs</li>
                <li>Visual Communication</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 rounded text-xs">Graphics Design</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded text-xs">Visual Communication</span>
              </div>
              </div>
              
              {/* Bottom glass reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"></div>
            </div>

            {/* Card 3 - Imangatech Innovations LTD */}
            <div className="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden">
              {/* Glass sliding overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              {/* Secondary glass layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-success-500/5 to-purple-500/5 dark:from-purple-400/10 dark:via-success-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-xs font-semibold">2022 - 2024</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary mb-1">Software Web Developer and Finance</h3>
              <p className="text-sm text-gray-700 dark:text-dark-text-secondary font-medium mb-1">Imangatech Innovations LTD</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-dark-text-muted mb-2">
                <svg className="w-4 h-4 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Ndola, Zambia
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-dark-text-secondary mb-2 space-y-1">
                <li>Graphics Designer</li>
                <li>Finance Administrator</li>
                <li>Software Development</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded text-xs">Web Development</span>
                <span className="px-2 py-1 bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-300 rounded text-xs">Finance</span>
                <span className="px-2 py-1 bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 rounded text-xs">Graphics Design</span>
              </div>
              </div>
              
              {/* Bottom glass reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"></div>
            </div>

            {/* Card 4 - ZambezOmnisports */}
            <div className="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden">
              {/* Glass sliding overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              {/* Secondary glass layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-orange-500/5 dark:from-orange-400/10 dark:via-red-400/10 dark:to-orange-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 rounded-full text-xs font-semibold">2022 - 2024</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary mb-1">Technical Support, Lead Graphics Designer</h3>
              <p className="text-sm text-gray-700 dark:text-dark-text-secondary font-medium mb-1">ZambezOmnisports</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-dark-text-muted mb-2">
                <svg className="w-4 h-4 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Lusaka, Zambia
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-dark-text-secondary mb-2 space-y-1">
                <li>Working with the broadcast multi media and technical team</li>
                <li>Manage graphics design, creation of visual presentation</li>
                <li>Provide Technical supports during production</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded text-xs">Broadcasting</span>
                <span className="px-2 py-1 bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 rounded text-xs">Graphics Design</span>
                <span className="px-2 py-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-xs">Technical Support</span>
              </div>
              </div>
              
              {/* Bottom glass reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"></div>
            </div>

            {/* Card 5 - ZUCT */}
            <div className="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden">
              {/* Glass sliding overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              {/* Secondary glass layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-indigo-500/5 dark:from-indigo-400/10 dark:via-blue-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full text-xs font-semibold">2021 - 2024</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary mb-1">Software Engineer</h3>
              <p className="text-sm text-gray-700 dark:text-dark-text-secondary font-medium mb-1">Zambi University College of Technology (ZUCT)</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-dark-text-muted mb-2">
                <svg className="w-4 h-4 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Lusaka, Zambia
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-dark-text-secondary mb-2 space-y-1">
                <li>Participated in Final year projects in both web and mobile development and gained graphics designs</li>
                <li>Participated in Networking hands on During the institution Computer lab infrastructure connection under Cable laying</li>
                <li>Participated in mini-projects labs from my software engineering courses</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded text-xs">Software Engineering</span>
                <span className="px-2 py-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded text-xs">Web Development</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded text-xs">Mobile Development</span>
                <span className="px-2 py-1 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 rounded text-xs">Networking</span>
              </div>
              </div>
              
              {/* Bottom glass reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white dark:bg-dark-bg transition-colors duration-500 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary-400/10 dark:bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-accent-400/10 dark:bg-accent-400/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Professional <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 bg-clip-text text-transparent">Certifications</span>
            </h2>
            <p className="text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
              Validated expertise across various technologies and methodologies through industry-recognized certifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate: Certificate, index: number) => (
              <div 
                key={certificate.id}
                className="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Glass sliding overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                {/* Secondary glass layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-primary-500/5 dark:from-primary-400/10 dark:via-accent-400/10 dark:to-primary-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10">
                {/* Certificate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      certificate.status === 'Active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {certificate.status}
                    </span>
                  </div>
                </div>
                
                {/* Certificate Title & Issuer */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-dark-text-primary mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {certificate.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-1">
                    <span className="font-medium">Issuer:</span> {certificate.issuer}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                    <span className="font-medium">Date:</span> {certificate.date}
                  </p>
                </div>

                {/* Certificate Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-border">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 rounded-full text-xs font-medium">
                      {certificate.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-dark-text-muted">
                      ID: {certificate.credentialId}
                    </p>
                    <button 
                      onClick={() => viewCertificate(certificate.fileName)}
                      className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mt-1 flex items-center gap-1 group-hover:scale-105 transition-transform duration-300"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Certificate
                    </button>
                  </div>
                </div>
                </div>
                
                {/* Bottom glass reflection */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"></div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 dark:from-primary-400/10 dark:via-transparent dark:to-accent-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Certification Summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-100 dark:border-primary-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  1 Active Certifications
                </span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Verified & Up-to-date
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
          

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-primary-25 to-accent-25 dark:from-dark-surface dark:via-dark-bg dark:to-dark-card transition-colors duration-500 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary-400/20 dark:bg-primary-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent-400/15 dark:bg-accent-400/25 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Get In <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
              Got an exciting project idea? I'm passionate about turning concepts into reality. Drop me a message and let's create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Information - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <div className="group bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border border-gray-100/50 dark:border-dark-border/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-400/20 transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">Email Address</p>
                      <a 
                        href="mailto:simonsichilima4597@gmail.com" 
                        className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors font-medium"
                      >
                        simonsichilima4597@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border border-gray-100/50 dark:border-dark-border/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-400/20 transition-all duration-500 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-dark-text-primary mb-2">Phone Numbers</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-md font-medium">MTN</span>
                          <a 
                            href="tel:+260965146409" 
                            className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors font-medium"
                          >
                            +260965146409
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-md font-medium">Airtel</span>
                          <a 
                            href="tel:+260973989980" 
                            className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors font-medium"
                          >
                            +260973989980
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="group bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border border-gray-100/50 dark:border-dark-border/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-400/20 transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">Location</p>
                      <p className="text-gray-600 dark:text-dark-text-secondary">Lusaka, Zambia 🇿🇲</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border border-gray-100/50 dark:border-dark-border/50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Connect With Me
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/in/simon-sichilima-8038b7207/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-600 border border-blue-200 dark:border-blue-800 hover:border-blue-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    aria-label="LinkedIn Profile"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300 group-hover:text-white transition-colors">LinkedIn</span>
                  </a>

                  {/* GitHub */}
                  <a 
                    href="https://github.com/Simonsichi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-900/20 hover:from-gray-800 hover:to-gray-900 dark:hover:from-gray-700 dark:hover:to-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-800 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    aria-label="GitHub Profile"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                  </a>

                  {/* Facebook */}
                  <a 
                    href="https://web.facebook.com/profile.php?id=61562388020238" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-700 border border-blue-200 dark:border-blue-800 hover:border-blue-600 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    aria-label="Facebook Profile"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300 group-hover:text-white transition-colors">Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm border border-gray-100/50 dark:border-dark-border/50 rounded-3xl p-8 shadow-xl dark:shadow-dark-surface/50 hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-400/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">Send a Message</h3>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 dark:text-dark-text-secondary mb-3">Your Name</label>
                      <input 
                        id="contact-name"
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name" 
                        required
                        autoComplete="name"
                        className="w-full px-4 py-4 border-2 border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted hover:border-primary-300 dark:hover:border-primary-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 dark:text-dark-text-secondary mb-3">Your Email</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@gmail.com" 
                        required
                        autoComplete="email"
                        className="w-full px-4 py-4 border-2 border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted hover:border-primary-300 dark:hover:border-primary-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 dark:text-dark-text-secondary mb-3">Your Message</label>
                    <textarea 
                      id="contact-message"
                      rows={6} 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hello Simon, I'd like to discuss..." 
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300 resize-none bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted hover:border-primary-300 dark:hover:border-primary-600"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'sending'}
                    className="group w-full px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 hover:from-primary-600 hover:via-primary-700 hover:to-accent-600 dark:hover:from-primary-500 dark:hover:via-primary-600 dark:hover:to-accent-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 dark:hover:shadow-primary-400/25"
                  >
                    {formStatus === 'sending' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    )}
                    <span>
                      {formStatus === 'sending' ? 'Sending Message...' : 
                       formStatus === 'sent' ? 'Message Sent! ✓' :
                       formStatus === 'error' ? 'Try Again' : 'Send Message'}
                    </span>
                    {formStatus !== 'sending' && (
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </form>

                {/* Status Messages */}
                {formStatus === 'sent' && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-800 dark:text-green-200">Email Client Opened Successfully!</h4>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          Please complete sending the email in your email client. Your message details have been copied to clipboard as backup.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-red-800 dark:text-red-200">Unable to Open Email Client</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                          Your message has been copied to clipboard. Please email me directly at <span className="font-mono bg-red-100 dark:bg-red-800/30 px-1 py-0.5 rounded">simonsichilima4597@gmail.com</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button 
                    type="button" 
                    onClick={openSmartEmail}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-all duration-300 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Smart Email
                  </button>
                  <button 
                    type="button" 
                    onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=simonsichilima4597@gmail.com', '_blank')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-300 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z"/>
                    </svg>
                    Gmail Web
                  </button>
                  <button 
                    type="button" 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-all duration-300 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Message
                  </button>
                  <CVDownloadButton variant="outline" size="sm" showIcon={true}>
                    Download CV
                  </CVDownloadButton>
                </div>
              </div>

              {/* Smart Email System Info */}
              <div className="mt-6 bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">Smart Email System Features:</h4>
                    <div className="grid md:grid-cols-2 gap-y-1 gap-x-6 text-sm text-blue-700 dark:text-blue-300">
                      <p>📱 Auto-detects mobile devices</p>
                      <p>💻 Desktop client fallbacks</p>
                      <p>🔄 Pre-fills all email details</p>
                      <p>📋 Auto-copies to clipboard</p>
                      <p>🌐 Works across all platforms</p>
                      <p>⚡ Instant email opening</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;