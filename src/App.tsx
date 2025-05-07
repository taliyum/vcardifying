import React, { useState } from 'react';
import { VCardProvider } from './context/VCardContext';
import Layout from './components/Layout';
import PersonalInfoForm from './components/FormSections/PersonalInfoForm';
import SocialLinksForm from './components/FormSections/SocialLinksForm';
import StyleCustomizer from './components/StyleCustomizer';
import VCardPreview from './components/VCardPreview';
import { TabType } from './types';

import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('info');

  return (
    <VCardProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="max-w-4xl mx-auto">
          {activeTab === 'info' && (
            <>
              <PersonalInfoForm />
              <SocialLinksForm />
            </>
          )}
          
          {activeTab === 'style' && (
            <StyleCustomizer />
          )}
          
          {activeTab === 'preview' && (
            <VCardPreview />
          )}

          <div className="flex justify-between mt-8 mb-4 px-4">
            {activeTab !== 'info' && (
              <button
                onClick={() => setActiveTab(activeTab === 'style' ? 'info' : 'style')}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            {activeTab !== 'preview' && (
              <button
                onClick={() => setActiveTab(activeTab === 'info' ? 'style' : 'preview')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto"
              >
                {activeTab === 'style' ? 'Preview & Export' : 'Next: Customize Style'}
              </button>
            )}
          </div>
        </div>
      </Layout>
    </VCardProvider>
  );
}

export default App;