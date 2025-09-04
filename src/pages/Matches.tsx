import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Logo } from "@/components/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import catSample from "@/assets/cat-sample.jpg";
import dogSample from "@/assets/dog-sample.jpg";
import eitherSample from "@/assets/either-sample.jpg";

interface Pet {
  id: string;
  name: string;
  species: boolean; // true for dog, false for cat
  energy_level: number;
  good_with_kids: number;
  good_with_pets: number;
  ease_of_care: number;
  description: string;
  picture?: string;
}

const Matches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Pet[]>([]);

  useEffect(() => {
    // Get matches from location state (from the matching flow) or from localStorage (liked pets)
    if (location.state?.matchedPets) {
      setMatches(location.state.matchedPets);
    } else {
      // Load liked pets from localStorage
      const savedLikedPets = localStorage.getItem('likedPets');
      if (savedLikedPets) {
        setMatches(JSON.parse(savedLikedPets));
      }
    }
  }, [location.state]);

  const handleViewDetails = (pet: Pet) => {
    navigate(`/pet/${pet.id}`);
  };

  const handleScheduleMeeting = (pet: Pet) => {
    // TODO: Navigate to meeting scheduling page or open modal
    console.log('Schedule meeting for:', pet);
  };

  const getImageSrc = (pet: Pet) => {
    if (pet.picture) {
      return pet.picture;
    }
    // Fallback to species-based images using proper imports
    return pet.species === false 
      ? catSample
      : pet.species === true
      ? dogSample
      : eitherSample;
  };

  const getSpeciesName = (species: boolean) => {
    return species ? 'Dog' : 'Cat';
  };

  const getEnergyLevel = (level: number) => {
    if (level >= 3) return { text: 'High Energy', variant: 'success' as const };
    if (level >= 2) return { text: 'Medium Energy', variant: 'warning' as const };
    return { text: 'Low Energy', variant: 'danger' as const };
  };

  const getCompatibilityLevel = (level: number, type: string) => {
    if (level >= 3) return { text: 'Good', variant: 'success' as const };
    if (level >= 2) return { text: 'Will Take Time', variant: 'warning' as const };
    return { text: 'Bad', variant: 'danger' as const };
  };

  const hasSpecialNeeds = (easeOfCare: number) => {
    return easeOfCare >= 3;
  };

  const getRandomAge = (petId: string) => {
    // Generate a consistent age based on pet ID to avoid re-renders
    const seed = petId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (seed % 8) + 1;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo size={32} color="#FF4F7B" />
          <h1 className="text-xl font-semibold">Your Matches</h1>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="container px-4 py-6">
        {matches.length === 0 ? (
          <Card className="shadow-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-lg font-medium mb-2">No matches yet</h2>
              <p className="text-sm text-muted-foreground">
                Complete the questionnaire to find your perfect pet matches!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-medium">
                {matches.length} Perfect {matches.length === 1 ? 'Match' : 'Matches'}
              </h2>
              <p className="text-sm text-muted-foreground">
                These pets are looking for their forever home
              </p>
            </div>

            {matches.map((pet) => (
              <Card key={pet.id} className="shadow-md">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    {/* Pet Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={getImageSrc(pet)}
                        alt={`${pet.name} the ${getSpeciesName(pet.species)}`}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>

                    {/* Pet Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <h3 className="text-base font-medium text-foreground leading-tight">
                          {pet.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {getSpeciesName(pet.species)} • {getRandomAge(pet.id)} years old
                        </p>
                      </div>

                      {/* Pet Description */}
                      <p className="text-xs text-foreground line-clamp-2 leading-relaxed">
                        {pet.description}
                      </p>

                      {/* Pet Characteristics */}
                      <div className="flex flex-wrap gap-1">
                        <Badge variant={getEnergyLevel(pet.energy_level).variant} className="text-xs py-0 px-2 h-5">
                          {getEnergyLevel(pet.energy_level).text}
                        </Badge>
                        <Badge variant={getCompatibilityLevel(pet.good_with_kids, 'Kids').variant} className="text-xs py-0 px-2 h-5">
                          Kids: {getCompatibilityLevel(pet.good_with_kids, 'Kids').text}
                        </Badge>
                        <Badge variant={getCompatibilityLevel(pet.good_with_pets, 'Pets').variant} className="text-xs py-0 px-2 h-5">
                          Pets: {getCompatibilityLevel(pet.good_with_pets, 'Pets').text}
                        </Badge>
                        {hasSpecialNeeds(pet.ease_of_care) && (
                          <Badge variant="danger" className="text-xs py-0 px-2 h-5">
                            Special Needs
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1.5 pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 h-8 text-xs"
                          onClick={() => handleViewDetails(pet)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs"
                          onClick={() => handleScheduleMeeting(pet)}
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          Meet
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Matches;