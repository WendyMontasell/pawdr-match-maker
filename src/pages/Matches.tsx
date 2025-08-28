import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Logo } from "@/components/Logo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
    // TODO: Navigate to pet details page or open modal
    console.log('View details for:', pet);
  };

  const handleScheduleMeeting = (pet: Pet) => {
    // TODO: Navigate to meeting scheduling page or open modal
    console.log('Schedule meeting for:', pet);
  };

  const getImageSrc = (pet: Pet) => {
    if (pet.picture) {
      return pet.picture;
    }
    // Fallback to species-based images
    return pet.species === false 
      ? '/src/assets/cat-sample.jpg'
      : pet.species === true
      ? '/src/assets/dog-sample.jpg'
      : '/src/assets/either-sample.jpg';
  };

  const getSpeciesName = (species: boolean) => {
    return species ? 'Dog' : 'Cat';
  };

  const getEnergyLevel = (level: number) => {
    if (level >= 3) return 'High Energy';
    if (level >= 2) return 'Medium Energy';
    return 'Low Energy';
  };

  const hasSpecialNeeds = (easeOfCare: number) => {
    return easeOfCare >= 3;
  };

  const getRandomAge = () => {
    // Generate a random age between 1-8 years for display purposes
    return Math.floor(Math.random() * 8) + 1;
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
                <CardContent className="p-0">
                   <div className="flex gap-4 p-4">
                     {/* Pet Image */}
                     <div className="flex-shrink-0">
                       <img
                         src={getImageSrc(pet)}
                         alt={`${pet.name} the ${getSpeciesName(pet.species)}`}
                         className="w-24 h-24 rounded-xl object-cover"
                       />
                     </div>

                     {/* Pet Info */}
                     <div className="flex-1 min-w-0">
                       <div className="flex items-start justify-between mb-2">
                         <div>
                           <h3 className="text-lg font-medium text-foreground">
                             {pet.name}
                           </h3>
                           <p className="text-sm text-muted-foreground">
                             {getSpeciesName(pet.species)} • {getRandomAge()} years old
                           </p>
                         </div>
                       </div>

                       {/* Pet Description */}
                       <p className="text-sm text-foreground mb-3 line-clamp-2">
                         {pet.description}
                       </p>

                       {/* Pet Characteristics */}
                       <div className="flex flex-wrap gap-1 mb-3">
                         <Badge variant="secondary" className="text-xs">
                           {getEnergyLevel(pet.energy_level)}
                         </Badge>
                         <Badge variant="secondary" className="text-xs">
                           Good with kids: {pet.good_with_kids}/3
                         </Badge>
                         <Badge variant="secondary" className="text-xs">
                           Good with pets: {pet.good_with_pets}/3
                         </Badge>
                         {hasSpecialNeeds(pet.ease_of_care) && (
                           <Badge variant="destructive" className="text-xs">
                             Special Needs
                           </Badge>
                         )}
                       </div>

                       {/* Action Buttons */}
                       <div className="flex gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           className="flex-1"
                           onClick={() => handleViewDetails(pet)}
                         >
                           <Eye className="w-4 h-4 mr-2" />
                           View Details
                         </Button>
                         <Button
                           size="sm"
                           className="flex-1"
                           onClick={() => handleScheduleMeeting(pet)}
                         >
                           <Calendar className="w-4 h-4 mr-2" />
                           Schedule Meeting
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