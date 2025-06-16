import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface LoadingFallbackProps {
  timeout?: number;
  onRetry?: () => void;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  timeout = 15000, 
  onRetry = () => window.location.reload() 
}) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (!showFallback) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mb-4"></div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-yellow-500"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Algo não está funcionando corretamente</h3>
      <p className="text-gray-600 mb-6">
        O carregamento está demorando mais do que o esperado. Pode haver um problema de conexão ou com o servidor.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
        >
          Voltar
        </Button>
        <Button 
          onClick={onRetry}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}; 