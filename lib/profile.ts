import { Account, Databases, ID, Permission, Role, Query } from 'appwrite';

const DB_ID = process.env.EXPO_PUBLIC_DB_ID!;
const PROFILES_ID = process.env.EXPO_PUBLIC_PROFILES_ID!;

/**
 * Ensure the current user has a profile document.
 * Creates one with owner-only permissions if none exists.
 */
export async function ensureProfile(account: Account, db: Databases) {
    const me = await account.get(); // throws if not logged in
    const userId = me.$id;

    // Look up existing profile by userId
    const existing = await db.listDocuments(DB_ID, PROFILES_ID, [
        Query.equal('userId', userId),
        Query.limit(1),
    ]);
    if (existing.total > 0) {
        return existing.documents[0];
    }

    // Create a new profile with owner permissions
    const displayName =
        me.name || (me.email ? me.email.split('@')[0] : 'New User');

    const doc = await db.createDocument(
        DB_ID,
        PROFILES_ID,
        ID.unique(),
        {
            userId,
            displayName,
            timeZone:
                Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
            themes: [],
            // prayerStyle, audioPref can be set later in onboarding
        },
        [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ]
    );

    return doc;
}
