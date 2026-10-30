import { FlatList, StyleSheet } from 'react-native';

import { CardTipo } from '@/components/home/card-tipo';
import type { TipoFisioterapia } from '@/data/home';

type ListaTiposProps = {
  tipos: TipoFisioterapia[];
  selecionadoId: string;
  aoSelecionar: (id: string) => void;
};

// Lista horizontal de tipos. FlatList só renderiza o que aparece na tela.
export function ListaTipos({ tipos, selecionadoId, aoSelecionar }: ListaTiposProps) {
  return (
    <FlatList
      data={tipos}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(tipo) => tipo.id}
      contentContainerStyle={styles.lista}
      renderItem={({ item }) => (
        <CardTipo
          tipo={item}
          selecionado={item.id === selecionadoId}
          aoPressionar={() => aoSelecionar(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    gap: 12,
  },
});
