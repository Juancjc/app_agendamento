import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useState, type ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { Cores } from '@/constants/cores';

// Pega o tipo dos nomes de ícone direto do componente: assim o TypeScript avisa se o nome não existir
type NomeIcone = ComponentProps<typeof MaterialDesignIcons>['name'];

// Recebe todas as props normais de um TextInput + as nossas
type CampoTextoProps = TextInputProps & {
    rotulo: string;
    icone: NomeIcone;
    erro?: string;
    senha?: boolean;
};

// Campo de formulário: rótulo em cima, ícone à esquerda, olho para senha e mensagem de erro embaixo
export function CampoTexto({ rotulo, icone, erro, senha = false, ...inputProps }: CampoTextoProps) {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <View style={styles.campo}>
            <Text style={styles.rotulo}>{rotulo}</Text>

            <View style={[styles.caixa, erro ? styles.caixaComErro : null]}>
                <MaterialDesignIcons name={icone} size={20} color={Cores.primaria} />

                <TextInput
                    style={styles.input}
                    placeholderTextColor={Cores.textoSecundario}
                    secureTextEntry={senha && !mostrarSenha}
                    {...inputProps}
                />

                {senha && (
                    <Pressable
                        onPress={() => setMostrarSenha((valorAtual) => !valorAtual)}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}>
                        <MaterialDesignIcons
                            name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={Cores.textoSecundario}
                        />
                    </Pressable>
                )}
            </View>

            {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    campo: {
        gap: 4,
    },
    rotulo: {
        fontSize: 13,
        fontWeight: '600',
        color: Cores.texto,
    },
    caixa: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: Cores.branco,
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 48,
    },
    caixaComErro: {
        borderColor: Cores.erro,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: Cores.texto,
    },
    erro: {
        fontSize: 12,
        color: Cores.erro,
    },
});