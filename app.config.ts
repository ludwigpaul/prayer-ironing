import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
    name: 'Prayer Ironing',
    slug: 'prayer-ironing',
    scheme: 'prayerironing',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/app-logo.png',
    splash: {
        image: './assets/app-logo.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    userInterfaceStyle: 'light',
    extra: {
        EXPO_PUBLIC_APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
        EXPO_PUBLIC_APPWRITE_PROJECT_ID: '68e571a8001f61edec63',
        EXPO_PUBLIC_DB_ID: '68e57260001e846afcf2',
        EXPO_PUBLIC_PROFILES_ID: 'profiles',
        EXPO_PUBLIC_PLANS_ID: 'YOUR_PLANS_COLLECTION_ID',
        EXPO_PUBLIC_SESSIONS_ID: 'YOUR_SESSIONS_COLLECTION_ID',
        EXPO_PUBLIC_REFLECTIONS_ID: 'YOUR_REFLECTIONS_COLLECTION_ID',
    }
};

export default config;
