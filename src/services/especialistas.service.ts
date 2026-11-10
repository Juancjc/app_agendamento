import { supabase } from '@/lib/supabase';

const campos = `
  id,
  profissao,
  especialidade,
  clinica,
  endereco,
  latitude,
  longitude,
  valor,
  perfil:perfis!perfil_id(nome, foto_url)
`;

export async function listarEspecialistas() {
    const { data, error } = await supabase
        .from('especialistas')
        .select(campos)
        .order('profissao')
        .limit(20);

    if (error) throw error;

    return data;
}

export async function buscarEspecialista(id: string) {
    const { data, error } = await supabase
        .from('especialistas')
        .select(campos)
        .eq('id', id)
        .single();

    if (error) throw error;

    return data;
}