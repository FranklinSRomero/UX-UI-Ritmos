import { RitmosColors, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { IconSymbol } from './icon-symbol';

interface EmailInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  label?: string;
}

export function EmailInput({
  placeholder = "Correo",
  value,
  onChangeText,
  error,
  label
}: EmailInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError
      ]}>
        <IconSymbol
          size={20}
          name="envelope"
          color={RitmosColors.placeholder}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={RitmosColors.placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 43,
    marginBottom: RitmosSpacing.md,
  },
  label: {
    fontSize: RitmosTypography.scale.labelMedium.fontSize,
    fontFamily: RitmosTypography.fonts.primary,
    fontWeight: '500',
    color: RitmosColors.text.onBackground,
    marginBottom: RitmosSpacing.xs,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    minWidth: 320, // 20rem = 320px
    backgroundColor: '#FFFFFF',
    borderRadius: 8, // 0.5rem = 8px
    padding: 10, // 0.625rem = 10px
    gap: 10, // 0.625rem = 10px
    // M3/Elevation Light/1 - Combinación de ambas sombras
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.30,
    shadowRadius: 3,
    elevation: 3,
  },
  inputContainerFocused: {
    borderColor: RitmosColors.primary,
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: RitmosColors.error,
    borderWidth: 2,
  },
  icon: {
    marginTop: 2, // Alineación vertical
  },
  input: {
    flex: 1,
    fontSize: RitmosTypography.scale.bodyLarge.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.text.onBackground,
    padding: 0, // Remover padding por defecto
    margin: 0,  // Remover margin por defecto
  },
  errorText: {
    fontSize: RitmosTypography.scale.bodySmall.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.error,
    marginTop: RitmosSpacing.xs,
    marginLeft: RitmosSpacing.md,
  },
});