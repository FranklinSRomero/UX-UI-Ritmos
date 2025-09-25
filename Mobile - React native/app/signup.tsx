import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { EmailInput } from '@/components/ui/email-input';
import { PasswordInput } from '@/components/ui/password-input';
import { RitmosComponents, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import { isValidEmail } from '@/utils/validation';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Logo } from '../assets/icons/logo';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Referencias para navegación entre campos
  const confirmEmailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignup = () => {
    // Limpiar errores previos
    setEmailError('');
    setConfirmEmailError('');
    setPasswordError('');

    let hasErrors = false;

    if (!email.trim()) {
      setEmailError('Por favor ingresa tu correo electrónico');
      hasErrors = true;
    } else if (!isValidEmail(email)) {
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
    Alert.alert('Registro exitoso', `Correo: ${email}`);
    // Navegar a la pantalla principal después del registro exitoso
    router.replace('/(tabs)');
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <Screen>
      <ScreenHeader title="Regístrate, es gratis ;)" onBackPress={handleBackToLogin} />

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
            onSubmitEditing={() => confirmEmailInputRef.current?.focus()}
          />

          <EmailInput
            ref={confirmEmailInputRef}
            placeholder="Confirma tu correo"
            value={confirmEmail}
            onChangeText={(text) => {
              setConfirmEmail(text);
              if (confirmEmailError) setConfirmEmailError('');
            }}
            error={confirmEmailError}
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
            onSubmitEditing={handleSignup}
          />

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBackToLogin}>
            <Text style={styles.loginText}>ya tienes cuenta?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: RitmosSpacing.lg + RitmosSpacing.md,
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