import { ThemedView } from '@/components/themed-view';
import { EmailInput } from '@/components/ui/email-input';
import { PasswordInput } from '@/components/ui/password-input';
import { RitmosColors, RitmosComponents, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from './logo';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // Limpiar errores previos
    setEmailError('');
    setPasswordError('');

    let hasErrors = false;

    if (!email.trim()) {
      setEmailError('Por favor ingresa tu correo electrónico');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un correo válido');
      hasErrors = true;
    }

    if (!password.trim()) {
      setPasswordError('Por favor ingresa tu contraseña');
      hasErrors = true;
    }

    if (hasErrors) return;

    // Navegar a la pantalla principal después del login exitoso
    console.log('Intento de login:', { email, password });
    router.replace('/(tabs)');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Inicio de sesión</Text>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <EmailInput
            placeholder="Correo"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError(''); // Limpiar error al escribir
            }}
            error={emailError}
          />

          <PasswordInput
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError(''); // Limpiar error al escribir
            }}
            error={passwordError}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>INGRESAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Aún no tienes cuenta?</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RitmosColors.background,
  },
  header: {
    ...RitmosComponents.screenHeader,
  },
  headerText: {
    ...RitmosComponents.screenHeaderText,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: RitmosSpacing.xxl + RitmosSpacing.xxl,
    marginBottom: RitmosSpacing.xxl + RitmosSpacing.lg,
  },
  logoIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RitmosSpacing.sm + 2,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: RitmosColors.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  logoIconLeaf: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    backgroundColor: '#8b4513',
    borderRadius: 12,
    transform: [{ rotate: '45deg' }],
  },
  logoText: {
    ...RitmosComponents.headingLarge,
    fontSize: 48,
    fontWeight: '700',
  },
  formContainer: {
    paddingHorizontal: RitmosSpacing.lg + RitmosSpacing.md,
    alignItems: 'center',
    gap: 30,

  },
  input: {
    ...RitmosComponents.input,
    width: '100%',
    marginBottom: RitmosSpacing.md - RitmosSpacing.xs,
  },
  loginButton: {
    ...RitmosComponents.primaryButton,
    width: 177,
    height: 71,
    marginTop: RitmosSpacing.lg + RitmosSpacing.xs,
    marginBottom: RitmosSpacing.lg + RitmosSpacing.md,
  },
  loginButtonText: {
    ...RitmosComponents.primaryButtonText,
  },
  signupText: {
    ...RitmosComponents.placeholderText,
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
  },
});