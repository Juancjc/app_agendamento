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
        // Endpoint de health do Supabase: responde 200 se o servidor está no ar
        // e a chave é válida (o gateway devolve 401 para chave ausente/errada).
        const resposta = await fetch(`${url}/auth/v1/health`, {
            method: "GET",
            headers: {
                apikey: chave,
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
