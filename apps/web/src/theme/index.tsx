// theme.ts
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    // AtelierHub palette — rich, cozy, a bit theatrical
    primary: '#5A1F4A', // Plum (brand)
    secondary: '#1F6B6F', // Deep teal
    accent: '#E6A700', // Saffron pop
    success: '#2BA3A1', // Sea-emerald
    danger: '#D64550', // Carmine red
    warning: '#E9B949', // Honey
    info: '#3C8DAD', // Cerulean

    background: '#FFF7F1', // Cream paper
    backgroundAlt: '#F4ECE6', // Warmer paper
    surface: '#F7F1EC', // Card surface
    border: '#E6D9CF', // Soft line

    text: {
      primary: '#2A1E2B', // Ink plum
      secondary: '#4B3A4A', // Muted plum
      muted: '#7A6A77', // Dusty mauve
      inverse: '#FFFFFF',
    },
  },

  typography: {
    // Fonts you asked for:
    // Funnel Sans (body), Cherry Cream Soda (display), Meow Script (accent/signature)
    fontFamily: {
      body: "'Funnel Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif",
      heading: "'Cherry Cream Soda', 'Funnel Sans', system-ui, sans-serif",
      mono: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      accent: "'Meow Script', 'Cherry Cream Soda', cursive",
    },
    fontSize: {
      xs: '0.75rem', // 12
      sm: '0.875rem', // 14
      md: '1rem', // 16
      lg: '1.125rem', // 18
      xl: '1.25rem', // 20
      '2xl': '1.5rem', // 24
      '3xl': '1.875rem', // 30
      '4xl': '2.25rem', // 36
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },

  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  shadows: {
    xs: '0 1px 2px rgba(26, 12, 22, 0.06)',
    sm: '0 2px 6px rgba(26, 12, 22, 0.08)',
    md: '0 6px 16px rgba(26, 12, 22, 0.10)',
    lg: '0 12px 24px rgba(26, 12, 22, 0.14)',
    xl: '0 24px 40px rgba(26, 12, 22, 0.18)',
  },

  radius: {
    none: '0px',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modalBackdrop: 1200,
    modal: 1300,
    tooltip: 1400,
  },
};

export default theme;
