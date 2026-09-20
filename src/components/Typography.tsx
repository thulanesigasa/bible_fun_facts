import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

const replaceEmDashes = (text: string) => {
  if (!text) return text;
  return text.replace(/—/g, ' - ');
};

export const Text: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = colors.text,
  weight,
  align = 'left',
  style,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'h1': return styles.h1;
      case 'h2': return styles.h2;
      case 'h3': return styles.h3;
      case 'caption': return styles.caption;
      case 'label': return styles.label;
      case 'body':
      default:
        return styles.body;
    }
  };

  const processChildren = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return replaceEmDashes(node);
    }
    if (Array.isArray(node)) {
      return node.map((child) => (typeof child === 'string' ? replaceEmDashes(child) : child));
    }
    return node;
  };

  return (
    <RNText
      style={[
        getVariantStyle(),
        { color, textAlign: align },
        weight ? { fontWeight: weight as any } : undefined,
        style,
      ]}
      {...props}
    >
      {processChildren(children)}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '800', // Making it extra bold for iOS-style headers
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.textSecondary,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
