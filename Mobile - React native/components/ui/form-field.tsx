import React, { forwardRef, ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import { IconSymbol, IconSymbolName } from '@/components/ui/icon-symbol';
import { RitmosBorder, RitmosColors, RitmosElevation, RitmosSpacing, RitmosTypography } from '@/constants/theme';

interface FormFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  iconName?: IconSymbolName;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  trailingElement?: ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const FormField = forwardRef<TextInput, FormFieldProps>(({
  label,
  error,
  iconName,
  iconColor = RitmosColors.placeholder,
  containerStyle,
  trailingElement,
  onFocus,
  onBlur,
  style,
  wrapperStyle,
  labelStyle,
  ...textInputProps
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const isMultiline = Boolean(textInputProps.multiline);

  const handleFocus: TextInputProps['onFocus'] = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur: TextInputProps['onBlur'] = (event) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          !!error && styles.inputWrapperError,
          isMultiline && styles.inputWrapperMultiline,
          wrapperStyle,
        ]}
      >
        {iconName ? (
          <IconSymbol size={20} name={iconName} color={iconColor} style={styles.icon} />
        ) : null}
        <TextInput
          ref={ref}
          style={[styles.input, isMultiline && styles.inputMultiline, style]}
          placeholderTextColor={RitmosColors.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textInputProps}
        />
        {trailingElement}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
});

FormField.displayName = 'FormField';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 360,
    marginBottom: RitmosSpacing.md,
  },
  label: {
    fontSize: RitmosTypography.scale.labelMedium.fontSize,
    fontFamily: RitmosTypography.fonts.primary,
    fontWeight: '500',
    color: RitmosColors.text.onBackground,
    marginBottom: RitmosSpacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    backgroundColor: RitmosColors.surface,
    borderRadius: RitmosBorder.radius.lg,
    paddingHorizontal: RitmosSpacing.md,
    gap: RitmosSpacing.sm,
    ...RitmosElevation.level2,
  },
  inputWrapperMultiline: {
    alignItems: 'flex-start',
    paddingVertical: RitmosSpacing.md,
  },
  inputWrapperFocused: {
    borderColor: RitmosColors.primary,
    borderWidth: RitmosBorder.width.medium,
  },
  inputWrapperError: {
    borderColor: RitmosColors.error,
    borderWidth: RitmosBorder.width.medium,
  },
  icon: {
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: RitmosTypography.scale.bodyLarge.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.text.onBackground,
    paddingVertical: RitmosSpacing.sm,
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: RitmosTypography.scale.bodySmall.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.error,
    marginTop: RitmosSpacing.xs,
    marginLeft: RitmosSpacing.sm,
  },
});
