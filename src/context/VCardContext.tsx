import React, { createContext, useContext, useState } from 'react';
import { VCardData, StyleOptions } from '../types';

interface VCardContextType {
  vcardData: VCardData;
  styleOptions: StyleOptions;
  updateVCardData: (data: Partial<VCardData>) => void;
  updateStyleOptions: (options: Partial<StyleOptions>) => void;
  updateSocialLink: (platform: string, value: string) => void;
  updateCustomLink: (index: number, data: { label: string; url: string }) => void;
  addCustomLink: () => void;
  removeCustomLink: (index: number) => void;
  updateCTA: (cta: VCardData['cta']) => void;
  resetVCardData: () => void;
  updateCustomColors: (colors: Partial<StyleOptions['customColors']>) => void;
}

const defaultVCardData: VCardData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  website: '',
  address: '',
  profileImage: null,
  socialLinks: {
    linkedin: '',
    twitter: '',
    github: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    tiktok: '',
    snapchat: '',
  },
  customLinks: [],
  cta: {
    text: 'Schedule a Meeting',
    url: '',
    type: 'meeting',
  },
};

const defaultStyleOptions: StyleOptions = {
  layout: 'classic',
  colorScheme: 'blue',
  customColors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#111827',
  },
  font: 'sans',
};

const VCardContext = createContext<VCardContextType | undefined>(undefined);

export const VCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vcardData, setVCardData] = useState<VCardData>(defaultVCardData);
  const [styleOptions, setStyleOptions] = useState<StyleOptions>(defaultStyleOptions);

  const updateVCardData = (data: Partial<VCardData>) => {
    setVCardData((prev) => ({ ...prev, ...data }));
  };

  const updateStyleOptions = (options: Partial<StyleOptions>) => {
    setStyleOptions((prev) => ({ ...prev, ...options }));
  };

  const updateSocialLink = (platform: string, value: string) => {
    setVCardData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const updateCustomLink = (index: number, data: { label: string; url: string }) => {
    setVCardData((prev) => ({
      ...prev,
      customLinks: prev.customLinks.map((link, i) => 
        i === index ? data : link
      ),
    }));
  };

  const addCustomLink = () => {
    setVCardData((prev) => ({
      ...prev,
      customLinks: [...prev.customLinks, { label: '', url: '' }],
    }));
  };

  const removeCustomLink = (index: number) => {
    setVCardData((prev) => ({
      ...prev,
      customLinks: prev.customLinks.filter((_, i) => i !== index),
    }));
  };

  const updateCTA = (cta: VCardData['cta']) => {
    setVCardData((prev) => ({
      ...prev,
      cta,
    }));
  };

  const updateCustomColors = (colors: Partial<StyleOptions['customColors']>) => {
    setStyleOptions((prev) => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        ...colors,
      },
    }));
  };

  const resetVCardData = () => {
    setVCardData(defaultVCardData);
    setStyleOptions(defaultStyleOptions);
  };

  return (
    <VCardContext.Provider
      value={{
        vcardData,
        styleOptions,
        updateVCardData,
        updateStyleOptions,
        updateSocialLink,
        updateCustomLink,
        addCustomLink,
        removeCustomLink,
        updateCTA,
        resetVCardData,
        updateCustomColors,
      }}
    >
      {children}
    </VCardContext.Provider>
  );
};

export const useVCard = (): VCardContextType => {
  const context = useContext(VCardContext);
  if (context === undefined) {
    throw new Error('useVCard must be used within a VCardProvider');
  }
  return context;
};