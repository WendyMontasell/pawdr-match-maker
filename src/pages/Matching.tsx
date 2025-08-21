import { PawdrLogo } from '@/components/PawdrLogo';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { findMatchingPets } from '@/services/questionnaireService';

const Matching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [matchingPets, setMatchingPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const findMatches = async () => {
      try {
        const responses = location.state?.responses;
        if (responses) {
          const pets = await findMatchingPets(responses);
          setMatchingPets(pets);
        }
      } catch (error) {
        console.error('Error finding matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    findMatches();
    
    const timer = setTimeout(() => {
      navigate('/', { state: { matchedPets: matchingPets } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, location.state, matchingPets]);

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
            {isLoading ? 'Finding your perfect match...' : `Found ${matchingPets.length} perfect matches!`}
          </h2>
          
          {/* Loading dots animation */}
          {isLoading && (
            <div className="flex justify-center items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matching;