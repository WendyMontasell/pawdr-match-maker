import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, X } from 'lucide-react';
import catImage from '@/assets/cat-sample.jpg';
import dogImage from '@/assets/dog-sample.jpg';

interface Pet {
  id: string;
  name: string;
  description: string;
  species: boolean; // true = dog, false = cat
  energy_level: number;
  good_with_kids: number;
  good_with_pets: number;
}

interface PetCardProps {
  pet: Pet;
  onLike: (petId: string) => void;
  onPass: (petId: string) => void;
}

const PetCard = ({ pet, onLike, onPass }: PetCardProps) => {
  const getEnergyTag = (level: number) => {
    if (level >= 2) return 'Playful';
    if (level === 1) return 'Moderate';
    return 'Calm';
  };

  const getLocationTag = () => {
    return pet.energy_level >= 2 ? 'Outdoors' : 'Indoors';
  };

  const getKidsTag = () => {
    return pet.good_with_kids >= 1 ? 'Kid-friendly' : 'Adults only';
  };

  // Calculate age based on pet (mock data for now)
  const getAge = () => {
    const ages = ['6 months', '12 months', '2 years', '3 years', '5 years'];
    return ages[Math.floor(Math.random() * ages.length)];
  };

  const age = getAge();

  // Mock image - in a real app, this would come from the database
  const imageUrl = pet.species ? dogImage : catImage;

  return (
    <Card className="w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden border">
      {/* Top Action Buttons */}
      <div className="flex justify-between items-center p-4 pb-0">
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg"
        >
          Watch video
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg"
        >
          View profile
        </Button>
      </div>

      {/* Pet Image */}
      <div className="px-4 pt-2">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img 
            src={imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Pet Info */}
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {pet.name}, {age}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {pet.description || `Meet ${pet.name}, a ${pet.species ? 'dog' : 'cat'} looking for their forever home.`}
        </p>
        
        <p className="text-sm text-muted-foreground">
          No allergies or special care needed.
        </p>
      </CardContent>

      {/* Action Buttons */}
      <div className="flex gap-4 p-4 pt-0">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-xl"
          onClick={() => onPass(pet.id)}
        >
          <X className="w-5 h-5 mr-2" />
          Pass
        </Button>
        
        <Button
          size="lg"
          className="flex-1 rounded-xl"
          onClick={() => onLike(pet.id)}
        >
          <Heart className="w-5 h-5 mr-2" />
          Like
        </Button>
      </div>
    </Card>
  );
};

export { PetCard };
export type { Pet };