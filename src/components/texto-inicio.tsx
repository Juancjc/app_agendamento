import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type TextoInicioProps = ViewProps & {
  esquerda: ReactNode;
  direita?: ReactNode;
  type?: ThemedTextProps['type'];
};

// Strings viram ThemedText; outros elementos (ex.: ícones) são renderizados como vieram
function renderLado(conteudo: ReactNode, type: ThemedTextProps['type']) {
  if (typeof conteudo === 'string' || typeof conteudo === 'number') {
    return <ThemedText type={type}>{conteudo}</ThemedText>;
  }
  return conteudo;
}

export function TextoInicio({ esquerda, direita, type = 'default', style, ...rest }: TextoInicioProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.esquerda}>{renderLado(esquerda, type)}</View>
      {direita != null && <View>{renderLado(direita, type)}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    gap: Spacing.three,
  },
  esquerda: {
    flexShrink: 1,
  },
});
