import { useState } from 'react';
import { QuestionnaireResponses } from '@/services/questionnaireService';

export const useQuestionnaire = () => {
  const [responses, setResponses] = useState<Partial<QuestionnaireResponses>>({});
  
  const updateResponse = (questionNumber: number, answerIndex: number) => {
    setResponses(prev => {
      const updated = { ...prev };
      
      switch (questionNumber) {
        case 1:
          updated.q_outdoor_pref = answerIndex;
          break;
        case 2:
          updated.q_pets = answerIndex;
          break;
        case 3:
          updated.q_experience_level = answerIndex;
          break;
        case 4:
          // Map answer index to boolean/null for species preference
          updated.q_preference = answerIndex === 0 ? false : answerIndex === 1 ? true : null;
          break;
      }
      
      return updated;
    });
  };
  
  const isComplete = () => {
    return responses.q_outdoor_pref !== undefined &&
           responses.q_pets !== undefined &&
           responses.q_experience_level !== undefined &&
           responses.q_preference !== undefined;
  };
  
  return {
    responses: responses as QuestionnaireResponses,
    updateResponse,
    isComplete
  };
};