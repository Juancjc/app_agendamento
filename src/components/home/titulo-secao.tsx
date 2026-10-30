import { Pressable, StyleSheet, Text } from 'react-native';

import { TextoInicio } from '@/components/texto-inicio';
import { Cores } from '@/constants/cores';

type TituloSecaoProps = {
  titulo: string;
  aoVerMais?: () => void;
};

// Título de uma seção; o link "Ver mais" só aparece se aoVerMais for passado
export function TituloSecao({ titulo, aoVerMais }: TituloSecaoProps) {
  return (
    <TextoInicio
      esquerda={<Text style={styles.titulo}>{titulo}</Text>}
      direita={
        aoVerMais && (
          <Pressable onPress={aoVerMais}>
            <Text style={styles.verMais}>Ver mais</Text>
          </Pressable>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 17,
    fontWeight: '600',
    color: Cores.texto,
  },
  verMais: {
    fontSize: 13,
    color: Cores.primaria,
  },
});
