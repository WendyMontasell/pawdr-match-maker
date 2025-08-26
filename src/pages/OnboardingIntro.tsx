import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import catSample from '@/assets/cat-sample.jpg';
import dogSample from '@/assets/dog-sample.jpg';
import eitherSample from '@/assets/either-sample.jpg';

const OnboardingIntro = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/questionnaire/1');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-md">
          <CardContent className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-6">
              <Logo size={64} color="#FF4F7B" />
              
              <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Let's get to know you!</h1>
                <p className="text-muted-foreground leading-relaxed">
                  We'll show you some photos to help us understand your preferences. 
                  This helps us find the perfect pet match for you.
                </p>
              </div>
            </div>
            
            {/* Profile Photos */}
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img 
                  src={catSample} 
                  alt="Cat sample" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img 
                  src={dogSample} 
                  alt="Dog sample" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img 
                  src={eitherSample} 
                  alt="Both pets sample" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingIntro;