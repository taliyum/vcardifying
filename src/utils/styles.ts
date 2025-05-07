import { StyleOptions } from '../types';

export const getColorsByScheme = (styleOptions: StyleOptions): Record<string, string> => {
  const { colorScheme, customColors } = styleOptions;
  
  if (colorScheme === 'custom') {
    return customColors;
  }
  
  const colorSchemes = {
    blue: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      accent: '#2563EB',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    green: {
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#059669',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    purple: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      accent: '#7C3AED',
      background: '#FFFFFF',
      text: '#1F2937',
    }
  };
  
  return colorSchemes[colorScheme] || colorSchemes.blue;
};

export const getFontClass = (font: StyleOptions['font']): string => {
  const fonts = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  };
  
  return fonts[font] || fonts.sans;
};

export const getLayoutClasses = (layout: StyleOptions['layout']): Record<string, string> => {
  const layouts = {
    classic: {
      container: 'rounded-lg shadow-md overflow-hidden',
      header: 'p-6',
      body: 'p-6',
      imageContainer: 'w-32 h-32 mx-auto rounded-full overflow-hidden',
    },
    modern: {
      container: 'rounded-2xl shadow-lg overflow-hidden',
      header: 'p-8',
      body: 'p-6 rounded-t-3xl -mt-6 relative',
      imageContainer: 'w-36 h-36 rounded-xl overflow-hidden absolute -top-20 left-6 border-4',
    },
    minimal: {
      container: 'overflow-hidden border rounded-md',
      header: 'p-4',
      body: 'p-6',
      imageContainer: 'w-24 h-24 rounded-full overflow-hidden mr-4 float-right -mt-12',
    },
  };
  
  return layouts[layout] || layouts.classic;
};