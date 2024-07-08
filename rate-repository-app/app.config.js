import 'dotenv/config';

export default {
  
  "expo": {
    "name": "rate-repository-app-rocky",
    extra: {
      env: process.env.ENV,
      APOLLO_URI:process.env.APOLLO_URI,
      "eas": {
        "projectId": "e5f9b321-716e-4046-9d8e-3405451d7863"
      }
    },
  
"platforms": [
  "ios",
  "android",
  "web"
],

    "slug": "rate-repository-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.rocky.ragul",
      "versionCode": 1

    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
     
  }
}