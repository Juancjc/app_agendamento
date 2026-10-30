import { Image, StyleSheet, Text, View } from 'react-native';

import { CampoBusca } from '@/components/home/campo-busca';
import { Cores } from '@/constants/cores';

type BannerBuscaProps = {
  busca: string;
  aoBuscar: (texto: string) => void;
};

const FOTO_BANNER = 'https://randomuser.me/api/portraits/women/68.jpg';

// Cartão de destaque com o título, uma foto e o campo de busca
export function BannerBusca({ busca, aoBuscar }: BannerBuscaProps) {
  return (
    <View style={styles.cartao}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>
          Encontre o seu{'\n'}
          <Text style={styles.destaque}>Especialista!</Text>
        </Text>
        <Image source={{ uri: FOTO_BANNER }} style={styles.foto} />
      </View>

      <CampoBusca valor={busca} aoMudar={aoBuscar} />
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: Cores.cartao,
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: Cores.texto,
  },
  destaque: {
    color: Cores.primaria,
  },
  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
});
