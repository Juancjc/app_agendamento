import { supabase } from '@/lib/supabase';

// Um perfil, no mesmo formato da tabela "perfis" do banco
export type Perfil = {
    id: string;
    nome: string | null;
    telefone: string | null;
    tipo: string | null;
    foto_url: string | null;
};

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
    return data as Perfil | null;
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
    return data as Perfil;
}
