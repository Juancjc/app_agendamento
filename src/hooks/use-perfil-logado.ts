import { useEffect, useState } from 'react';

import { usuarioLogado } from '@/services/auth.service';
import { buscarPerfil, type Perfil } from '@/services/perfis.service';

// Busca na tabela "perfis" os dados de quem está logado.
// perfil fica null se ninguém estiver logado.
export function usePerfilLogado() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const usuario = await usuarioLogado();
        if (!usuario) {
          return; // ninguém logado: perfil continua null
        }

        // Se a conta ainda não tem linha em perfis (ex.: criada antes do trigger),
        // usamos o nome que foi salvo no cadastro (options.data da função cadastrar)
        const dados = (await buscarPerfil(usuario.id)) ?? {
          id: usuario.id,
          nome: usuario.user_metadata.nome ?? null,
          telefone: null,
          tipo: null,
          foto_url: null,
        };
        if (ativo) {
          setPerfil(dados);
        }
      } catch {
        // Sem conexão: a tela continua funcionando, só sem os dados do perfil
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    // Se a tela fechar antes da resposta chegar, a resposta é ignorada
    return () => {
      ativo = false;
    };
  }, []);

  return { perfil, carregando };
}
