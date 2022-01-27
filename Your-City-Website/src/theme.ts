import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

// const defaultTheme = createMuiTheme();

const polymathicTheme = createMuiTheme({
  overrides: {},
  palette: {
    action: {
      hoverOpacity: 0.2,
    },
    primary: {
      contrastText: '#FFF',
      dark: '#406DAC',
      light: '#7CAFF8',
      main: '#5C9CF7',
    },
    secondary: {
      dark: '#5EA281',
      light: '#40ECC7',
      main: '#87E8B9',
    },
    error: {
      main: '#B8618B',
    },
  },
  props: {
    MuiButton: {
      color: 'primary',
      variant: 'contained',
    },
    MuiTextField: {
      fullWidth: true,
      variant: 'filled',
      InputLabelProps: {
        shrink: true,
      },
      SelectProps: {
        native: true,
      },
    },
  },
  typography: {
    h1: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 60,
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 54,
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 44,
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 30,
    },
    h5: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 22,
    },
    h6: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 16,
    },
    body1: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 14,
    },
    body2: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 14,
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 20,
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 16,
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 14,
      fontWeight: 600,
    },
    caption: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 12,
      fontWeight: 600,
    },
    overline: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 18,
    },
  },
});

const responsivePolymathicTheme = responsiveFontSizes(polymathicTheme);

export default responsivePolymathicTheme;
