import { supabase } from '@/lib/supabase';

export async function entrar(email: string, senha: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
export async function cadastrar(nome: string, email: string, senha: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: {
            data: {
                nome,
            },
        },
    });
    if (error) {
        throw new Error(error.message);
    }

    return data;
}
export async function sair() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}