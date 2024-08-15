// Do not remove, import is used as type and needed as such
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Theme } from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    panel: React.CSSProperties['color'];
    avatar: React.CSSProperties['color'];
    channel: React.CSSProperties['color'];
  }
  interface TypeText {
    highlight: React.CSSProperties['color'];
    black: React.CSSProperties['color'];
  }
}

declare module '@mui/material/styles/createTheme' {
  // eslint-disable-next-line no-shadow
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'];
      iconSize: React.CSSProperties['width'];
    };
    panel: {
      leftWidth: React.CSSProperties['width'];
      rightWidth: React.CSSProperties['width'];
    };
    header: {
      height: React.CSSProperties['height'];
    };
    chat: {
      input: {
        height: React.CSSProperties['height'];
        lineHeight: React.CSSProperties['height'];
      };
      header: {
        background: {
          dark: React.CSSProperties['backgroundColor'];
          darker: React.CSSProperties['backgroundColor'];
        };
        divider: {
          width: React.CSSProperties['borderWidth'];
          color: {
            primary: React.CSSProperties['borderColor'];
            accent: React.CSSProperties['borderColor'];
          };
        };
        textColor: React.CSSProperties['color'];
      };
    };
    flightGroup: {
      card: {
        height: React.CSSProperties['height'];
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width'];
      iconSize?: React.CSSProperties['width'];
    };
    panel?: {
      leftWidth?: React.CSSProperties['width'];
      rightWidth?: React.CSSProperties['width'];
    };
    header?: {
      height?: React.CSSProperties['height'];
    };
    chat?: {
      input?: {
        height?: React.CSSProperties['height'];
        lineHeight: React.CSSProperties['height'];
      };
      header?: {
        background: {
          dark?: React.CSSProperties['backgroundColor'];
          darker?: React.CSSProperties['backgroundColor'];
        };
        divider?: {
          width?: React.CSSProperties['borderWidth'];
          color?: {
            primary?: React.CSSProperties['borderColor'];
            accent?: React.CSSProperties['borderColor'];
          };
        };
        textColor?: React.CSSProperties['color'];
      };
    };
    flightGroup?: {
      card: {
        height: React.CSSProperties['height'];
      };
    };
  }
}
