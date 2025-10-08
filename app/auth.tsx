// app/auth.tsx
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { account, db, IDs } from '../lib/appwrite';
import { Account, Databases, ID, Permission, Role, Query } from 'appwrite';

const DB_ID = IDs.DB!;
const PROFILES_ID = IDs.PROFILES!;
if (!DB_ID || !PROFILES_ID) {
    throw new Error('Missing DB/collection IDs. Set EXPO_PUBLIC_DB_ID and EXPO_PUBLIC_PROFILES_ID in app.config.ts -> extra');
}

async function ensureProfile(account: Account, db: Databases) {
    const me = await account.get();
    const userId = me.$id;

    const existing = await db.listDocuments(DB_ID, PROFILES_ID, [
        Query.equal('userId', userId),
        Query.limit(1),
    ]);
    if (existing.total > 0) return existing.documents[0];

    const displayName = me.name || (me.email ? me.email.split('@')[0] : 'New User');

    return db.createDocument(
        DB_ID,
        PROFILES_ID,
        ID.unique(),
        {
            userId,
            displayName,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
            themes: [],
        },
        [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ]
    );
}

export default function Auth({ navigation }: any) {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await account.get(); // already signed in? skip to onboarding
                navigation.replace('Onboarding');
            } catch {
                // not signed in — stay here
            }
        })();
    }, []);

    const validate = () => {
        const trimmed = email.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
            Alert.alert('Invalid email', 'Please enter a valid email address.');
            return false;
        }
        if (password.length < 6) {
            Alert.alert('Weak password', 'Password must be at least 6 characters.');
            return false;
        }
        return true;
    };

    const afterAuth = async () => {
        await ensureProfile(account, db);
        navigation.replace('Onboarding');
    };

    const signIn = async () => {
        if (!validate()) return;
        setBusy(true);
        try {
            try { await account.deleteSession('current'); } catch {}
            await account.createEmailPasswordSession(email.trim(), password);
            await afterAuth();
        } catch (e: any) {
            Alert.alert('Sign-in failed', e?.message ?? 'Check your credentials.');
        } finally {
            setBusy(false);
        }
    };

    const signUp = async () => {
        if (!validate()) return;
        setBusy(true);
        try {
            await account.create('unique()', email.trim(), password);
            await account.createEmailPasswordSession(email.trim(), password);
            await afterAuth();
        } catch (e: any) {
            Alert.alert('Sign-up failed', e?.message ?? 'Please try again.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={{ flex: 1, padding: 20, justifyContent: 'center', gap: 16 }}>
                <Text style={{ fontSize: 28, fontWeight: '700', textAlign: 'center' }}>
                    Prayer Ironing
                </Text>
                <Text style={{ fontSize: 16, opacity: 0.7, textAlign: 'center' }}>
                    {mode === 'signin' ? 'Sign in to continue' : 'Create your account'}
                </Text>

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    textContentType="username"
                    style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
                />

                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    textContentType="password"
                    style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
                />

                <Button
                    title={busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
                    onPress={mode === 'signin' ? signIn : signUp}
                    disabled={busy}
                />
                {busy ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}

                <TouchableOpacity
                    onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                    disabled={busy}
                    style={{ paddingVertical: 12 }}
                >
                    <Text style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
                        {mode === 'signin' ? "Don't have an account? Sign up" : 'Have an account? Sign in'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
