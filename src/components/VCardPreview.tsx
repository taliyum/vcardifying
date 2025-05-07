import React, { useState } from 'react';
import { useVCard } from '../context/VCardContext';
import { getColorsByScheme, getFontClass, getLayoutClasses } from '../utils/styles';
import { downloadVCard, generateShareableLink, copyToClipboard } from '../utils/vcard';
import { Download, Share2, Copy, CheckCircle, Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github, Instagram, Facebook, MessageCircle, GitBranch as BrandTiktok, Ghost, Link, ExternalLink } from 'lucide-react';

const VCardPreview: React.FC = () => {
  const { vcardData, styleOptions } = useVCard();
  const colors = getColorsByScheme(styleOptions);
  const fontClass = getFontClass(styleOptions.font);
  const layoutClasses = getLayoutClasses(styleOptions.layout);
  
  const [linkCopied, setLinkCopied] = useState(false);
  
  const handleDownload = () => {
    downloadVCard(vcardData);
  };
  
  const handleCopyLink = async () => {
    const link = generateShareableLink(vcardData);
    const success = await copyToClipboard(link);
    
    if (success) {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const getSocialIcon = (platform: string) => {
    const icons: { [key: string]: React.FC<{ size?: number; className?: string }> } = {
      linkedin: Linkedin,
      twitter: Twitter,
      github: Github,
      instagram: Instagram,
      facebook: Facebook,
      whatsapp: MessageCircle,
      tiktok: BrandTiktok,
      snapchat: Ghost,
    };
    return icons[platform] || Link;
  };
  
  const hasSocialLinks = Object.values(vcardData.socialLinks).some(link => link.trim() !== '') || 
    vcardData.customLinks.length > 0;
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview Your VCard</h2>
        
        <div className="flex flex-col items-center">
          <div 
            className={`${layoutClasses.container} max-w-sm w-full mx-auto ${fontClass}`}
            style={{ maxWidth: '350px' }}
          >
            <div 
              className={layoutClasses.header}
              style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}
            >
              {styleOptions.layout === 'modern' && (
                <div className="h-32"></div>
              )}
            </div>
            
            <div 
              className={layoutClasses.body}
              style={{ 
                backgroundColor: colors.background, 
                color: colors.text,
                position: styleOptions.layout === 'modern' ? 'relative' : 'static'
              }}
            >
              <div 
                className={layoutClasses.imageContainer}
                style={{ 
                  borderColor: colors.background,
                  marginTop: styleOptions.layout === 'classic' ? '-70px' : undefined,
                }}
              >
                {vcardData.profileImage ? (
                  <img 
                    src={vcardData.profileImage} 
                    alt={`${vcardData.firstName} ${vcardData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <span className="text-4xl">?</span>
                  </div>
                )}
              </div>
              
              <div 
                className={`mt-4 ${styleOptions.layout === 'modern' ? 'ml-36' : 
                  styleOptions.layout === 'minimal' ? '' : 'text-center'}`}
              >
                <h3 className="text-xl font-bold">
                  {vcardData.firstName || 'First'} {vcardData.lastName || 'Last'}
                </h3>
                
                {vcardData.jobTitle && (
                  <p className="text-sm opacity-90 mt-1" style={{ color: colors.secondary }}>
                    {vcardData.jobTitle}
                  </p>
                )}
                
                {vcardData.company && (
                  <p className="text-sm mt-1">
                    {vcardData.company}
                  </p>
                )}
                
                <div className="mt-4 space-y-2">
                  {vcardData.email && (
                    <div className="flex items-center text-sm">
                      <Mail size={14} className="mr-2" style={{ color: colors.secondary }} />
                      <span>{vcardData.email}</span>
                    </div>
                  )}
                  
                  {vcardData.phone && (
                    <div className="flex items-center text-sm">
                      <Phone size={14} className="mr-2" style={{ color: colors.secondary }} />
                      <span>{vcardData.phone}</span>
                    </div>
                  )}
                  
                  {vcardData.website && (
                    <div className="flex items-center text-sm">
                      <Globe size={14} className="mr-2" style={{ color: colors.secondary }} />
                      <span>{vcardData.website}</span>
                    </div>
                  )}
                  
                  {vcardData.address && (
                    <div className="flex items-center text-sm">
                      <MapPin size={14} className="mr-2" style={{ color: colors.secondary }} />
                      <span>{vcardData.address}</span>
                    </div>
                  )}
                </div>
                
                {hasSocialLinks && (
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {Object.entries(vcardData.socialLinks).map(([platform, url]) => {
                      if (!url) return null;
                      const Icon = getSocialIcon(platform);
                      return (
                        <a 
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-80 transition-opacity"
                        >
                          <Icon size={18} style={{ color: colors.primary }} />
                        </a>
                      );
                    })}
                    
                    {vcardData.customLinks.map((link, index) => {
                      if (!link.url) return null;
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-80 transition-opacity"
                          title={link.label}
                        >
                          <Link size={18} style={{ color: colors.primary }} />
                        </a>
                      );
                    })}
                  </div>
                )}

                {vcardData.cta.url && (
                  <div className="mt-6">
                    <a
                      href={vcardData.cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md text-white transition-colors"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {vcardData.cta.text}
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download size={18} className="mr-2" />
              Save Contact
            </button>
            
            <button
              onClick={handleCopyLink}
              className={`flex items-center px-4 py-2 border rounded-md transition-colors ${
                linkCopied 
                  ? 'bg-green-600 text-white border-green-600' 
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {linkCopied ? (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 size={18} className="mr-2" />
                  Share Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-800 mb-2">How to use your VCard</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Click "Save Contact" to add this contact to your device</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Share the link with others to let them view and save your contact details</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use the call-to-action button to direct people to your preferred platform</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VCardPreview;