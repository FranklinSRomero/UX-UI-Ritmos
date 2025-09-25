import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { EmailInput } from '@/components/ui/email-input';
import { PasswordInput } from '@/components/ui/password-input';
import { RitmosComponents, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import { isValidEmail } from '@/utils/validation';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Logo } from '../assets/icons/logo';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Referencias para navegación entre campos
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = () => {
    // Limpiar errores previos
    setEmailError('');
    setPasswordError('');

    let hasErrors = false;

    if (!email.trim()) {
      setEmailError('Por favor ingresa tu correo electrónico');
      hasErrors = true;
    } else if (!isValidEmail(email)) {
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
    <Screen>
      <ScreenHeader title="Inicio de sesión" />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.formContainer}>
          <EmailInput
            placeholder="Correo"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            error={emailError}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />

          <PasswordInput
            ref={passwordInputRef}
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            error={passwordError}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>INGRESAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Aún no tienes cuenta?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: RitmosSpacing.lg + RitmosSpacing.md,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: RitmosSpacing.xxl + RitmosSpacing.xxl,
    marginBottom: RitmosSpacing.xxl + RitmosSpacing.lg,
  },
  formContainer: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
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