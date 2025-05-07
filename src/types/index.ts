export interface VCardData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  website: string;
  address: string;
  profileImage: string | null;
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    instagram: string;
    facebook: string;
    whatsapp: string;
    tiktok: string;
    snapchat: string;
    [key: string]: string; // For custom social links
  };
  customLinks: Array<{
    label: string;
    url: string;
  }>;
  cta: {
    text: string;
    url: string;
    type: 'meeting' | 'portfolio' | 'message' | 'custom';
  };
}

export interface StyleOptions {
  layout: 'classic' | 'modern' | 'minimal';
  colorScheme: 'blue' | 'green' | 'purple' | 'custom';
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  font: 'sans' | 'serif' | 'mono';
}

export type TabType = 'info' | 'style' | 'preview';