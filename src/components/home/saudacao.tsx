import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { TextoInicio } from '@/components/texto-inicio';
import { Cores } from '@/constants/cores';

type SaudacaoProps = {
  nome: string;
  foto?: string | null; // sem foto, mostra a inicial do nome
  aoSair?: () => void; // sem essa função, o botão de sair não aparece
};

// Cabeçalho: "Olá" + nome do usuário à esquerda, botão de sair e foto à direita
export function Saudacao({ nome, foto, aoSair }: SaudacaoProps) {
  const inicial = nome.trim().charAt(0).toUpperCase();

  return (
    <TextoInicio
      esquerda={
        <View>
          <Text style={styles.ola}>👋 Olá,</Text>
          <Text style={styles.nome}>{nome}</Text>
        </View>
      }
      direita={
        <View style={styles.direita}>
          {aoSair ? (
            <Pressable
              onPress={aoSair}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Sair da conta"
              style={({ pressed }) => [styles.sair, pressed && styles.pressionado]}>
              <MaterialDesignIcons name="logout" size={22} color={Cores.primaria} />
            </Pressable>
          ) : null}

          {foto ? (
            <Image source={{ uri: foto }} style={styles.foto} />
          ) : (
            <View style={styles.foto}>
              <Text style={styles.inicial}>{inicial}</Text>
            </View>
          )}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  ola: {
    fontSize: 14,
    color: Cores.texto,
  },
  nome: {
    fontSize: 26,
    fontWeight: '700',
    color: Cores.texto,
  },
  direita: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sair: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Cores.cartao,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressionado: {
    opacity: 0.7,
  },
  foto: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: Cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicial: {
    fontSize: 22,
    fontWeight: '700',
    color: Cores.branco,
  },
});
