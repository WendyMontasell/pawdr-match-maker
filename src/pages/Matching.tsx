import { PawdrLogo } from '@/components/PawdrLogo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Matching = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto text-center space-y-8">
        {/* Logo with animation */}
        <div className="animate-pulse">
          <PawdrLogo size="lg" />
        </div>
        
        {/* Loading message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Finding your perfect match...
          </h2>
          
          {/* Loading dots animation */}
          <div className="flex justify-center items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;