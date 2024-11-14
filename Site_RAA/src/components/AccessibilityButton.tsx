import React, { useState } from 'react';
import { Settings } from 'lucide-react';

export const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState('normal');

  const adjustFontSize = (increment) => {
    setFontSize((prev) => Math.min(Math.max(prev + increment, 80), 150));
    document.documentElement.style.fontSize = `${fontSize}%`;
  };

  const toggleContrast = () => {
    const newContrast = contrast === 'normal' ? 'high' : 'normal';
    setContrast(newContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
        aria-label="Acessibilidade"
      >
        <Settings className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64">
          <h3 className="text-lg font-semibold mb-4">Acessibilidade</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tamanho da Fonte</label>
              <div className="flex gap-2">
                <button
                  onClick={() => adjustFontSize(-10)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  A-
                </button>
                <button
                  onClick={() => adjustFontSize(10)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  A+
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contraste</label>
              <button
                onClick={toggleContrast}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 w-full"
              >
                {contrast === 'normal' ? 'Alto Contraste' : 'Contraste Normal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityButton;
