import { Image, StyleSheet, Text, View } from 'react-native';

import { TextoInicio } from '@/components/texto-inicio';
import { Cores } from '@/constants/cores';

type SaudacaoProps = {
  nome: string;
  foto: string;
};

// Cabeçalho: "Olá" + nome do usuário à esquerda e a foto de perfil à direita
export function Saudacao({ nome, foto }: SaudacaoProps) {
  return (
    <TextoInicio
      esquerda={
        <View>
          <Text style={styles.ola}>👋 Olá,</Text>
          <Text style={styles.nome}>{nome}</Text>
        </View>
      }
      direita={<Image source={{ uri: foto }} style={styles.foto} />}
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
  foto: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: Cores.primaria,
  },
});
