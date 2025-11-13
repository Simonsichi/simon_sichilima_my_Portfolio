/**
 * Utility functions for handling CV downloads and document management
 */

export interface DownloadOptions {
  fileName?: string;
  trackEvent?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Downloads the CV file with proper naming and error handling
 */
export const downloadCV = async (options: DownloadOptions = {}) => {
  const {
    fileName = 'Simon_Sichilima_CV.pdf',
    trackEvent = true,
    onSuccess,
    onError
  } = options;

  try {
    // CV file path in public folder
    const cvPath = '/documents/Simon_Sichilima_CV.pdf';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = fileName;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download event (you can integrate with Google Analytics or other analytics)
    if (trackEvent && typeof window !== 'undefined') {
      // Example: Google Analytics 4
      if ((window as any).gtag) {
        (window as any).gtag('event', 'cv_download', {
          event_category: 'engagement',
          event_label: 'CV Download',
          custom_parameter_1: fileName
        });
      }
      
      // Example: Custom analytics
      console.log('CV Downloaded:', {
        fileName,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
    }
    
    // Success callback
    if (onSuccess) {
      onSuccess();
    }
    
    return true;
  } catch (error) {
    console.error('CV Download Error:', error);
    
    // Error callback
    if (onError) {
      onError(error as Error);
    }
    
    return false;
  }
};

/**
 * Checks if CV file exists
 */
export const checkCVExists = async (): Promise<boolean> => {
  try {
    const response = await fetch('/documents/Simon_Sichilima_CV.pdf', { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Gets CV file information
 */
export const getCVInfo = () => {
  return {
    fileName: 'Simon_Sichilima_CV.pdf',
    filePath: '/documents/Simon_Sichilima_CV.pdf',
    displayName: 'Simon Sichilima - CV',
    description: 'Software Engineer | Mobile & Front-End Developer Resume',
    lastUpdated: '2025-11-05' // Update this when you update your CV
  };
};