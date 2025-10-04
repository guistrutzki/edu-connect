import {
  FontWeight,
  Typography,
} from '@components/atoms/Typography/Typography.types'

export type ThemeType = typeof theme

export const theme = {
  COLORS: {
    // Primary brand colors
    $primary: '#1a1a2e',
    $secondary: '#01ED98',
    $transparent: 'transparent',

    // Grayscale palette
    '$color-grayscale-1': '#FFFFFF',
    '$color-grayscale-2': '#F5F5F5',
    '$color-grayscale-3': '#E0E0E0',
    '$color-grayscale-4': '#B0B0B0',
    '$color-grayscale-5': '#808080',
    '$color-gray-brand': '#454041',
    '$color-gray-dark': '#2E332D',

    // Gray scale
    '$gray-100': '#F5F5F5',
    '$gray-200': '#E0E0E0',
    '$gray-300': '#B0B0B0',
    '$gray-400': '#808080',
    '$gray-500': '#505050',
    '$gray-600': '#404040',
    '$gray-700': '#303030',
    '$gray-800': '#202020',
    '$gray-900': '#1a1a2e',

    // Blue palette
    '$blue-10': '#F8F9FB',
    '$blue-50': '#F0F2F6',
    '$blue-100': '#D9DEE8',
    '$blue-500': '#3B82F6',
    '$blue-600': '#2563EB',
    '$blue-700': '#1D4ED8',

    // Yellow/Orange palette
    '$yellow-100': '#FEEBC8',
    '$yellow-500': '#EFD214',
    '$yellow-700': '#975A16',
    '$orange-500': '#F97316',
    '$orange-600': '#EA580C',

    // Green palette
    '$green-50': '#EAFBF3',
    '$green-100': '#DFFCF2',
    '$green-200': '#CCEAEA',
    '$green-300': '#B6F1E1',
    '$green-400': '#8EE4B8',
    '$green-500': '#01ED98',
    '$green-600': '#1BA874',
    '$green-700': '#1BA874',
    '$green-900': '#10825F',

    // Background colors
    '$bg-primary': '#1a1a2e',
    '$bg-secondary': '#16213e',
    '$bg-tertiary': '#0f3460',
    '$bg-light': '#FFFFFF',
    '$bg-card': '#2a2a3e',

    // Status colors
    '$red-100': '#FED7D7',
    '$color-error': '#DC5C55',
    '$red-500': '#EF4444',
    '$red-700': '#822727',
    '$color-info': '#3B82F6',
    '$color-success': '#01ED98',
    '$color-warning': '#F59E0B',

    // Purple palette (complementary to primary)
    '$purple-50': '#F3EFFA',
    '$purple-100': '#E4DAF5',
    '$purple-300': '#C3A9E8',
    '$purple-500': '#8C52FF',
    '$purple-600': '#6C3DC6',
    '$purple-700': '#5E2F9F',
    '$purple-800': '#432774',
    '$purple-900': '#321257',

    // New vibrant colors for colorful design
    '$pink-100': '#FCE7F3',
    '$pink-300': '#F9A8D4',
    '$pink-500': '#EC4899',
    '$pink-600': '#DB2777',
    
    '$cyan-100': '#CFFAFE',
    '$cyan-300': '#67E8F9',
    '$cyan-500': '#06B6D4',
    '$cyan-600': '#0891B2',
    
    '$indigo-100': '#E0E7FF',
    '$indigo-300': '#A5B4FC',
    '$indigo-500': '#6366F1',
    '$indigo-600': '#4F46E5',
    
    '$emerald-100': '#D1FAE5',
    '$emerald-300': '#6EE7B7',
    '$emerald-500': '#10B981',
    '$emerald-600': '#059669',
    
    '$rose-100': '#FFE4E6',
    '$rose-300': '#FDA4AF',
    '$rose-500': '#F43F5E',
    '$rose-600': '#E11D48',
    
    '$amber-100': '#FEF3C7',
    '$amber-300': '#FCD34D',
    '$amber-500': '#F59E0B',
    '$amber-600': '#D97706',
    
    '$violet-100': '#EDE9FE',
    '$violet-300': '#C4B5FD',
    '$violet-500': '#8B5CF6',
    '$violet-600': '#7C3AED',

    // Gradient colors
    '$gradient-blue-start': '#E0F2FE',
    '$gradient-blue-end': '#F0F9FF',
    '$gradient-purple-start': '#F3E8FF',
    '$gradient-purple-end': '#FAF5FF',
    '$gradient-green-start': '#ECFDF5',
    '$gradient-green-end': '#F0FDF4',
    '$gradient-pink-start': '#FDF2F8',
    '$gradient-pink-end': '#FEF7FF',

    // Autism-friendly colors (suaves e acolhedoras)
    '$autism-blue': '#A7C7E7',      // Azul pastel
    '$autism-mint': '#C4E3CB',      // Verde-menta
    '$autism-lavender': '#D7C6E9',  // Lavanda suave
    '$autism-gray': '#F0F0F0',      // Cinza-claro
    '$autism-peach': '#F7D9C4',     // Pêssego claro

    // Autism-friendly gradients
    '$autism-gradient-1-start': '#A7C7E7',
    '$autism-gradient-1-end': '#F0F0F0',
    '$autism-gradient-2-start': '#C4E3CB',
    '$autism-gradient-2-end': '#F7D9C4',
    '$autism-gradient-3-start': '#D7C6E9',
    '$autism-gradient-3-end': '#A7C7E7',
  },

  typography: {
    '$font-description-xs': Typography.DESCRIPTION_XS,
    '$font-description-sm': Typography.DESCRIPTION_SM,
    '$font-description-md': Typography.DESCRIPTION_MD,
    '$font-description-lg': Typography.DESCRIPTION_LG,
    '$font-title-xs': Typography.TITLE_XS,
    '$font-title-sm': Typography.TITLE_SM,
    '$font-title-md': Typography.TITLE_MD,
    '$font-brand': Typography.BRAND,
  },

  fontWeight: {
    $regular: FontWeight.REGULAR,
    $medium: FontWeight.MEDIUM,
    $bold: FontWeight.BOLD,
  },

  FONTS: {
    [FontWeight.REGULAR]: 'Poppins_400Regular',
    [FontWeight.MEDIUM]: 'Poppins_500Medium',
    [FontWeight.BOLD]: 'Poppins_700Bold',
  },

  // Fallback fonts for when Poppins is not loaded
  FALLBACK_FONTS: {
    [FontWeight.REGULAR]: 'System',
    [FontWeight.MEDIUM]: 'System',
    [FontWeight.BOLD]: 'System',
  },
}
