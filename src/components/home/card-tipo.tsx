import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Cores } from '@/constants/cores';
import type { TipoFisioterapia } from '@/data/home';

type CardTipoProps = {
  tipo: TipoFisioterapia;
  selecionado: boolean;
  aoPressionar: () => void;
};

// Um quadrado com ícone + nome; o nome fica em negrito quando está selecionado
export function CardTipo({ tipo, selecionado, aoPressionar }: CardTipoProps) {
  return (
    <Pressable style={styles.container} onPress={aoPressionar}>
      <View style={styles.caixaIcone}>
        <MaterialDesignIcons name={tipo.icone} size={32} color={tipo.cor} />
      </View>
      <Text style={[styles.nome, selecionado && styles.nomeSelecionado]}>{tipo.nome}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  caixaIcone: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: Cores.cartao,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nome: {
    fontSize: 13,
    color: Cores.textoSecundario,
  },
  nomeSelecionado: {
    fontWeight: '700',
    color: Cores.texto,
  },
});
