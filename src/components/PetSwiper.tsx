import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PetCard, Pet } from '@/components/PetCard';

interface PetSwiperProps {
  pets: Pet[];
}

const PetSwiper = ({ pets }: PetSwiperProps) => {
  const [likedPets, setLikedPets] = useState<string[]>([]);
  const [passedPets, setPassedPets] = useState<string[]>([]);

  const handleLike = (petId: string) => {
    setLikedPets(prev => [...prev, petId]);
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

  if (activePets.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No more pets to show!</h3>
        <p className="text-muted-foreground">
          {likedPets.length > 0 
            ? `You liked ${likedPets.length} pet${likedPets.length > 1 ? 's' : ''}!`
            : 'Try adjusting your preferences to see more pets.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
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