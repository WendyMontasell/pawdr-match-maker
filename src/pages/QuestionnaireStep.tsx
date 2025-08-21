import { PawdrLogo } from '@/components/PawdrLogo';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
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
    title: "What are you hoping for in your new companion?",
    options: [
      "Fun, adventures and play",
      "Taking care of it and enjoying its company",
      "Knowing their personality"
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
  
  const question = questions[currentStep - 1];
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
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center space-y-6 pt-8 pb-12">
          <PawdrLogo size="sm" />
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-muted-foreground">
              Questionnaire
            </h3>
            <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
          </div>
        </div>

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
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-option-selected' 
                        : 'border-option-border bg-background hover:bg-option-selected hover:border-primary'
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
                      ? 'border-primary bg-option-selected' 
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
        <div className="space-y-4 pt-8">
          <Button 
            size="lg" 
            className="w-full h-14"
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            {isLastStep ? 'See candidates →' : 'Next question →'}
          </Button>
          
          <div className="text-center">
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              onClick={() => navigate('/onboarding')}
            >
              Save and finish later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireStep;