export type SaudeSupabase = {
    ok: boolean;
    mensagem: string;
};
export async function verificarSupabase(): Promise<SaudeSupabase> {
    const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const chave = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !chave) {
        return {
            ok: false,
            mensagem: "Variáveis de ambiente do Supabase não estão definidas.",
        };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 5000);
    try {
        const resposta = await fetch(`${url}/rest/v1/saude`, {
            method: "GET",
            headers: {
                apikey: chave,
                Authorization: `Bearer ${chave}`,
            },
            signal: controller.signal,
        });
        return {
            ok: resposta.ok,
            mensagem: resposta.ok
                ? "Conexão com o Supabase verificada."
                : `Erro ao verificar o Supabase (HTTP ${resposta.status}).`,
        };
    } catch {
        return {
            ok: false,
            mensagem: "Erro ao verificar a conexão com o Supabase.",
        };
    } finally {
        clearTimeout(timeout);
    }
}
