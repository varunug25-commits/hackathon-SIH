import { supabase } from '../config/supabase';

export const getActiveServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('id, name, description, icon_name')
    .eq('is_active', true)
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch services: ${error.message}`);
  }

  return data;
};

export const getServiceByName = async (name: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('id, name')
    .eq('name', name)
    .eq('is_active', true)
    .single();

  if (error) {
    return null;
  }

  return data;
};
