import { Logo } from '@/components/Logo';
import { PetSwiper } from '@/components/PetSwiper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pet } from '@/components/PetCard';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const matchedPets = location.state?.matchedPets || [];
    setPets(matchedPets);
  }, [location.state]);

  const handleStartOver = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="w-full max-w-md mx-auto pb-6">
        <Card className="shadow-md">
          <CardContent className="p-4 flex items-center justify-between">
            <Logo size={24} color="#FF4F7B" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStartOver}
            >
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        {pets.length > 0 ? (
          <div className="w-full">
            <div className="text-center mb-6">
              <Card className="max-w-md mx-auto shadow-md">
                <CardContent className="p-6">
                  <h1 className="text-xl font-semibold mb-2">Meet Your Matches!</h1>
                  <p className="text-sm text-muted-foreground">
                    Swipe through pets that match your preferences.
                  </p>
                </CardContent>
              </Card>
            </div>
            <PetSwiper pets={pets} />
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-md">
              <CardContent className="p-8 text-center space-y-6">
                <Logo size={64} color="#FF4F7B" />
                <div className="space-y-4">
                  <h1 className="text-2xl font-semibold">Welcome to Pawdr!</h1>
                  <p className="text-muted-foreground">
                    Start your journey to find the perfect pet companion.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleStartOver}
                >
                  Find My Match
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;