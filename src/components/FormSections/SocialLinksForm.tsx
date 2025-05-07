import React from 'react';
import { Linkedin, Twitter, Github, Instagram, Facebook, MessageCircle, GitBranch as BrandTiktok, Ghost, Link, Plus, Trash2 } from 'lucide-react';
import { useVCard } from '../../context/VCardContext';

const SocialLinksForm: React.FC = () => {
  const { vcardData, updateSocialLink, updateCustomLink, addCustomLink, removeCustomLink, updateCTA } = useVCard();
  const { socialLinks, customLinks, cta } = vcardData;

  const socialPlatforms = [
    { name: 'linkedin', icon: Linkedin, color: 'text-blue-600', placeholder: 'https://linkedin.com/in/username' },
    { name: 'twitter', icon: Twitter, color: 'text-blue-400', placeholder: 'https://twitter.com/username' },
    { name: 'github', icon: Github, color: 'text-gray-800', placeholder: 'https://github.com/username' },
    { name: 'instagram', icon: Instagram, color: 'text-pink-600', placeholder: 'https://instagram.com/username' },
    { name: 'facebook', icon: Facebook, color: 'text-blue-600', placeholder: 'https://facebook.com/username' },
    { name: 'whatsapp', icon: MessageCircle, color: 'text-green-500', placeholder: 'https://wa.me/1234567890' },
    { name: 'tiktok', icon: BrandTiktok, color: 'text-black', placeholder: 'https://tiktok.com/@username' },
    { name: 'snapchat', icon: Ghost, color: 'text-yellow-400', placeholder: 'https://snapchat.com/add/username' },
  ];

  const ctaTypes = [
    { label: 'Schedule a Meeting', type: 'meeting' },
    { label: 'View Portfolio', type: 'portfolio' },
    { label: 'Send a Message', type: 'message' },
    { label: 'Custom', type: 'custom' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Social Media Links</h2>
        
        <div className="space-y-4">
          {socialPlatforms.map(({ name, icon: Icon, color, placeholder }) => (
            <div key={name} className="flex items-center space-x-3">
              <Icon size={20} className={color} />
              <div className="flex-1">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {name}
                </label>
                <input
                  type="url"
                  id={name}
                  value={socialLinks[name]}
                  onChange={(e) => updateSocialLink(name, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={placeholder}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Custom Links</h2>
          <button
            onClick={addCustomLink}
            className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add Link
          </button>
        </div>
        
        <div className="space-y-4">
          {customLinks.map((link, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateCustomLink(index, { ...link, label: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Link Label"
                />
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateCustomLink(index, { ...link, url: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>
                  <button
                    onClick={() => removeCustomLink(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Call to Action</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ctaTypes.map(({ label, type }) => (
                <button
                  key={type}
                  onClick={() => updateCTA({ ...cta, text: label, type })}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    cta.type === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {cta.type === 'custom' && (
            <div>
              <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700 mb-1">
                Custom CTA Text
              </label>
              <input
                type="text"
                id="ctaText"
                value={cta.text}
                onChange={(e) => updateCTA({ ...cta, text: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter custom CTA text"
              />
            </div>
          )}

          <div>
            <label htmlFor="ctaUrl" className="block text-sm font-medium text-gray-700 mb-1">
              CTA URL
            </label>
            <input
              type="url"
              id="ctaUrl"
              value={cta.url}
              onChange={(e) => updateCTA({ ...cta, url: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://calendly.com/username"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksForm