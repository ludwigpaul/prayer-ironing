// lib/appwrite.ts
import { Client, Account, Databases } from 'appwrite';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {}; // works in dev & Expo Go

const endpoint = extra.EXPO_PUBLIC_APPWRITE_ENDPOINT as string | undefined;
const project  = extra.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string | undefined;

if (!endpoint || !project) {
    throw new Error(
        'Missing Appwrite config. Set EXPO_PUBLIC_APPWRITE_ENDPOINT and EXPO_PUBLIC_APPWRITE_PROJECT_ID in app.config.ts -> extra'
    );
}

export const client = new Client().setEndpoint(endpoint).setProject(project);
export const account = new Account(client);
export const db = new Databases(client);

export const IDs = {
    DB: extra.EXPO_PUBLIC_DB_ID as string | undefined,
    PROFILES: extra.EXPO_PUBLIC_PROFILES_ID as string | undefined,
    PLANS: extra.EXPO_PUBLIC_PLANS_ID as string | undefined,
    SESSIONS: extra.EXPO_PUBLIC_SESSIONS_ID as string | undefined,
    REFLECTIONS: extra.EXPO_PUBLIC_REFLECTIONS_ID as string | undefined,
};