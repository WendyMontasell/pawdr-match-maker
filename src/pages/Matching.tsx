import { Logo } from '@/components/Logo';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { findMatchingPets } from '@/services/questionnaireService';
import { Card, CardContent } from '@/components/ui/card';

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
          
          // Navigate after finding matches
          setTimeout(() => {
            navigate('/dashboard', { state: { matchedPets: pets } });
          }, 2000);
        }
      } catch (error) {
        console.error('Error finding matches:', error);
        // Navigate even on error
        setTimeout(() => {
          navigate('/dashboard', { state: { matchedPets: [] } });
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    findMatches();
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-md">
          <CardContent className="p-8 text-center space-y-8">
            {/* Logo with animation */}
            <div className="animate-pulse">
              <Logo size={96} color="#FF4F7B" />
            </div>
            
            {/* Loading message */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {isLoading ? 'Finding your perfect match...' : `Found ${matchingPets.length} perfect matches!`}
              </h2>
              
              <p className="text-muted-foreground">
                {isLoading 
                  ? 'We\'re analyzing your preferences to find the best pet companions for you.'
                  : 'Get ready to meet your new best friend!'
                }
              </p>
              
              {/* Circular loading animation */}
              {isLoading && (
                <div className="flex justify-center pt-4">
                  <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Matching;