import React from 'react';

export const Footer: React.FC<{ theme: string }> = ({ theme }) => {
  return (
    <footer className="bg-navbar border-t border-border py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img 
            src={`${theme === 'dark' || theme === 'unique' ? '/white_logo_transparent.png' : '/cleaned_logo.png'}?t=${Date.now()}`} 
            alt="LexAI Logo" 
            className="w-8 h-8 rounded-lg" 
          />
            <span className="text-lg font-semibold">Koma</span>
          </div>
          <div className="text-sm text-muted">
            © 2025 Koma. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
