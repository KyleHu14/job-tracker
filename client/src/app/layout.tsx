import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core';

export const metadata = {
  title: 'Job Tracker V2',
  description: 'I am using Mantine with Next.js!',
};

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'indigo',
  colors: {
    indigo: [
      '#edf2ff',
      '#dbe4ff',
      '#bac8ff',
      '#91a7ff',
      '#748ffc',
      '#5c7cfa',
      '#4c6ef5',
      '#4263eb',
      '#3b5bdb',
      '#364fc7',
    ],
  },
});

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
