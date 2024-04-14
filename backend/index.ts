import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export const imagesBucket = `https://abvqxpfoyfcigbgrggeq.supabase.co/storage/v1/object/public/images/`;

export { supabase };
