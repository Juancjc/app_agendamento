import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CampoTexto } from '@/components/campo-texto';
import { Cores } from '@/constants/cores';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { entrar, usuarioLogado } from '@/services/auth.service';

// Um erro (opcional) para cada campo do formulário
type Erros = {
  email?: string;
  senha?: string;
};

// texto@texto.texto (validação simples, o Supabase valida de novo no servidor)
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Função pura: no login só conferimos se os campos foram preenchidos direito
function validar(email: string, senha: string): Erros {
  const erros: Erros = {};

  if (!REGEX_EMAIL.test(email.trim())) {
    erros.email = 'Informe um e-mail válido.';
  }
  if (senha.length === 0) {
    erros.senha = 'Informe sua senha.';
  }

  return erros;
}

// O Supabase devolve as mensagens em inglês: traduzimos as mais comuns
function traduzirErro(mensagem: string) {
  const texto = mensagem.toLowerCase();

  if (texto.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos.';
  }
  if (texto.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar. O link está na sua caixa de entrada.';
  }
  if (texto.includes('rate limit')) {
    return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.';
  }
  if (texto.includes('network') || texto.includes('fetch')) {
    return 'Sem conexão com a internet.';
  }
  return 'Não foi possível entrar. Tente novamente.';
}

export default function LoginScreen() {
  // Valores digitados
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estado da tela
  const [erros, setErros] = useState<Erros>({});
  const [erroGeral, setErroGeral] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Se já existe uma sessão salva no aparelho, pula o login
  useEffect(() => {
    usuarioLogado().then((usuario) => {
      if (usuario) {
        router.replace('/home');
      }
    });
  }, []);

  async function handleEntrar() {
    const novosErros = validar(email, senha);
    setErros(novosErros);
    setErroGeral('');

    // Se tiver qualquer erro, para aqui e não chama o Supabase
    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setCarregando(true);
    try {
      await entrar(email.trim(), senha);
      router.replace('/home');
    } catch (erro) {
      setErroGeral(traduzirErro(erro instanceof Error ? erro.message : ''));
    } finally {
      setCarregando(false);
    }
  }

  return (
      <SafeAreaView style={styles.tela}>
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
            <View style={styles.cabecalho}>
              <View style={styles.logo}>
                <MaterialDesignIcons name="walk" size={40} color={Cores.branco} />
              </View>
              <Text style={styles.marca}>
                My<Text style={styles.destaque}>Fisio</Text>
              </Text>
            </View>

            <View style={styles.cartao}>
              <View>
                <Text style={styles.titulo}>Bem-vindo de volta!</Text>
                <Text style={styles.subtitulo}>
                  Entre para encontrar o seu <Text style={styles.destaque}>Especialista</Text>
                </Text>
              </View>

              <CampoTexto
                  rotulo="E-mail"
                  icone="email-outline"
                  placeholder="seuemail@exemplo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  value={email}
                  onChangeText={setEmail}
                  erro={erros.email}
              />

              <CampoTexto
                  rotulo="Senha"
                  icone="lock-outline"
                  placeholder="Digite sua senha"
                  senha
                  autoComplete="current-password"
                  value={senha}
                  onChangeText={setSenha}
                  onSubmitEditing={handleEntrar}
                  erro={erros.senha}
              />

              <Pressable style={styles.esqueceu}>
                <Text style={styles.link}>Esqueceu a senha?</Text>
              </Pressable>

              {erroGeral ? <Text style={styles.erroGeral}>{erroGeral}</Text> : null}

              <Pressable
                  onPress={handleEntrar}
                  disabled={carregando}
                  style={({ pressed }) => [
                    styles.botao,
                    (pressed || carregando) && styles.botaoPressionado,
                  ]}>
                {carregando ? (
                    <ActivityIndicator color={Cores.branco} />
                ) : (
                    <Text style={styles.textoBotao}>Entrar</Text>
                )}
              </Pressable>
            </View>

            <View style={styles.rodape}>
              <Text style={styles.textoRodape}>Não tem uma conta? </Text>
              <Pressable onPress={() => router.push('/cadastro')}>
                <Text style={styles.link}>Cadastre-se</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  flex: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.four,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth / 2,
    alignSelf: 'center',
  },
  cabecalho: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: Cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marca: {
    fontSize: 28,
    fontWeight: '700',
    color: Cores.texto,
  },
  destaque: {
    color: Cores.primaria,
    fontWeight: '700',
  },
  cartao: {
    backgroundColor: Cores.cartao,
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: Cores.texto,
  },
  subtitulo: {
    fontSize: 14,
    color: Cores.textoSecundario,
    marginTop: Spacing.one,
  },
  esqueceu: {
    alignSelf: 'flex-end',
  },
  erroGeral: {
    fontSize: 13,
    color: Cores.erro,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: Cores.primaria,
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  textoBotao: {
    color: Cores.branco,
    fontSize: 15,
    fontWeight: '600',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoRodape: {
    fontSize: 13,
    color: Cores.textoSecundario,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: Cores.primaria,
  },
});