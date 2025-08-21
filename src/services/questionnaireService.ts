import { supabase } from '@/integrations/supabase/client';

export interface QuestionnaireResponses {
  q_outdoor_pref: number; // Question 1: Active/outdoorsy (0=home, 1=sometimes, 2=yes)
  q_pets: number; // Question 2: Already have pets (0=none, 1=need time, 2=friendly)
  q_experience_level: number; // Question 3: What hoping for (0=personality, 1=care, 2=fun)
  q_preference: boolean | null; // Question 4: Cat/Dog preference (false=cat, true=dog, null=either)
}

export const saveQuestionnaireResponse = async (responses: QuestionnaireResponses) => {
  try {
    const { data, error } = await supabase
      .from('adopter_response')
      .insert([responses])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving questionnaire response:', error);
    throw error;
  }
};

export const findMatchingPets = async (responses: QuestionnaireResponses) => {
  try {
    let query = supabase.from('Pets').select('*');
    
    // Filter by species preference
    if (responses.q_preference !== null) {
      query = query.eq('species', responses.q_preference);
    }
    
    // Filter by energy level based on outdoor preference
    if (responses.q_outdoor_pref === 2) {
      // Very active - prefer high energy pets
      query = query.gte('energy_level', 2);
    } else if (responses.q_outdoor_pref === 0) {
      // Home person - prefer low energy pets
      query = query.lte('energy_level', 1);
    }
    
    // Filter by good with pets if they already have pets
    if (responses.q_pets > 0) {
      query = query.gte('good_with_pets', 1);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error finding matching pets:', error);
    throw error;
  }
};