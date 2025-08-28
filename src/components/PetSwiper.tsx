import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PetCard, Pet } from '@/components/PetCard';
import { useNavigate } from 'react-router-dom';

interface PetSwiperProps {
  pets: Pet[];
  onPetLiked?: (pet: Pet) => void;
}

const PetSwiper = ({ pets, onPetLiked }: PetSwiperProps) => {
  const navigate = useNavigate();
  const [likedPets, setLikedPets] = useState<string[]>([]);
  const [passedPets, setPassedPets] = useState<string[]>([]);

  const handleLike = (petId: string) => {
    setLikedPets(prev => [...prev, petId]);
    const likedPet = pets.find(pet => pet.id === petId);
    if (likedPet && onPetLiked) {
      onPetLiked(likedPet);
    }
    console.log(`Liked pet: ${petId}`);
  };

  const handlePass = (petId: string) => {
    setPassedPets(prev => [...prev, petId]);
    console.log(`Passed on pet: ${petId}`);
  };

  // Filter out pets that have been liked or passed
  const activePets = pets.filter(
    pet => !likedPets.includes(pet.id) && !passedPets.includes(pet.id)
  );

  const handleViewMatches = () => {
    navigate('/matches');
  };

  if (activePets.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-md">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold">No more pets to show!</h3>
            <p className="text-muted-foreground">
              {likedPets.length > 0 
                ? `You liked ${likedPets.length} pet${likedPets.length > 1 ? 's' : ''}!`
                : 'Try adjusting your preferences to see more pets.'
              }
            </p>
            {likedPets.length > 0 && (
              <Button 
                onClick={handleViewMatches}
                className="w-full"
              >
                See All Matches
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Carousel
        opts={{
          align: "center",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {activePets.map((pet) => (
            <CarouselItem key={pet.id} className="pl-1">
              <div className="p-1">
                <PetCard
                  pet={pet}
                  onLike={handleLike}
                  onPass={handlePass}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export { PetSwiper };