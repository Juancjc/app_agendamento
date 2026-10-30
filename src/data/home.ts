// Dados de exemplo da tela inicial.
// Mais tarde eles podem vir de uma API; a tela não precisa mudar.
import type { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import type { ComponentProps } from 'react';

// Só aceita nomes de ícones que existem na biblioteca
export type NomeIcone = ComponentProps<typeof MaterialDesignIcons>['name'];

export type TipoFisioterapia = {
  id: string;
  nome: string;
  icone: NomeIcone;
  cor: string;
};

export type Especialista = {
  id: string;
  nome: string;
  profissao: string;
  nota: number;
  votos: number;
  foto: string;
};

export const usuario = {
  nome: 'Teddy Falcão',
  foto: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export const tiposFisioterapia: TipoFisioterapia[] = [
  { id: 'esportiva', nome: 'Esportiva', icone: 'dumbbell', cor: '#1A7FE8' },
  { id: 'ortopedica', nome: 'Ortopédica', icone: 'bone', cor: '#16A37F' },
  { id: 'reumatologica', nome: 'Reumatológica', icone: 'hand-back-right-outline', cor: '#E0A800' },
  { id: 'trauma', nome: 'Trauma', icone: 'bandage', cor: '#3B6FD8' },
];

export const especialistas: Especialista[] = [
  {
    id: '1',
    nome: 'Dra. Carla Rodríguez',
    profissao: 'Fisioterapeuta',
    nota: 5,
    votos: 87,
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];
