import { ThemedView } from '@/components/themed-view';
import { EmailInput } from '@/components/ui/email-input';
import { PasswordInput } from '@/components/ui/password-input';
import { RitmosColors, RitmosComponents, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from './logo';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = () => {
    // Limpiar errores previos
    setEmailError('');
    setConfirmEmailError('');
    setPasswordError('');

    let hasErrors = false;

    if (!email.trim()) {
      setEmailError('Por favor ingresa tu correo electrónico');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un correo válido');
      hasErrors = true;
    }

    if (!confirmEmail.trim()) {
      setConfirmEmailError('Por favor confirma tu correo electrónico');
      hasErrors = true;
    } else if (email !== confirmEmail) {
      setConfirmEmailError('Los correos electrónicos no coinciden');
      hasErrors = true;
    }

    if (!password.trim()) {
      setPasswordError('Por favor ingresa tu contraseña');
      hasErrors = true;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      hasErrors = true;
    }

    if (hasErrors) return;

    // TODO: Implementar lógica de registro real
    console.log('Intento de registro:', { email, password });
    alert(`¡Registro exitoso! Correo: ${email}`);
    // Navegar a la pantalla principal después del registro exitoso
    router.replace('/(tabs)');
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Regístrate, es gratis ;)</Text>
        </View>

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

          <EmailInput
            placeholder="Confirma tu correo"
            value={confirmEmail}
            onChangeText={(text) => {
              setConfirmEmail(text);
              if (confirmEmailError) setConfirmEmailError(''); // Limpiar error al escribir
            }}
            error={confirmEmailError}
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

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBackToLogin}>
            <Text style={styles.loginText}>ya tienes cuenta?</Text>
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
  },
  input: {
    ...RitmosComponents.input,
    width: '100%',
    marginBottom: RitmosSpacing.md - RitmosSpacing.xs,
  },
  signupButton: {
    ...RitmosComponents.primaryButton,
    width: '100%',
    marginTop: RitmosSpacing.lg + RitmosSpacing.xs,
    marginBottom: RitmosSpacing.lg + RitmosSpacing.md,
  },
  signupButtonText: {
    ...RitmosComponents.primaryButtonText,
  },
  loginText: {
    ...RitmosComponents.placeholderText,
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
  },
});