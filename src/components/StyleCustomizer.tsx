import React, { useState } from 'react';
import { useVCard } from '../context/VCardContext';
import { CheckCircle, Layout, Palette, Type } from 'lucide-react';

const StyleCustomizer: React.FC = () => {
  const { styleOptions, updateStyleOptions, updateCustomColors } = useVCard();
  const [activeTab, setActiveTab] = useState<'layout' | 'colors' | 'font'>('layout');

  const colorPresets = [
    { name: 'Blue', value: 'blue', color: '#3B82F6' },
    { name: 'Green', value: 'green', color: '#10B981' },
    { name: 'Purple', value: 'purple', color: '#8B5CF6' },
    { name: 'Custom', value: 'custom', color: '#F59E0B' },
  ];

  const layoutOptions = [
    { name: 'Classic', value: 'classic', description: 'Traditional business card layout' },
    { name: 'Modern', value: 'modern', description: 'Contemporary design with overlapping elements' },
    { name: 'Minimal', value: 'minimal', description: 'Clean, simple layout with essential info' },
  ];

  const fontOptions = [
    { name: 'Sans Serif', value: 'sans', sample: 'Aa' },
    { name: 'Serif', value: 'serif', sample: 'Aa' },
    { name: 'Monospace', value: 'mono', sample: 'Aa' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex border-b space-x-4 mb-6">
          <button
            className={`flex items-center pb-2 px-1 ${
              activeTab === 'layout'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('layout')}
          >
            <Layout size={18} className="mr-2" />
            Layout
          </button>
          <button
            className={`flex items-center pb-2 px-1 ${
              activeTab === 'colors'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('colors')}
          >
            <Palette size={18} className="mr-2" />
            Colors
          </button>
          <button
            className={`flex items-center pb-2 px-1 ${
              activeTab === 'font'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('font')}
          >
            <Type size={18} className="mr-2" />
            Typography
          </button>
        </div>

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Choose a Layout</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {layoutOptions.map((option) => (
                <div
                  key={option.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                    styleOptions.layout === option.value
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200'
                  }`}
                  onClick={() => updateStyleOptions({ layout: option.value })}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{option.name}</h4>
                    {styleOptions.layout === option.value && (
                      <CheckCircle size={18} className="text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  <div className="mt-3 h-24 bg-gray-100 rounded flex items-center justify-center">
                    <div className={`w-4/5 h-16 bg-gray-200 rounded relative ${
                      option.value === 'modern' ? 'pt-3' : 'flex items-center'
                    }`}>
                      {option.value === 'modern' && (
                        <div className="absolute -top-3 left-3 w-8 h-8 bg-gray-300 rounded-lg"></div>
                      )}
                      {option.value === 'minimal' && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-gray-300 rounded-full"></div>
                      )}
                      <div className={`${
                        option.value === 'classic' ? 'text-center w-full' : 'ml-3'
                      }`}>
                        <div className="w-12 h-2 bg-gray-300 rounded mb-1"></div>
                        <div className="w-20 h-2 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Select a Color Scheme</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorPresets.map((preset) => (
                <div
                  key={preset.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                    styleOptions.colorScheme === preset.value
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200'
                  }`}
                  onClick={() => updateStyleOptions({ colorScheme: preset.value })}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{preset.name}</h4>
                    {styleOptions.colorScheme === preset.value && (
                      <CheckCircle size={18} className="text-blue-500" />
                    )}
                  </div>
                  <div 
                    className="h-8 rounded"
                    style={{ backgroundColor: preset.color }}
                  ></div>
                </div>
              ))}
            </div>

            {styleOptions.colorScheme === 'custom' && (
              <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-3">Customize Colors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="primaryColor" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Primary Color
                    </label>
                    <div className="flex">
                      <span 
                        className="w-8 h-8 rounded-l border-l border-y" 
                        style={{ backgroundColor: styleOptions.customColors.primary }}
                      ></span>
                      <input
                        type="text"
                        id="primaryColor"
                        value={styleOptions.customColors.primary}
                        onChange={(e) => updateCustomColors({ primary: e.target.value })}
                        className="rounded-r border-r border-y px-3 py-1 w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label 
                      htmlFor="secondaryColor" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Secondary Color
                    </label>
                    <div className="flex">
                      <span 
                        className="w-8 h-8 rounded-l border-l border-y" 
                        style={{ backgroundColor: styleOptions.customColors.secondary }}
                      ></span>
                      <input
                        type="text"
                        id="secondaryColor"
                        value={styleOptions.customColors.secondary}
                        onChange={(e) => updateCustomColors({ secondary: e.target.value })}
                        className="rounded-r border-r border-y px-3 py-1 w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label 
                      htmlFor="accentColor" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Accent Color
                    </label>
                    <div className="flex">
                      <span 
                        className="w-8 h-8 rounded-l border-l border-y" 
                        style={{ backgroundColor: styleOptions.customColors.accent }}
                      ></span>
                      <input
                        type="text"
                        id="accentColor"
                        value={styleOptions.customColors.accent}
                        onChange={(e) => updateCustomColors({ accent: e.target.value })}
                        className="rounded-r border-r border-y px-3 py-1 w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label 
                      htmlFor="textColor" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Text Color
                    </label>
                    <div className="flex">
                      <span 
                        className="w-8 h-8 rounded-l border-l border-y" 
                        style={{ backgroundColor: styleOptions.customColors.text }}
                      ></span>
                      <input
                        type="text"
                        id="textColor"
                        value={styleOptions.customColors.text}
                        onChange={(e) => updateCustomColors({ text: e.target.value })}
                        className="rounded-r border-r border-y px-3 py-1 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'font' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Select a Font Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fontOptions.map((option) => (
                <div
                  key={option.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                    styleOptions.font === option.value
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200'
                  }`}
                  onClick={() => updateStyleOptions({ font: option.value })}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{option.name}</h4>
                    {styleOptions.font === option.value && (
                      <CheckCircle size={18} className="text-blue-500" />
                    )}
                  </div>
                  <div className={`text-4xl text-center py-4 ${
                    option.value === 'sans' ? 'font-sans' : 
                    option.value === 'serif' ? 'font-serif' : 'font-mono'
                  }`}>
                    {option.sample}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleCustomizer;