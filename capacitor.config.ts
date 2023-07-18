import { CapacitorConfig } from '@capacitor/cli';


//voir https://capacitorjs.com/docs/config
const config: CapacitorConfig = {
  appId: 'com.NfluTVGallery',
  appName: 'NfluTVGallery',
  webDir: 'dist',

  server: {
    androidScheme: 'https'
  },
  loggingBehavior: "debug",
  android :{
    backgroundColor: "darkred",
    buildOptions:{
      keystorePath:"C:\\Users\\hhoar\\Mon Drive\\Work\\NFluent\\nfluent_key",
      keystorePassword:"hh4271!!",
      releaseType: "AAB"
    }
  },
  includePlugins:[]
};

export default config;
