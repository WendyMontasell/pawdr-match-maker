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
  breed: string;
  age: number;
  location: string;
  picture?: string;
  species: string;
  temperament: string;
  size: string;
}

const Matches = () => {
  const location = useLocation();
  const [matches, setMatches] = useState<Pet[]>([]);

  useEffect(() => {
    // Get matches from location state (from the matching flow)
    if (location.state?.matchedPets) {
      setMatches(location.state.matchedPets);
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
    return pet.species === 'cat' 
      ? '/src/assets/cat-sample.jpg'
      : pet.species === 'dog'
      ? '/src/assets/dog-sample.jpg'
      : '/src/assets/either-sample.jpg';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo size={32} color="#3B82F6" />
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
                        alt={`${pet.name} the ${pet.breed}`}
                        className="w-20 h-20 rounded-xl object-cover"
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
                            {pet.breed} • {pet.age} {pet.age === 1 ? 'year' : 'years'} old
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {pet.temperament}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {pet.size}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        📍 {pet.location}
                      </p>

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