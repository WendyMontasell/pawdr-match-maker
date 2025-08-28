import { Logo } from '@/components/Logo';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { saveQuestionnaireResponse } from '@/services/questionnaireService';
import dogSample from '@/assets/dog-sample.jpg';
import catSample from '@/assets/cat-sample.jpg';
import eitherSample from '@/assets/either-sample.jpg';

const questions = [
  {
    id: 1,
    title: "Do you consider yourself an active and outdoorsy person?",
    options: [
      "Yes, I love sports and outdoors life!",
      "Some times, not all weekends",
      "My best life is at home"
    ]
  },
  {
    id: 2,
    title: "Do you already have pets?",
    options: [
      "Yes, and they are friendly",
      "Yes, but they will need some time",
      "I don't have any pets"
    ]
  },
  {
    id: 3,
    title: "Have you had pets before?",
    options: [
      "No",
      "Yes",
      "Yes, and they had special needs"
    ]
  },
  {
    id: 4,
    title: "Are you hoping for a cat or a dog?",
    options: [
      { text: "Cat", image: catSample },
      { text: "Dog", image: dogSample },
      { text: "Either", image: eitherSample }
    ]
  }
];

const QuestionnaireStep = () => {
  const navigate = useNavigate();
  const { step } = useParams<{ step: string }>();
  const currentStep = parseInt(step || '1');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const { responses, updateResponse, isComplete } = useQuestionnaire();
  
  // Validate step and redirect if invalid
  if (isNaN(currentStep) || currentStep < 1 || currentStep > questions.length) {
    navigate('/questionnaire/1');
    return null;
  }
  
  const question = questions[currentStep - 1];
  
  // Additional safety check for question existence
  if (!question) {
    navigate('/questionnaire/1');
    return null;
  }
  
  const isLastStep = currentStep === questions.length;
  
  const handleNext = async () => {
    if (selectedOption === null) return;
    
    // Update the response for this question
    updateResponse(currentStep, selectedOption);
    
    if (isLastStep) {
      // Save all responses to database and navigate to matching
      try {
        const finalResponses = { ...responses };
        // Apply the final answer
        switch (currentStep) {
          case 1:
            finalResponses.q_outdoor_pref = selectedOption;
            break;
          case 2:
            finalResponses.q_pets = selectedOption;
            break;
          case 3:
            finalResponses.q_experience_level = selectedOption;
            break;
          case 4:
            finalResponses.q_preference = selectedOption === 0 ? false : selectedOption === 1 ? true : null;
            break;
        }
        
        await saveQuestionnaireResponse(finalResponses);
        navigate('/matching', { state: { responses: finalResponses } });
      } catch (error) {
        console.error('Error saving responses:', error);
        // Still navigate, but without saving
        navigate('/matching');
      }
    } else {
      navigate(`/questionnaire/${currentStep + 1}`);
    }
  };

  const isImageQuestion = currentStep === 4;

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center space-y-6 pt-8 pb-8">
          <Logo size={32} color="#FF4F7B" />
          <div className="space-y-3">
            <h3 className="text-base font-medium text-muted-foreground">
              Questionnaire
            </h3>
            <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="flex-1 shadow-md">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Question */}
            <div className="flex-1 space-y-8">
              <h2 className="text-xl font-semibold text-foreground text-center leading-relaxed">
                {question.title}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  
                  if (isImageQuestion && typeof option === 'object') {
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedOption(index)}
                        className={`w-full p-4 rounded-xl border transition-all duration-200 ${
                          isSelected 
                            ? 'border-primary bg-accent shadow-md' 
                            : 'border-input bg-card hover:bg-accent hover:border-primary shadow-sm'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-20 h-20 rounded-xl overflow-hidden">
                            <img 
                              src={option.image} 
                              alt={option.text}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-foreground">
                            {option.text}
                          </span>
                        </div>
                      </button>
                    );
                  }

                  return (
                    <Button
                      key={index}
                      variant="option"
                      onClick={() => setSelectedOption(index)}
                      className={`w-full ${
                        isSelected 
                          ? 'border-primary bg-accent shadow-md' 
                          : ''
                      }`}
                    >
                      {option as string}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="space-y-4 pt-6">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleNext}
                disabled={selectedOption === null}
              >
                {isLastStep ? 'See candidates →' : 'Next question →'}
              </Button>
              
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground text-sm"
                  onClick={() => navigate('/onboarding')}
                >
                  Save and finish later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionnaireStep;
