import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Heart, MapPin } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import catSample from "@/assets/cat-sample.jpg";
import dogSample from "@/assets/dog-sample.jpg";
import eitherSample from "@/assets/either-sample.jpg";

interface Pet {
  id: string;
  name: string;
  species: boolean;
  energy_level: number;
  good_with_kids: number;
  good_with_pets: number;
  ease_of_care: number;
  description: string;
  long_description?: string;
  picture?: string;
  age?: number;
}

const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('Pets')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching pet:', error);
          toast({
            title: "Error",
            description: "Failed to load pet details",
            variant: "destructive",
          });
          return;
        }

        setPet(data);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to load pet details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id, toast]);

  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting Request",
      description: "Your meeting request has been sent! We'll contact you soon.",
    });
  };

  const getImageSrc = (pet: Pet) => {
    if (pet.picture) {
      return pet.picture;
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-lg font-medium mb-2">Pet not found</h2>
            <p className="text-sm text-muted-foreground mb-4">
              The pet you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="hover-scale"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">{pet.name}</h1>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container px-4 py-6 space-y-6">
        {/* Image Carousel */}
        <Card className="overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3].map((_, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square md:aspect-[4/3] relative">
                    <img
                      src={getImageSrc(pet)}
                      alt={`${pet.name} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </Card>

        {/* Pet Info Card */}
        <Card>
          <CardContent className="p-6 space-y-4">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{pet.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>{getSpeciesName(pet.species)}</span>
                <span>•</span>
                <span>{pet.age || getRandomAge(pet.id)} years old</span>
                <span>•</span>
                <MapPin className="h-4 w-4" />
                <span>Local Shelter</span>
              </div>
            </div>

            {/* Characteristics */}
            <div className="flex flex-wrap gap-2">
              <Badge variant={getEnergyLevel(pet.energy_level).variant}>
                {getEnergyLevel(pet.energy_level).text}
              </Badge>
              <Badge variant={getCompatibilityLevel(pet.good_with_kids, 'Kids').variant}>
                Kids: {getCompatibilityLevel(pet.good_with_kids, 'Kids').text}
              </Badge>
              <Badge variant={getCompatibilityLevel(pet.good_with_pets, 'Pets').variant}>
                Pets: {getCompatibilityLevel(pet.good_with_pets, 'Pets').text}
              </Badge>
              {hasSpecialNeeds(pet.ease_of_care) && (
                <Badge variant="danger">
                  Special Needs
                </Badge>
              )}
            </div>

            {/* Short Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About {pet.name}</h3>
              <p className="text-foreground leading-relaxed">
                {pet.description}
              </p>
            </div>

            {/* Long Description */}
            {pet.long_description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">More Details</h3>
                <p className="text-foreground leading-relaxed">
                  {pet.long_description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center space-y-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Ready to meet {pet.name}?
              </h3>
              <p className="text-sm text-muted-foreground">
                Schedule a meeting to spend time with {pet.name} and see if you're a perfect match!
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="w-full hover-scale"
              onClick={handleScheduleMeeting}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Meeting
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PetDetails;