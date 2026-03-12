export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: string;
  status: 'Active' | 'Expired' | 'Pending';
  credentialId: string;
  fileName: string;
  description?: string;
}

// Add your actual certificates here
export const certificates: Certificate[] = [
  {
    id: 'cv-cert',
    title: 'Professional CV Document',
    issuer: 'Simon Sichilima',
    date: '2024',
    type: 'Professional Document',
    status: 'Active',
    credentialId: 'CV-2024-001',
    fileName: 'Simon_Sichilima_CV.pdf',
    description: 'Professional curriculum vitae and portfolio document'
  }
  // Add more certificates as needed
];

// Function to get certificate file URL
export const getCertificateUrl = (fileName: string): string => {
  return `/certificates/${fileName}`;
};

// Function to handle certificate viewing
export const viewCertificate = (fileName: string): void => {
  const url = getCertificateUrl(fileName);
  window.open(url, '_blank');
};