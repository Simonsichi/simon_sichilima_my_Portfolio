'use client';

import React, { useState } from 'react';
import { downloadCV, checkCVExists } from '../lib/cvDownload';

interface CVDownloadButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

const CVDownloadButton: React.FC<CVDownloadButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  className = '',
  showIcon = true,
  children = 'Download CV'
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-500 hover:bg-primary-600 text-white dark:bg-primary-600 dark:hover:bg-primary-700';
      case 'secondary':
        return 'bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-card';
      case 'outline':
        return 'border-2 border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-400 dark:hover:text-dark-bg';
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadStatus('idle');

    // Check if CV exists first
    const cvExists = await checkCVExists();
    
    if (!cvExists) {
      setDownloadStatus('error');
      setIsDownloading(false);
      alert('CV file not found. Please contact the site administrator.');
      return;
    }

    const success = await downloadCV({
      onSuccess: () => {
        setDownloadStatus('success');
        // Show success message briefly
        setTimeout(() => setDownloadStatus('idle'), 2000);
      },
      onError: (error) => {
        setDownloadStatus('error');
        console.error('Download failed:', error);
        alert('Download failed. Please try again or contact support.');
        setTimeout(() => setDownloadStatus('idle'), 3000);
      }
    });

    setIsDownloading(false);
  };

  const getButtonContent = () => {
    if (isDownloading) {
      return (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          Downloading...
        </>
      );
    }

    if (downloadStatus === 'success') {
      return (
        <>
          {showIcon && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          Downloaded!
        </>
      );
    }

    if (downloadStatus === 'error') {
      return (
        <>
          {showIcon && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          Try Again
        </>
      );
    }

    return (
      <>
        {showIcon && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
        {children}
      </>
    );
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`
        inline-flex items-center gap-2 font-semibold rounded-lg
        transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
      aria-label="Download Simon Sichilima's CV"
    >
      {getButtonContent()}
    </button>
  );
};

export default CVDownloadButton;