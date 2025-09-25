import React, { forwardRef, useState } from 'react';
import { StyleProp, TextInput, TextInputProps, TouchableOpacity, ViewStyle } from 'react-native';

import { RitmosColors, RitmosSpacing } from '@/constants/theme';
import { FormField } from './form-field';
import { IconSymbol } from './icon-symbol';

interface PasswordInputProps extends TextInputProps {
  error?: string;
  label?: string;
  showVisibilityToggle?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(({
  error,
  label,
  showVisibilityToggle = true,
  containerStyle,
  textContentType = 'password',
  autoCapitalize = 'none',
  secureTextEntry = true,
  ...rest
}, ref) => {
  const [isVisible, setIsVisible] = useState(!secureTextEntry);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <FormField
      ref={ref}
      label={label}
      error={error}
      iconName="lock"
      containerStyle={containerStyle}
      secureTextEntry={!isVisible}
      textContentType={textContentType}
      autoCapitalize={autoCapitalize}
      trailingElement={
        showVisibilityToggle ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            hitSlop={{ top: RitmosSpacing.xs, bottom: RitmosSpacing.xs, left: RitmosSpacing.xs, right: RitmosSpacing.xs }}
            onPress={toggleVisibility}
          >
            <IconSymbol
              size={20}
              name={isVisible ? 'eye' : 'eye.slash'}
              color={RitmosColors.placeholder}
            />
          </TouchableOpacity>
        ) : null
      }
      {...rest}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';