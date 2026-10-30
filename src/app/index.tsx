import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';

// Paleta do protótipo MyFisio
const Palette = {
  background: '#DCE3EC',
  card: '#E9EEF4',
  primary: '#1A7FE8',
  title: '#1E2A3B',
  text: '#5B6573',
  placeholder: '#9AA4B2',
  border: '#CBD4DF',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sem autenticação por enquanto: entra direto na home
  const handleLogin = () => router.replace('/home');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.logo}>
              <SymbolView
                name={{ ios: 'figure.walk', android: 'directions_walk', web: 'directions_walk' }}
                tintColor="#FFFFFF"
                size={36}
              />
            </View>
            <Text style={styles.brand}>
              My<Text style={styles.brandAccent}>Fisio</Text>
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>
              Entre para encontrar o seu <Text style={styles.subtitleAccent}>Especialista</Text>
            </Text>

            <View style={styles.field}>
              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputWrapper}>
                <SymbolView
                  name={{ ios: 'envelope', android: 'mail', web: 'mail' }}
                  tintColor={Palette.primary}
                  size={18}
                />
                <TextInput
                  style={styles.input}
                  placeholder="seuemail@exemplo.com"
                  placeholderTextColor={Palette.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWrapper}>
                <SymbolView
                  name={{ ios: 'lock', android: 'lock', web: 'lock' }}
                  tintColor={Palette.primary}
                  size={18}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor={Palette.placeholder}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={handleLogin}
                />
                <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                  <SymbolView
                    name={
                      showPassword
                        ? { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }
                        : { ios: 'eye', android: 'visibility', web: 'visibility' }
                    }
                    tintColor={Palette.placeholder}
                    size={18}
                  />
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.forgot}>
              <Text style={styles.link}>Esqueceu a senha?</Text>
            </Pressable>

            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
              <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta? </Text>
            <Pressable onPress={handleLogin}>
              <Text style={styles.link}>Cadastre-se</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.four,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth / 2,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 28,
    fontWeight: '700',
    color: Palette.title,
  },
  brandAccent: {
    color: Palette.primary,
  },
  card: {
    backgroundColor: Palette.card,
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Palette.title,
  },
  subtitle: {
    fontSize: 14,
    color: Palette.text,
    marginTop: -Spacing.two,
  },
  subtitleAccent: {
    color: Palette.primary,
    fontWeight: '700',
  },
  field: {
    gap: Spacing.one,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.title,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Palette.title,
  },
  forgot: {
    alignSelf: 'flex-end',
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.primary,
  },
  button: {
    backgroundColor: Palette.primary,
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: Palette.text,
  },
});
