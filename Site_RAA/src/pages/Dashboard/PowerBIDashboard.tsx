import React, { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { Loader2 } from 'lucide-react';
import { powerBiService } from '../../services/powerBiService';
import { useLocation } from 'react-router-dom';

export default function PowerBIDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  // Production Power BI report URL
  const reportUrl = "https://app.powerbi.com/view?r=eyJrIjoiMGM5OGU5OGQtM2Y5My00Mjk0LTgxZTgtMDhkOTQ4OTE3ZmU3IiwidCI6IjQ4NGQ5ZGM1LWVjNTMtNGI3OS1iZTZhLTM5MGFjZmU2ZDlhMiJ9";

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-theme(spacing.16))] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-theme(spacing.16))] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-theme(spacing.16))]">
      <iframe
        title="Rio Amambai Dashboard"
        width="100%"
        height="100%"
        src={reportUrl}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}