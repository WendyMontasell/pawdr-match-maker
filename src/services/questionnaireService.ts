import { supabase } from '@/integrations/supabase/client';

export interface QuestionnaireResponses {
  q_outdoor_pref: number; // Question 1: Active/outdoorsy (0=home, 1=sometimes, 2=yes)
  q_pets: number; // Question 2: Already have pets (0=none, 1=need time, 2=friendly)
  q_experience_level: number; // Question 3: What hoping for (0=fun, 1=care, 2=personality)
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
    console.log('Finding pets with responses:', responses);
    
    let query = supabase.from('Pets').select('*');
    
    // Filter by species preference
    if (responses.q_preference !== null) {
      console.log('Filtering by species:', responses.q_preference ? 'dogs' : 'cats');
      query = query.eq('species', responses.q_preference);
    } else {
      console.log('No species preference - showing both cats and dogs');
    }
    
    // Filter by energy level based on outdoor preference
    // Index 0: "Yes, I love sports and outdoors life!" - High energy
    // Index 1: "Some times, not all weekends" - Medium energy  
    // Index 2: "My best life is at home" - Low energy
    if (responses.q_outdoor_pref === 0) {
      // Very active - prefer high energy pets
      console.log('Very active user - filtering for high energy pets (>=3)');
      query = query.gte('energy_level', 3);
    } else if (responses.q_outdoor_pref === 1) {
      // Sometimes active - prefer medium energy pets
      console.log('Sometimes active user - filtering for medium energy pets (2-3)');
      query = query.gte('energy_level', 2).lte('energy_level', 3);
    } else if (responses.q_outdoor_pref === 2) {
      // Home person - prefer low energy pets
      console.log('Home person - filtering for low energy pets (<=2)');
      query = query.lte('energy_level', 2);
    }
    
    // Filter by good with pets based on current pets
    // Index 0: "Yes, and they are friendly" - Need good with pets
    // Index 1: "Yes, but they will need some time" - Need very good with pets
    // Index 2: "I don't have any pets" - No restriction
    if (responses.q_pets === 0) {
      // Has friendly pets - need pets that are good with other pets
      console.log('Has friendly pets - filtering for pets good with other pets (>=2)');
      query = query.gte('good_with_pets', 2);
    } else if (responses.q_pets === 1) {
      // Has pets that need time - need pets that are very good with other pets
      console.log('Has pets needing time - filtering for pets very good with other pets (>=3)');
      query = query.gte('good_with_pets', 3);
    } else {
      console.log('No current pets - no pet compatibility restriction');
    }
    
    // Filter by ease of care based on experience level
    // Index 0: "No" (no experience) - prefer easier care pets
    // Index 1: "Yes" (some experience) - can handle medium care
    // Index 2: "Yes, and they had special needs" - can handle any care level
    if (responses.q_experience_level === 0) {
      // No experience - prefer easier care pets
      console.log('No experience - filtering for easier care pets (<=1)');
      query = query.lte('ease_of_care', 1);
    } else if (responses.q_experience_level === 1) {
      // Some experience - can handle medium care
      console.log('Some experience - filtering for medium care pets (<=2)');
      query = query.lte('ease_of_care', 2);
    } else {
      console.log('Special needs experience - no care restriction');
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    console.log(`Found ${data?.length || 0} matching pets:`, data?.map(p => ({ name: p.name, species: p.species, energy_level: p.energy_level, good_with_pets: p.good_with_pets })));
    
    return data || [];
  } catch (error) {
    console.error('Error finding matching pets:', error);
    throw error;
  }
};