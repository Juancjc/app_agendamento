import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform  } from "react-native";
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const chave = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !chave) {
  throw new Error("Variáveis de ambiente do Supabase não estão definidas.");
}
export const supabase = createClient(url, chave, {
  auth: {
    ...Platform.OS !== "web" ? { storage: AsyncStorage } : {},
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});