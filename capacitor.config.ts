import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nath7098.pawdata',
  appName: 'PawData',
  webDir: 'dist',
  ios: {
    bundleIdentifier: 'com.nath7098.pawdata',
    splash: {
      backgroundColor: '#ffc300',
      launchImages: [
        {
          width: 1125,
          height: 2436,
          scale: '3x',
          src: '/splash.png'
        }
      ]
    },
    splashScreenScale: 3
  },
  plugins: {
    App: {
      keepBrowserTabs: true
    }
  }
};

export default config;
