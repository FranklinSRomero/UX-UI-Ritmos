import { RitmosColors, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './icon-symbol';

interface PasswordInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  label?: string;
  showVisibilityToggle?: boolean;
}

export function PasswordInput({
  placeholder = "Contraseña",
  value,
  onChangeText,
  error,
  label,
  showVisibilityToggle = true
}: PasswordInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
          name="lock"
          color={RitmosColors.placeholder}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={RitmosColors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isVisible}
          autoCapitalize="none"
          textContentType="password"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {showVisibilityToggle && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsVisible(!isVisible)}
          >
            <IconSymbol
              size={20}
              name={isVisible ? "eye" : "eye.slash"}
              color={RitmosColors.placeholder}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: RitmosSpacing.md,
  },
  label: {
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
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
    // M3/Elevation Light/1
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
  eyeButton: {
    padding: RitmosSpacing.xs,
  },
  errorText: {
    fontSize: RitmosTypography.scale.bodySmall.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.error,
    marginTop: RitmosSpacing.xs,
    marginLeft: RitmosSpacing.md,
  },
});