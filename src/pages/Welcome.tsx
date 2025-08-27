import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    navigate('/onboarding-intro');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-md">
          <CardContent className="p-8 text-center space-y-6">
            {/* Logo */}
            <Logo size={96} color="#FF4F7B" />
            
            {/* Main Content */}
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">Welcome to Pawdr!</h1>
              <p className="text-muted-foreground leading-relaxed">
                Find your perfect pet companion through our smart matching system. 
                Answer a few questions and discover pets that fit your lifestyle.
              </p>
            </div>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;