export const ButtonStyles = {
  baseStyle: {
    fontWeight: 'bold',
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 3,
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 4,
    },
  },
  variants: {
    solidBlue : {
        bg: 'blue.primary',
        color: 'white',
        _hover: {
          bg: 'blue.dark',
          boxShadow: 'md',
        }
    },
    solidPink : {
        bg: 'pink.primary',
        color: 'white',
        _hover: {
          bg: 'pink.dark',
          boxShadow: 'md',
        }
    },
    outlineBlue: {
      bg: 'white',
      border: '2px solid',
      borderColor: 'blue.primary',
      color: 'blue.primary',
      _hover: {
        bg: 'blue.light',
        boxShadow: 'md',
      }
    },
    outlinePink: {
      bg: 'white',
      border: '2px solid',
      borderColor: 'pink.primary',
      color: 'pink.primary',
      _hover: {
        bg: 'pink.light',
        boxShadow: 'md',
      }
    },
  },
  defaultProps: {
    size: 'md',
    borderRadius: 'lg',
    variant: 'solid',
  },
}