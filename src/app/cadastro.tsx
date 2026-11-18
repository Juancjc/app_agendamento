import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CampoTexto } from '@/components/campo-texto';
import { Cores } from '@/constants/cores';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { cadastrar } from '@/services/auth.service';

type Erros = {
    nome?: string;
    email?: string;
    senha?: string;
    confirmarSenha?: string;
};
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validar(nome: string, email: string, senha: string, confirmarSenha: string): Erros {
    const erros: Erros = {};
    if (!nome.trim()) {
        erros.nome = 'O nome é obrigatório.';
    }
    if (!email.trim()) {
        erros.email = 'O e-mail é obrigatório.';
    } else if (!REGEX_EMAIL.test(email.trim())) {
        erros.email = 'O e-mail não é válido.';
    }
    if (!senha) {
        erros.senha = 'A senha é obrigatória.';
    } else if (senha.length < 6) {
        erros.senha = 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (confirmarSenha !== senha) {
        erros.confirmarSenha = 'As senhas não coincidem.';
    }
    return erros;
}
function traduzirErro(mensagem: string) {
    const texto = mensagem.toLowerCase();

    if (texto.includes('already registered')) {
        return 'Este e-mail já está cadastrado.';
    }
    if (texto.includes('password should be')) {
        return 'A senha precisa ter pelo menos 6 caracteres.';
    }
    if (texto.includes('rate limit')) {
        return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.';
    }
    if (texto.includes('network') || texto.includes('fetch')) {
        return 'Sem conexão com a internet.';
    }
    return 'Não foi possível concluir o cadastro. Tente novamente.';
}
export default function CadastroScreen() {
    // Valores digitados
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erros, setErros] = useState<Erros>({});
    const [erroGeral, setErroGeral] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [cadastroConcluido, setCadastroConcluido] = useState(false);
    // Se veio do login, volta. Se abriu direto (ex.: web), substitui pela tela de login.
    function voltarParaLogin() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    }

   async function handleCadastrar() {
        const novosErros = validar(nome, email, senha, confirmarSenha);
        setErros(novosErros);
        setErroGeral('');
        if (Object.keys(novosErros).length > 0) {
            return;
        }
        setCarregando(true);
        try {
            const { user, session } = await cadastrar(nome.trim(), email, senha);
            if (user && user.identities?.length === 0) {
                setErroGeral('Este e-mail já está cadastrado.');
                return;
            }
            if(session){
                router.replace('/home');
            }else{
                setCadastroConcluido(true);
            }

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
                    <Pressable
                        onPress={voltarParaLogin}
                        hitSlop={8}
                        style={styles.voltar}
                        accessibilityRole="button"
                        accessibilityLabel="Voltar">
                        <MaterialDesignIcons name="arrow-left" size={24} color={Cores.texto} />
                    </Pressable>

                    <View>
                        <Text style={styles.titulo}>Crie sua conta</Text>
                        <Text style={styles.subtitulo}>
                            Cadastre-se para agendar com o seu <Text style={styles.destaque}>Especialista</Text>
                        </Text>
                    </View>

                    {cadastroConcluido ? (
                    <View style={[styles.cartao, styles.cartaoSucesso]}>
                        <MaterialDesignIcons name="email-check-outline" size={48} color={Cores.sucesso} />
                        <Text style={styles.tituloSucesso}>Cadastro realizado!</Text>
                        <Text style={styles.textoSucesso}>
                            Enviamos um link de confirmação para {email.trim()}. Confirme o e-mail e depois
                            faça o login.
                        </Text>
                        <Pressable
                            onPress={voltarParaLogin}
                            style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}>
                            <Text style={styles.textoBotao}>Ir para o login</Text>
                        </Pressable>
                    </View>
                    ) : (
                    <View style={styles.cartao}>
                        <CampoTexto
                            rotulo="Nome completo"
                            icone="account-outline"
                            placeholder="Seu nome"
                            autoCapitalize="words"
                            autoComplete="name"
                            value={nome}
                            onChangeText={setNome}
                            erro={erros.nome}
                        />

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
                            placeholder="Mínimo de 6 caracteres"
                            senha
                            autoComplete="new-password"
                            value={senha}
                            onChangeText={setSenha}
                            erro={erros.senha}
                        />

                        <CampoTexto
                            rotulo="Confirmar senha"
                            icone="lock-check-outline"
                            placeholder="Repita a senha"
                            senha
                            autoComplete="new-password"
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            onSubmitEditing={handleCadastrar}
                            erro={erros.confirmarSenha}
                        />

                        {erroGeral ? <Text style={styles.erroGeral}>{erroGeral}</Text> : null}
                        <Pressable
                            onPress={handleCadastrar}
                            disabled={carregando}
                            style={({ pressed }) => [
                                styles.botao,
                                (pressed || carregando) && styles.botaoPressionado,
                            ]}>
                            {carregando ? (
                                <ActivityIndicator color={Cores.branco} />
                            ) : (
                                <Text style={styles.textoBotao}>Cadastrar</Text>
                            )}
                        </Pressable>
                    </View>
                    )}

                    <View style={styles.rodape}>
                        <Text style={styles.textoRodape}>Já tem uma conta? </Text>
                        <Pressable onPress={voltarParaLogin}>
                            <Text style={styles.link}>Entrar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Já deixamos prontos os estilos do Passo 10 (mensagem de erro e cartão de sucesso)
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
    voltar: {
        alignSelf: 'flex-start',
    },
    titulo: {
        fontSize: 26,
        fontWeight: '700',
        color: Cores.texto,
    },
    subtitulo: {
        fontSize: 14,
        color: Cores.textoSecundario,
        marginTop: Spacing.one,
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
    cartaoSucesso: {
        alignItems: 'center',
    },
    tituloSucesso: {
        fontSize: 20,
        fontWeight: '700',
        color: Cores.texto,
    },
    textoSucesso: {
        fontSize: 14,
        color: Cores.textoSecundario,
        textAlign: 'center',
    },
    erroGeral: {
        fontSize: 13,
        color: Cores.erro,
        textAlign: 'center',
    },
    botao: {
        alignSelf: 'stretch',
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