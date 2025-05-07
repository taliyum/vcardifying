import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { TabType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 sm:mb-8 bg-white rounded-lg shadow p-4">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === 'info'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Personal Info
            </button>
            <button
              className={`px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === 'style'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('style')}
            >
              Customize Style
            </button>
            <button
              className={`px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview & Export
            </button>
          </nav>
        </div>
        
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;