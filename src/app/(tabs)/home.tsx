import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import {verificarSupabase} from '@/services/saude.service';
import {BannerBusca} from '@/components/home/banner-busca';
import {CardEspecialista} from '@/components/home/card-especialista';
import {ListaTipos} from '@/components/home/lista-tipos';
import {Saudacao} from '@/components/home/saudacao';
import {TituloSecao} from '@/components/home/titulo-secao';
import {Cores} from '@/constants/cores';
import {BottomTabInset} from '@/constants/theme';
import {especialistas, tiposFisioterapia, usuario} from '@/data/home';

// A tela só monta os componentes e guarda o estado (busca e tipo selecionado).
// Cada parte visual está no seu próprio arquivo em src/components/home.
export default function HomeScreen() {
    const [busca, setBusca] = useState('');
    const [tipoSelecionado, setTipoSelecionado] = useState(tiposFisioterapia[0].id);
    const [conexao, setConexao] = useState({
        ok: false,
        mensagem: 'Verificando conexão...',
    });

    useEffect(() => {
        let ativo = true;

        verificarSupabase().then((resultado) => {
            if (ativo) {
                setConexao(resultado);
            }
        });

        return () => {
            ativo = false;
        };
    }, []);
    return (
        <SafeAreaView style={styles.tela} edges={['top']}>
            <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
                <Saudacao nome={usuario.nome} foto={usuario.foto}/>

                <BannerBusca busca={busca} aoBuscar={setBusca}/>
              <Text
                  accessibilityLiveRegion="polite"
                  style={{ color: conexao.ok ? '#15803D' : '#64748B' }}
              >
                {conexao.mensagem}
              </Text>
                <View style={styles.secao}>
                    <TituloSecao titulo="Tipos de fisioterapia"/>
                    <ListaTipos
                        tipos={tiposFisioterapia}
                        selecionadoId={tipoSelecionado}
                        aoSelecionar={setTipoSelecionado}
                    />
                </View>

                <View style={styles.secao}>
                    <TituloSecao titulo="O seu especialista" aoVerMais={() => {
                    }}/>
                    {especialistas.map((especialista) => (
                        <CardEspecialista
                            key={especialista.id}
                            especialista={especialista}
                            aoVerDetalhes={() => {
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: Cores.fundo,
    },
    conteudo: {
        padding: 20,
        gap: 24,
        paddingBottom: BottomTabInset + 24,
    },
    secao: {
        gap: 12,
    },
});
