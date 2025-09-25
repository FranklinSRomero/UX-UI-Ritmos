import React, { forwardRef } from 'react';
import { StyleProp, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { FormField } from './form-field';

interface EmailInputProps extends TextInputProps {
  error?: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const EmailInput = forwardRef<TextInput, EmailInputProps>(({
  error,
  label,
  containerStyle,
  autoCapitalize = 'none',
  autoComplete = 'email',
  keyboardType = 'email-address',
  textContentType = 'emailAddress',
  ...rest
}, ref) => {
  return (
    <FormField
      ref={ref}
      label={label}
      error={error}
      iconName="envelope"
      containerStyle={containerStyle}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      keyboardType={keyboardType}
      textContentType={textContentType}
      {...rest}
    />
  );
});

EmailInput.displayName = 'EmailInput';