import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Avaliacao } from '@/components/home/avaliacao';
import { Cores } from '@/constants/cores';
import type { Especialista } from '@/data/home';

type CardEspecialistaProps = {
  especialista: Especialista;
  aoVerDetalhes: () => void;
};

// Cartão com foto à esquerda e informações + botão à direita
export function CardEspecialista({ especialista, aoVerDetalhes }: CardEspecialistaProps) {
  return (
    <View style={styles.cartao}>
      <Image source={{ uri: especialista.foto }} style={styles.foto} />

      <View style={styles.info}>
        <Text style={styles.profissao}>{especialista.profissao}</Text>
        <Text style={styles.nome}>{especialista.nome}</Text>
        <Avaliacao nota={especialista.nota} votos={especialista.votos} />

        <Pressable style={styles.botao} onPress={aoVerDetalhes}>
          <Text style={styles.textoBotao}>Detalhes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: Cores.cartao,
    borderRadius: 16,
    padding: 12,
  },
  foto: {
    width: 110,
    height: 100,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  profissao: {
    fontSize: 11,
    color: Cores.primaria,
  },
  nome: {
    fontSize: 15,
    color: Cores.texto,
  },
  botao: {
    marginTop: 6,
    backgroundColor: Cores.primaria,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: Cores.branco,
    fontSize: 13,
  },
});
