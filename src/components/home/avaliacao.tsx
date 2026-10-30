import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Cores } from '@/constants/cores';

type AvaliacaoProps = {
  nota: number;
  votos: number;
};

// 5 estrelas: cheias até a nota, vazias depois
export function Avaliacao({ nota, votos }: AvaliacaoProps) {
  const estrelas = [1, 2, 3, 4, 5];

  return (
    <View style={styles.linha}>
      {estrelas.map((numero) => (
        <MaterialDesignIcons
          key={numero}
          name={numero <= nota ? 'star' : 'star-outline'}
          size={16}
          color={Cores.estrela}
        />
      ))}
      <Text style={styles.texto}>
        {nota.toFixed(1)} | {votos} Votos
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  texto: {
    marginLeft: 6,
    fontSize: 11,
    color: Cores.textoSecundario,
  },
});
