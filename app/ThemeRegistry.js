'use client';

import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const clientSideEmotionCache = createEmotionCache();

export default function ThemeRegistry({ children }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
