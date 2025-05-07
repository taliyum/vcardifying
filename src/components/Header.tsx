import React from 'react';
import { Square as VCardSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <VCardSquare size={32} className="text-white" />
            <h1 className="text-2xl font-bold">VCardify</h1>
          </div>
          <div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-2 rounded-md"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="mt-2 text-blue-100 max-w-xl">
          Create and share your professional digital business card in minutes.
        </p>
      </div>
    </header>
  );
};

export default Header;