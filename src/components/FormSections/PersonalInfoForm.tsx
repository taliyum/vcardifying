import React from 'react';
import { Mail, Phone, Briefcase, Globe, MapPin } from 'lucide-react';
import { useVCard } from '../../context/VCardContext';

const PersonalInfoForm: React.FC = () => {
  const { vcardData, updateVCardData } = useVCard();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateVCardData({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              value={vcardData.firstName}
              onChange={(e) => updateVCardData({ firstName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              value={vcardData.lastName}
              onChange={(e) => updateVCardData({ lastName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <div className="flex items-start space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center border">
              {vcardData.profileImage ? (
                <img 
                  src={vcardData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-2xl">?</span>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended: Square image, 300x300px or larger
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail size={20} className="text-gray-400" />
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={vcardData.email}
                onChange={(e) => updateVCardData({ email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john.doe@example.com"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone size={20} className="text-gray-400" />
            <div className="flex-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={vcardData.phone}
                onChange={(e) => updateVCardData({ phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Globe size={20} className="text-gray-400" />
            <div className="flex-1">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                value={vcardData.website}
                onChange={(e) => updateVCardData({ website: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.example.com"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin size={20} className="text-gray-400" />
            <div className="flex-1">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={vcardData.address}
                onChange={(e) => updateVCardData({ address: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Information</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Briefcase size={20} className="text-gray-400" />
            <div className="flex-1">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={vcardData.company}
                onChange={(e) => updateVCardData({ company: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Acme Inc."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-5"></div> {/* Spacer to align with icon */}
            <div className="flex-1">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={vcardData.jobTitle}
                onChange={(e) => updateVCardData({ jobTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product Manager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;