import { VCardData } from '../types';

export const generateVCardString = (data: VCardData): string => {
  let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';

  if (data.firstName || data.lastName) {
    vcard += `N:${data.lastName};${data.firstName};;;\n`;
    vcard += `FN:${data.firstName} ${data.lastName}\n`;
  }

  if (data.email) {
    vcard += `EMAIL;TYPE=INTERNET:${data.email}\n`;
  }

  if (data.phone) {
    vcard += `TEL;TYPE=CELL:${data.phone}\n`;
  }

  if (data.company) {
    vcard += `ORG:${data.company}\n`;
  }

  if (data.jobTitle) {
    vcard += `TITLE:${data.jobTitle}\n`;
  }

  if (data.website) {
    vcard += `URL:${data.website}\n`;
  }

  if (data.address) {
    vcard += `ADR;TYPE=WORK:;;${data.address};;;;\n`;
  }

  // Add all social media links
  Object.entries(data.socialLinks).forEach(([platform, url]) => {
    if (url) {
      vcard += `X-SOCIALPROFILE;TYPE=${platform}:${url}\n`;
    }
  });

  // Add custom links
  data.customLinks.forEach(link => {
    if (link.url) {
      vcard += `X-CUSTOM-LINK;LABEL=${link.label}:${link.url}\n`;
    }
  });

  // Add CTA
  if (data.cta.url) {
    vcard += `X-CTA;TYPE=${data.cta.type};LABEL=${data.cta.text}:${data.cta.url}\n`;
  }

  vcard += 'END:VCARD';
  return vcard;
};

export const downloadVCard = (data: VCardData): void => {
  const vCardString = generateVCardString(data);
  const blob = new Blob([vCardString], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.firstName}_${data.lastName}_vcard.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
};

export const generateShareableLink = (data: VCardData): string => {
  // In a real app, this would create a server-side stored VCard
  // and return a unique URL. For demo purposes, we'll use URL params
  const params = new URLSearchParams();
  params.set('data', JSON.stringify(data));
  
  return `${window.location.origin}?${params.toString()}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};