# 🕊️ Prayer Ironing

A cross-platform prayer meditation app built with **React Native**, **Expo**, and **Appwrite**.  
It guides users through themed prayer sessions with scripture, audio, silence timers, and reflection tracking — designed to promote spiritual mindfulness and connection.

---

## 🚀 Tech Stack

- **Frontend:** React Native (Expo Go, TypeScript)
- **Backend:** Appwrite Cloud (Authentication, Database)
- **State Management:** Zustand
- **Navigation:** React Navigation (Native Stack)
- **Audio & Notifications:** Expo AV + Expo Notifications

---

## 🧱 Project Structure

prayer-ironing/
├── app/
│ ├── _layout.tsx # Navigation container
│ ├── index.tsx # Home (Dashboard)
│ ├── onboarding.tsx # Onboarding personalization
│ ├── session.tsx # Scripture + Audio + Timer
│ ├── reflection.tsx # Post-session reflection
│ ├── partners.tsx # Partner matching feed
│ ├── auth.tsx # Authentication screen
│
├── components/
│ ├── AudioPlayer.tsx # Music / voice / silence control
│ ├── SilenceTimer.tsx # Countdown timer component
│ ├── ScriptureBlock.tsx # (planned) Scripture display block
│ ├── PartnerCard.tsx # (planned) partner list cards
│
├── lib/
│ ├── appwrite.ts # Appwrite client setup
│ ├── profile.ts # Profile creation helper
│ ├── store.ts # Zustand global state
│
├── hooks/ # (future custom hooks)
├── theme/ # (colors, typography)
├── assets/
│ ├── audio/ # Optional local audio
│ └── fonts/
│
├── app.config.ts # Expo configuration + environment vars
├── package.json
├── tsconfig.json
├── README.md


---

## 🧩 Database Structure (Appwrite)

### 🗂️ Database: `main`

| Collection | Description | Row Security | Permissions |
|-------------|--------------|---------------|--------------|
| **profiles** | User profiles & preferences | ✅ Enabled | Owner only |
| **prayerPlans** | Public prayer plans & scriptures | ❌ Disabled | Read: Anyone |
| **sessions** | User prayer session logs | ✅ Enabled | Owner only |
| **reflections** | Post-session reflections | ✅ Enabled | Owner only |
| **partners** | Discoverable partner data | ❌ Disabled | Read: Anyone |
| **invites** | Partner invitations | ✅ Enabled | Both participants |

---

### 🧾 Collection: `profiles`
| Field | Type | Notes |
|--------|------|-------|
| `userId` | String | Unique user identifier |
| `displayName` | String | Display name |
| `timeZone` | String | User’s timezone |
| `prayerStyle` | Enum (`silent`, `guided`, `music`, `partnered`) | Preferred style |
| `audioPref` | Enum (`music`, `voice`, `silence`) | Default audio mode |
| `themes` | String[] | Favorite themes |

✅ Index: `userId_unique` (Key, Unique)

---

### 📖 Collection: `prayerPlans`
| Field | Type | Notes |
|--------|------|-------|
| `title` | String | Plan title (e.g., Gratitude) |
| `scriptures` | String[] | List of verse references |
| `order` | Integer | Display order |
| `isDefault` | Boolean | Default plan flag |

🟢 Publicly readable (no auth needed)

---

### ⏱️ Collection: `sessions`
| Field | Type | Notes |
|--------|------|-------|
| `userId` | String | Owner user ID |
| `theme` | String | Theme of the session |
| `scriptureRef` | String | Verse reference |
| `audioMode` | Enum (`music`, `voice`, `silence`) | Playback mode |
| `durationSec` | Integer | Duration in seconds |
| `startedAt` | Datetime | Start timestamp |
| `completed` | Boolean | Whether finished |

✅ Row Security: Enabled (owner only)

---

### 💭 Collection: `reflections`
| Field | Type | Notes |
|--------|------|-------|
| `sessionId` | String | Link to session |
| `mood` | Integer (1–5) | User’s emotional rating |
| `notes` | String | Reflection text |
| `tags` | String[] | Optional labels |

✅ Row Security: Enabled (owner only)

---

### 👥 Collection: `partners`
| Field | Type | Notes |
|--------|------|-------|
| `userId` | String | Linked profile |
| `themes` | String[] | Shared prayer interests |
| `style` | String | Partner’s prayer style |
| `timeZone` | String | Timezone for matching |
| `status` | Enum (`available`, `in_session`, `offline`) | Availability |

🟢 Publicly readable (feed view)

---

### ✉️ Collection: `invites`
| Field | Type | Notes |
|--------|------|-------|
| `fromUserId` | String | Sender ID |
| `toUserId` | String | Recipient ID |
| `theme` | String | Requested theme |
| `when` | Datetime | Optional schedule |
| `state` | Enum (`pending`, `accepted`, `declined`) | Invite status |

✅ Shared between both users (permissions granted to both)

---

## ⚙️ Environment Variables (`app.config.ts`)
```ts
extra: {
  EXPO_PUBLIC_APPWRITE_ENDPOINT: 'https://cloud.appwrite.io/v1',
  EXPO_PUBLIC_APPWRITE_PROJECT_ID: '<YOUR_PROJECT_ID>',
  EXPO_PUBLIC_DB_ID: '<DATABASE_ID>',
  EXPO_PUBLIC_PROFILES_ID: '<PROFILES_COLLECTION_ID>',
  EXPO_PUBLIC_PLANS_ID: '<PRAYERPLANS_COLLECTION_ID>',
  EXPO_PUBLIC_SESSIONS_ID: '<SESSIONS_COLLECTION_ID>',
  EXPO_PUBLIC_REFLECTIONS_ID: '<REFLECTIONS_COLLECTION_ID>',
}
```

🧭 Setup & Run
1. Install dependencies:
   ```bash
   npm install
   
2. Start the Expo development server:
   ```bash
   npx expo start
   ```

3. Scan QR code with Expo Go on your device or use an emulator.
4. Environment Setup
   - Add the appwrite keys to app.config.ts
   - Create your appwrite database and collections as per the structure above.

🧑‍💻 Development Notes

- Built & tested in WebStorm IDE.

- Uses TypeScript for type safety.

- Handles auth with Appwrite’s email/password session.

- Future support for Apple/Google OAuth and Appwrite Functions.

- Recommended to use Tunnel mode when testing on iOS for Expo Go connectivity:
  npx expo start --tunnel

📈 Roadmap

- Add progress tracker & streaks

- Daily prayer notifications

- Group prayer rooms (Appwrite Realtime)

- Personal journal (private collection)

- Mood-based theme suggestions
   