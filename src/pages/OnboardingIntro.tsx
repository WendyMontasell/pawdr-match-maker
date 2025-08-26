import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OnboardingIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto text-center space-y-8">
        {/* Logo */}
        <Logo size={64} color="#FF4F7B" />
        
        {/* Profile Photos */}
        <div className="relative flex justify-center items-center h-32">
          <div className="absolute left-8">
            <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-2xl">👩</span>
              </div>
            </div>
          </div>
          <div className="absolute right-8">
            <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200">
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <span className="text-2xl">🐕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome!
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We'll start by asking you some questions about your lifestyle and preferences to match you with the right candidates.
          </p>
          <p className="text-sm text-muted-foreground">
            This will take about 8 minutes.
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-4 pt-4">
          <p className="text-foreground font-medium">
            Ready when you are!
          </p>
          <Button 
            size="lg" 
            className="w-full h-14"
            onClick={() => navigate('/questionnaire/1')}
          >
            Let's go!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingIntro;