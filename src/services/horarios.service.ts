import { supabase } from '@/lib/supabase';

export async function criarHorario(especialistaId: string, diaSemana: number, horaInicio: string, horaFim: string) {
    const { data, error } = await supabase
        .from('horarios')
        .insert({
            especialista_id: especialistaId,
            dia_semana: diaSemana,
            hora_inicio: horaInicio,
            hora_fim: horaFim,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function atualizarHorario(id: string, diaSemana: number, horaInicio: string, horaFim: string) {
    const { data, error } = await supabase
        .from('horarios')
        .update({
            dia_semana: diaSemana,
            hora_inicio: horaInicio,
            hora_fim: horaFim,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return data;
}
export async function deletarHorario(id: string) {
    const { data, error } = await supabase
        .from('horarios')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return data;
}
export async function listarHorarios(especialistaId: string) {
    const { data, error } = await supabase
        .from('horarios')
        .select('id, especialista_id, dia_semana, hora_inicio, hora_fim')
        .eq('especialista_id', especialistaId)
        .order('hora_inicio');

    if (error) throw error;

    return data;
}