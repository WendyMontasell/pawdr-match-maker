import { Logo } from '@/components/Logo';
import { PetSwiper } from '@/components/PetSwiper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pet } from '@/components/PetCard';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [likedPets, setLikedPets] = useState<Pet[]>([]);

  useEffect(() => {
    const matchedPets = location.state?.matchedPets || [];
    setPets(matchedPets);
    // Load liked pets from localStorage
    const savedLikedPets = localStorage.getItem('likedPets');
    if (savedLikedPets) {
      setLikedPets(JSON.parse(savedLikedPets));
    }
  }, [location.state]);

  const handlePetLiked = (pet: Pet) => {
    const updatedLikedPets = [...likedPets, pet];
    setLikedPets(updatedLikedPets);
    // Save to localStorage
    localStorage.setItem('likedPets', JSON.stringify(updatedLikedPets));
  };

  const handleStartOver = () => {
    navigate('/');
  };

  const handleGetStarted = () => {
    navigate('/onboarding-intro');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo size={32} color="#FF4F7B" />
          <Button variant="outline" size="sm" onClick={handleStartOver}>
            Start Over
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        {pets.length > 0 ? (
          <div className="space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Meet Your Matches!</h1>
              <p className="text-muted-foreground">
                Swipe through your personalized pet recommendations
              </p>
            </div>

            {/* Pet Swiper */}
            <PetSwiper pets={pets} onPetLiked={handlePetLiked} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            {/* Logo */}
            <div className="text-center space-y-4">
              <Logo size={80} color="#FF4F7B" />
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Welcome to Pawdr!</h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Find your perfect furry companion through our personalized matching system
                </p>
              </div>
            </div>

            {/* CTA Card */}
            <Card className="w-full max-w-md shadow-md">
              <CardContent className="p-6 text-center space-y-4">
                <h2 className="text-xl font-semibold">Ready to find your match?</h2>
                <p className="text-muted-foreground">
                  Take our quick questionnaire to get personalized pet recommendations
                </p>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleGetStarted}
                >
                  Find My Match
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {pets.length > 0 && <BottomNavigation />}
    </div>
  );
};

export default Index;