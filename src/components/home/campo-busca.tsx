import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Cores } from '@/constants/cores';

type CampoBuscaProps = {
  valor: string;
  aoMudar: (texto: string) => void;
  aoFiltrar?: () => void;
};

// Campo de texto com lupa à esquerda e botão de filtros à direita
export function CampoBusca({ valor, aoMudar, aoFiltrar }: CampoBuscaProps) {
  return (
    <View style={styles.container}>
      <MaterialDesignIcons name="magnify" size={20} color={Cores.primaria} />

      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={aoMudar}
        placeholder="Especialidade, Cidade, Bairro"
        placeholderTextColor={Cores.textoSecundario}
      />

      <Pressable style={styles.botaoFiltro} onPress={aoFiltrar}>
        <MaterialDesignIcons name="tune-variant" size={24} color={Cores.texto} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Cores.campo,
    borderRadius: 10,
    paddingLeft: 12,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Cores.texto,
  },
  botaoFiltro: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Cores.textoSecundario,
  },
});
