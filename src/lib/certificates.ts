export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: string;
  status: 'Active' | 'Expired';
  credentialId: string;
  fileName: string; // PDF file name in public/certificates/
  description: string;
  skills: string[];
}

export const certificates: Certificate[] = [
  {
    id: 'aws-cp-2024',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    type: 'Cloud Computing',
    status: 'Active',
    credentialId: 'AWS-CP-2024-001',
    fileName: 'aws-cloud-practitioner.pdf',
    description: 'Foundational understanding of AWS Cloud services, security, architecture, pricing and support.',
    skills: ['AWS', 'Cloud Computing', 'Infrastructure', 'Security']
  },
  {
    id: 'java-oracle-2023',
    title: 'Oracle Certified Professional: Java SE 11 Developer',
    issuer: 'Oracle',
    date: '2023',
    type: 'Programming',
    status: 'Active',
    credentialId: 'OCP-JAVA-2023',
    fileName: 'oracle-java-se11.pdf',
    description: 'Advanced Java programming skills including concurrency, collections, and advanced language features.',
    skills: ['Java', 'OOP', 'Concurrency', 'Collections Framework']
  },
  {
    id: 'react-meta-2024',
    title: 'Meta Front-End Developer Certificate',
    issuer: 'Meta',
    date: '2024',
    type: 'Frontend Development',
    status: 'Active',
    credentialId: 'META-REACT-2024',
    fileName: 'meta-frontend-developer.pdf',
    description: 'Comprehensive frontend development skills with React, including hooks, state management, and testing.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Frontend Architecture']
  },
  {
    id: 'ibm-db-2023',
    title: 'IBM Database Design & Management',
    issuer: 'IBM',
    date: '2023',
    type: 'Database',
    status: 'Active',
    credentialId: 'IBM-DB-2023',
    fileName: 'ibm-database-design.pdf',
    description: 'Database design principles, SQL optimization, and database administration best practices.',
    skills: ['SQL', 'Database Design', 'Performance Optimization', 'Data Modeling']
  },
  {
    id: 'google-mad-2024',
    title: 'Google Mobile App Development',
    issuer: 'Google',
    date: '2024',
    type: 'Mobile Development',
    status: 'Active',
    credentialId: 'GOOGLE-MAD-2024',
    fileName: 'google-mobile-development.pdf',
    description: 'Mobile app development with Android and cross-platform frameworks.',
    skills: ['Android', 'Kotlin', 'Mobile UI/UX', 'App Architecture']
  },
  {
    id: 'comptia-sec-2023',
    title: 'CompTIA Security+ Certification',
    issuer: 'CompTIA',
    date: '2023',
    type: 'Security',
    status: 'Active',
    credentialId: 'COMPTIA-SEC-2023',
    fileName: 'comptia-security-plus.pdf',
    description: 'Cybersecurity fundamentals including threat detection, risk management, and security protocols.',
    skills: ['Cybersecurity', 'Risk Management', 'Network Security', 'Incident Response']
  }
];

export const getCertificateById = (id: string): Certificate | undefined => {
  return certificates.find(cert => cert.id === id);
};

export const getCertificatesByType = (type: string): Certificate[] => {
  return certificates.filter(cert => cert.type === type);
};