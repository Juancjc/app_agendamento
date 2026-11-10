import { supabase } from '@/lib/supabase';
import {Icon} from "@expo/ui";
import select = Icon.select;

type AtualizarPefil = {
    nome?: string;
    telefone?: string;
    foto_url?: string;
};

export async function buscarPerfil(id: string) {
    const { data, error } = await supabase
        .from('perfis')
        .select('id, nome, telefone, tipo, foto_url')
        .eq('id', id)
        .maybeSingle();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
export async function atualizarPerfil(id: string, perfil: AtualizarPefil) {
    const { data, error } = await supabase
        .from('perfis')
        .update(perfil)
        .eq('id', id)
        .select('id, nome, telefone, tipo, foto_url')
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}