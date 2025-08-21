import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    <Card className="w-full max-w-sm mx-auto bg-card rounded-2xl overflow-hidden border-0 shadow-lg">
      {/* Tags */}
      <div className="flex gap-2 p-4 pb-0">
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
          {getLocationTag()}
        </Badge>
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
          {getEnergyTag(pet.energy_level)}
        </Badge>
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
          {getKidsTag()}
        </Badge>
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
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold text-foreground">
          {pet.name}, {age}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {pet.description || `Meet ${pet.name}, a ${pet.species ? 'dog' : 'cat'} looking for their forever home.`}
        </p>
        
        <p className="text-sm text-muted-foreground">
          No allergies or special care needed.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center p-4 pt-0">
        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full border-2 border-muted-foreground/20 bg-muted/50 hover:bg-destructive/10 hover:border-destructive/30"
          onClick={() => onPass(pet.id)}
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </Button>
        
        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-pink-500 hover:bg-pink-600"
          onClick={() => onLike(pet.id)}
        >
          <Heart className="w-6 h-6 text-white fill-white" />
        </Button>
      </div>
    </Card>
  );
};

export { PetCard };
export type { Pet };