import { createTheme } from '@mui/material/styles';
import { createStyled } from '@mui/system';

import './AugmentThemeOptions';

const defaultTheme = createTheme({
  appDrawer: {
    width: '88px',
    iconSize: '24px',
  },
  panel: {
    leftWidth: '458px',
    rightWidth: '370px',
  },
  header: {
    height: '80px',
  },
  chat: {
    input: {
      height: '120px',
      lineHeight: '20px',
    },
    header: {
      background: {
        darker: '#001F50',
        dark: '#23457D',
      },
      divider: {
        color: {
          primary: '#e1e1e1',
          accent: '#ACAEB5',
        },
        width: '1px',
      },
      textColor: '#FFFFFF',
    },
  },
  flightGroup: {
    card: {
      height: '88px',
    },
  },
  typography: {
    h1: {
      fontWeight: 300,
      fontSize: '96px',
    },
    h2: {
      fontWeight: 300,
      fontSize: '60px',
    },
    h3: {
      fontWeight: 400,
      fontSize: '48px',
    },
    h4: {
      fontWeight: 400,
      fontSize: '34px',
    },
    h5: {
      fontWeight: 400,
      fontSize: '24px',
    },
    h6: {
      fontWeight: 500,
      fontSize: '20px',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '16px',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '14px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '16px',
    },
    body2: {
      fontWeight: 400,
      fontSize: '14px',
    },
    button: {
      fontWeight: 500,
      fontSize: '14px',
      textTransform: 'uppercase',
    },
    caption: {
      fontWeight: 400,
      fontSize: '12px',
    },
    overline: {
      fontWeight: 500,
      fontSize: '10px',
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: '#001F50', // primary 1
      contrastText: '#FFFFFF',
      dark: '#23457D', // primary 2, it is actually lighter than main
      light: '#5570AD', // primary 3
    },
    secondary: {
      light: '#B7CEFF', // Secondary 2
      main: '#859DDD', // Secondary 1
      dark: '#546FAB', // Secondary 3
      contrastText: '#FFFFFF',
    },
    text: {
      highlight: '#00B8E0',
      black: '#212121',
    },
    error: {
      main: '#FF555E',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#EBB400',
      contrastText: '#000000',
    },
    success: {
      main: '#72CCCC',
      contrastText: '#000000',
    },
    mode: 'light',
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    background: {
      default: '#F8F8F8',
      paper: '#F8F8F8',
      panel: '#F5F6FA',
      avatar: '#D9E5FF',
      channel: '#EFF0F5',
    },
    grey: {
      50: '#F8F8F8',
      100: '#E1E1E1',
      300: '#C3C3C3',
      400: '#ACAEB5',
      500: '#919191',
      600: '#818181',
      700: '#6E6E6E',
    },
  },
  components: {
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiSnackbar: {
      defaultProps: {
        autoHideDuration: 6000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      },
    },
  },
});

// const customTheme = createAppTheme({status: { danger: orange[500] } })

export default defaultTheme;

export const styled = createStyled({ defaultTheme });
