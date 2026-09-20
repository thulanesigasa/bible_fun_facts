# exégeomai (ἐξηγέομαι)

<p align="left">
  <img src="https://img.shields.io/badge/Expo%20SDK-57.0-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 57" />
  <img src="https://img.shields.io/badge/React%20Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native 0.86" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Supabase-Auth%20&%20Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase Backend" />
  <img src="https://img.shields.io/badge/CI%2FCD-Rule%2021%20Compliant-10B981?style=for-the-badge&logo=githubactions&logoColor=white" alt="Rule 21 Compliant" />
  <img src="https://img.shields.io/badge/EAS%20Channels-Production%20%7C%20Preview-000000?style=for-the-badge&logo=expo&logoColor=white" alt="EAS Channels" />
  <img src="https://img.shields.io/badge/Outer%20Release-v1.0.2-2563EB?style=for-the-badge&logo=android&logoColor=white" alt="Outer Release v1.0.2" />
  <img src="https://img.shields.io/badge/EAS%20OTA%20Updates-Active%20(v1.0.1)-000000?style=for-the-badge&logo=expo&logoColor=white" alt="EAS OTA Updates" />
  <img src="https://img.shields.io/badge/Security-Kotlin%20FLAG__SECURE-DC2626?style=for-the-badge&logo=android&logoColor=white" alt="Kotlin FLAG_SECURE" />
  <img src="https://img.shields.io/badge/Legal-Terms%20&%20Privacy%20Screens-475569?style=for-the-badge" alt="Terms & Privacy Screens" />
  <img src="https://img.shields.io/badge/GitHub%20Actions-Compilation%20&%20OTA-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Tab%20Architecture-Floating%20Pill%20280px-D97706?style=for-the-badge" alt="Floating Pill Tab Bar" />
  <img src="https://img.shields.io/badge/Design%20System-60--30--10%20Light-F8FAFC?style=for-the-badge" alt="60-30-10 Design System" />
  <img src="https://img.shields.io/badge/Keyboard%20Avoidance-Reactive%20Auto--Scroll-0284C7?style=for-the-badge" alt="Reactive Keyboard Auto-Scroll" />
  <img src="https://img.shields.io/badge/Legal%20Typography-100%25%20Uniform-64748B?style=for-the-badge" alt="100% Uniform Legal Typography" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License MIT" />
</p>

> **Strong's Greek 1834**: *ἐξηγέομαι* (*exēgeomai*) — from *ἐκ* (out) and *ἡγέομαι* (to lead): **"to lead out, unfold, declare, interpret, draw out the true meaning."** As recorded in John 1:18: *"No one has seen God at any time; the only begotten Son, who is in the bosom of the Father, He has explained / declared (exēgēsato) Him."*

**exégeomai** is a modern, high-performance React Native & Expo mobile application exploring ancient historical context, cultural customs, original language deep dives (Strong's Concordance), and multi-lens daily devotionals from Sacred Scripture.

---

## Architecture Overview

```mermaid
graph TD
    App["App.tsx"] --> Providers["UserProvider + SafeAreaProvider"]
    Providers --> Nav["AppNavigator"]
    Providers --> UpdateModal["UpdateModal (Update Now / Remind Me Later)"]
    Nav --> Welcome["WelcomeScreen (3-Step Onboarding Flow)"]
    Welcome --> Auth["AuthScreen (Direct-Body Layout + Keyboard Next + FLAG_SECURE)"]
    Auth --> Terms["TermsOfServiceScreen (13 Theological & Legal Sections)"]
    Auth --> Privacy["PrivacyPolicyScreen (11 Data Protection Sections)"]
    Nav --> Tabs["Rule 20 Floating Pill Tab Bar (280px)"]
    
    Tabs --> DiscoverStack["Discover Stack"]
    Tabs --> WOTDScreen["Word of the Day (4 Lenses)"]
    Tabs --> ScripturesStack["Scriptures Stack"]
    Tabs --> SearchStack["Search Stack"]
    Tabs --> ProfileStack["Profile Stack"]
    
    DiscoverStack --> DiscoverMain["DiscoverScreen"]
    DiscoverStack --> FactDetails["FactDetailsScreen (PageSheet)"]
    
    ScripturesStack --> ScripturesMain["ScripturesScreen"]
    ScripturesStack --> ScriptureDetails["ScriptureDetailsScreen (PageSheet)"]
    
    SearchStack --> SearchMain["SearchScreen"]
    ProfileStack --> ProfileMain["ProfileScreen (Settings, Translation, Streak)"]
    ProfileStack --> FavoritesMain["FavoritesScreen (Saved Collection)"]
    ProfileStack --> Terms
    ProfileStack --> Privacy
    
    subgraph DataUpdates["Data, State, Auth and Updates"]
        AsyncStorage[("AsyncStorage")] <--> UserContext["UserContext (useApp / useUser)"]
        Supabase[("Supabase Auth (ibwooiejzxhbzplnldcz)")] <--> UserContext
        MockDB[("mockDatabase.ts")] --> Components["UI Components"]
        ExpoUpdates[("expo-updates")] <--> UpdateService["updates.ts"]
        AppStateListener["AppState Foreground Resume"] --> UpdateModal
    end
    
    subgraph Pipeline["Multi-Channel CI/CD Pipeline"]
        GHA["GitHub Actions (compile-and-ota.yml)"]
        GHA --> ProdOTA["Deploy to Channel: production"]
        GHA --> PrevOTA["Deploy to Channel: preview"]
        GHA --> CompileJob["Compile Native APK / AAB"]
        EASCloud["EAS Cloud (Project c00f29d0)"]
        ProdOTA --> EASCloud
        PrevOTA --> EASCloud
        CompileJob --> EASCloud
    end
```

---

## Over-The-Air (OTA) Updates & Versioning Strategy

### 1. Dual-Channel Release Pipeline (`production` & `preview`)
EAS Update is configured with two distinct channels:
- **`production` Channel**: Bound to branch `production` for all end-user release builds.
- **`preview` Channel**: Bound to branch `preview` for internal testing APK builds.
- **Dual Deployment**: Pushes to `main` automatically publish OTA updates to both channels so that internal testers on preview APKs and production users receive updates concurrently.

### 2. Dual Versioning Model (Preserving `v1.0.1`)
- **Locked OTA & App Version**: `app.json` specifies `"version": "1.0.1"` and `"runtimeVersion": "1.0.1"`. All Over-The-Air updates deployed through EAS target runtime `1.0.1`.
- **Dynamic Native Compilation Build Numbers**: When native binaries are compiled through GitHub Actions or EAS Build, the CI pipeline automatically injects incremental build identifiers (`android.versionCode` and `ios.buildNumber`) derived from `github.run_number` while strictly preserving `1.0.1` as the base version and runtimeVersion.
- **Runtime Compatibility Guarantee**: Any compiled native application bearing runtimeVersion `1.0.1` will continuously and seamlessly receive OTA JavaScript and asset updates without triggering native version mismatches.

### 3. In-App Update Notification & Reminder Flow (Rule 15 & Rule 19)
The in-app update experience is implemented in `src/components/UpdateModal.tsx` and strictly adheres to Rule 15 and Rule 19 sizing specifications:
- **Logo Container**: `68x68` rounded surface container (`borderRadius: 18`, `backgroundColor: '#F8FAFC'`, border `rgba(15, 23, 42, 0.08)`).
- **Brand Logo Image**: Centered `50x50` logo with `borderRadius: 12`.
- **Update Actions**:
  - **"Update Now"**: Downloads the update and reloads the app immediately with fresh code and assets.
  - **"Remind Me Later"**: Snoozes the notification for 30 minutes.
- **Foreground Resume Detection**: Uses `AppState.addEventListener('change', ...)` to dynamically check for fresh updates whenever the user returns to the app from the background.
- **Aesthetic**: Pure white surface card (`#FFFFFF`), biblical amber gold action button (`#D97706`), clean typography, and zero status badges per Rule 16.

### 4. Automated GitHub Actions Workflow (`compile-and-ota.yml`)
The workflow `.github/workflows/compile-and-ota.yml` coordinates automated deployments:
- **Automatic OTA Publish**: Triggered on push to `main` when application code changes. Compiles the JS bundle, validates TypeScript, and publishes directly to both `production` and `preview` channels.
- **Manual Native Compilation**: Triggered via `workflow_dispatch` with parameters for platform (`android`, `ios`, `all`), build profile (`preview`, `production`, `development`), target OTA channel (`both`, `production`, `preview`), and custom build numbers.

---

## Design System & Specifications

The application strictly implements the **60-30-10 Design Rule**, the **Mobile Tab Navigation Standard (`/tabs`)**, and layout metrics:

### 1. 60-30-10 Color Hierarchy (Rule 1 & Rule 20)
- **60% Dominant Background**: Clean Slate Canvas (`#F8FAFC`) with Secondary Canvas (`#F1F5F9`)
- **30% Panel / Surface**: Pure White (`#FFFFFF`) cards, headers, modal sheets, and floating pill tab bar with hairline borders (`rgba(15, 23, 42, 0.08)`) and soft elevation shadow (`shadowColor: '#0F172A'`)
- **10% Accent**: Biblical Amber Gold (`#D97706`) with soft tint (`rgba(217, 119, 6, 0.12)`) and accent border (`rgba(217, 119, 6, 0.24)`)
- **Monochromatic Typography**: Primary Text (`#0F172A`), Secondary Slate (`#64748B`), and Muted Slate (`#94A3B8`)
- *Strict Rule: No rainbow status tags, review badges, or ad-hoc coloring.*

### 2. Mobile Tab Navigation Standard (`/tabs` - Rule 20)
The bottom navigation bar adheres strictly to the floating pill / curved rectangular architecture:
- **Position & Geometry**: `position: 'absolute'`, `bottom: Platform.OS === 'ios' ? 28 : 24`
- **Bounded Pill Width**: Explicit `width: 280`, dynamically centered horizontally using `useWindowDimensions()` via `marginHorizontal: (width - 280) / 2`
- **Compact Height & Shape**: `height: 50`, `paddingTop: 4`, `paddingBottom: 4`, `borderRadius: 16`
- **Surface & Shadow**: `backgroundColor: '#FFFFFF'` (30% panel surface), hairline border `borderWidth: 1, borderColor: 'rgba(15, 23, 42, 0.08)', borderTopWidth: 0`, soft elevation shadow (`shadowColor: '#0F172A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 5`)
- **Dynamic Context State**: Reads `hideTabBar` and `accent` from `useApp()` hook
- **Custom Label with Focused Indicator Dot**: Centered column with `fontSize: 8.5`, `fontWeight: focused ? '700' : '500'`, `color: focused ? accent : '#64748B'`, and when `focused`, a `4x4` rounded dot (`width: 4, height: 4, borderRadius: 2, backgroundColor: accent, marginTop: 2`)
- **Iconography**: Pure vector `16px` SVGs (`react-native-svg`) adhering strictly to Rule 2 and Rule 4 (zero emojis, zero built-in icon fonts):
  - Feed / Discover: `DiscoverSvg`
  - Word of the Day: `WotdSvg`
  - Scriptures Library: `ScripturesSvg`
  - Search & Explore: `SearchSvg`
  - Profile & Settings: `ProfileSvg` (replaces Saved; Saved Collection is nested within Profile)
- **Header Standard**: Flat clean white header (`backgroundColor: '#FFFFFF', shadowColor: 'transparent', elevation: 0, borderBottomWidth: 1, borderBottomColor: 'rgba(15, 23, 42, 0.08)'`), `fontFamily: 'SpaceMono', fontSize: 18`. Across all 5 tabs (Feed, Word, Verses, Search, Profile), the header persistently displays the `24x24` transparent brand logo and `exégeomai` brand title without changing text between tabs.

### 3. App Icon, Launcher & In-App Logo Calibration (Rule 15 & Rule 19)
- **Android Adaptive Launcher Icon**: `assets/android-icon-foreground.png` is centered on a `512x512` canvas with a target icon height of `96px` (bounding box ~`74x96px`), providing ~`72%` clean white breathing room so Samsung One UI squircle masks and standard Android launcher cutouts never crop or zoom into the icon. Background is solid `#FFFFFF`.
- **In-App Transparent Brand Icon**: `assets/logo-transparent.png` is a `1024x1024` RGBA canvas with an `800px` symbol and zero background, ensuring pristine, borderless rendering across light and elevated surfaces.
- **Component In-App Logo Sizing**:
  - Header brand logos: `24x24` (zero background, transparent)
  - Auth / Login / Register logos: `28x28` (zero background, transparent)
  - In-app update / modal logos: `50x50` (zero background, transparent) inside a clean borderless container
- **Clean Modal Design**: `UpdateModal.tsx` implements clean `0px` border radius on modal cards and buttons for a modern, sharp presentation.

### 4. Spacing Grid (Multiples of 8px) & Scroll Clearance
All margins, paddings, gaps, and component dimensions follow strict multiples of **8px**:
- `spacing.sm`: `8px`
- `spacing.md`: `16px` (Standard screen margin and gutter)
- `spacing.lg`: `24px`
- `spacing.xl`: `32px`
- `spacing.xxl`: `48px`
- `spacing.nav`: `56px`
- `spacing.huge`: `64px`
- **Bottom Content Clearance**: All scrollable screens implement `paddingBottom: 96` (`12 * 8px`) so card content can be scrolled completely clear of the floating pill tab bar.

### 5. Profile & Authentication Architecture
- **Profile Tab & Nested Saved Collection**: The fifth navigation tab features `ProfileScreen`, replacing the standalone Saved tab. It houses user identity, daily study streaks (`FlameSvg`), facts unfolded count (`StrongsIconSvg`), and one-tap access to the **Saved Collection** (`FavoritesScreen`).
- **AVIF Profile Picture Upload**: Direct avatar selection and conversion using `expo-image-picker` and `expo-image-manipulator`, storing compressed lightweight AVIF images directly in Supabase Storage (`avatars` bucket).
- **Dedicated Login & Multi-Step Registration**: `AuthScreen.tsx` provides toggleable **Sign In** and **Create Account** views with vector input icons (`UserSvg`, `MailSvg`, `LockSvg`), password visibility toggle, real-time username availability checks, password strength progress bar, study preferences, and calibrated **28x28** brand logos per Rule 15/19.
- **Pure Vector SVGs & Zero Badges**: Strictly adheres to Rule 2 and Rule 4 (zero emojis, zero icon font libraries) and Rule 16 (zero development/status badges).

---

## Directory Structure

```text
exegeomai/
├── .github/
│   └── workflows/
│       └── compile-and-ota.yml           # GitHub Actions workflow for native compile and dual-channel OTA updates
├── assets/                               # Calibrated brand assets
│   ├── adaptive-icon.png                 # Android adaptive icon (512x512, 96px symbol, #FFFFFF background)
│   ├── android-icon-foreground.png       # Android launcher foreground (512x512, 96px symbol, ~72% breathing room)
│   ├── favicon.png                       # Browser favicon
│   ├── icon.png                          # Master brand icon (1024x1024, 800px symbol)
│   ├── logo-transparent.png              # In-app transparent brand icon (1024x1024, zero background)
│   └── splash-icon.png                   # Launch & splash screen branding asset
├── src/
│   ├── components/                       # Modular UI components
│   │   ├── Card.tsx                      # Surface-contained cards with 8px spacing
│   │   ├── CustomTabBar.tsx              # Rule 20 floating pill tab navigation component
│   │   ├── FactCard.tsx                  # Biblical fact card with Strong's deep dive
│   │   ├── ScriptureCard.tsx             # Scripture card with genre vector badges
│   │   ├── SearchBar.tsx                 # Search input with clear button and chips
│   │   ├── SvgIcons.tsx                  # Pure vector SVG library (zero emojis)
│   │   ├── Typography.tsx                # Monochromatic typography hierarchy
│   │   ├── UpdateModal.tsx               # OTA update modal (50x50 logo in 68x68 container, Remind Me Later snooze)
│   │   └── WOTDCard.tsx                  # Word of the Day devotional card
│   ├── context/
│   │   └── UserContext.tsx               # State management with useApp, useUser & Supabase Auth hooks
│   ├── data/
│   │   └── mockDatabase.ts               # Curated scriptures, facts, and Strong's database
│   ├── navigation/
│   │   └── AppNavigator.tsx              # Rule 20 floating pill tab navigation & stack navigators
│   ├── screens/                          # Application views
│   │   ├── AuthScreen.tsx                # Dedicated Login & Sign Up with 28x28 calibrated logo
│   │   ├── DiscoverScreen.tsx            # Daily fact discovery view (paddingBottom: 96)
│   │   ├── FactDetailsScreen.tsx         # In-depth modal sheet for biblical facts
│   │   ├── FavoritesScreen.tsx           # Saved collection (Facts, Scriptures, WOTD)
│   │   ├── HomeScreen.tsx                # Alternate home showcase
│   │   ├── ProfileScreen.tsx             # Profile tab (Study streak, translation, Saved, Sign out)
│   │   ├── ScriptureDetailsScreen.tsx    # In-depth modal sheet for scripture texts
│   │   ├── ScripturesScreen.tsx          # Categorized scripture library
│   │   ├── SearchScreen.tsx              # Unified search interface
│   │   ├── WelcomeScreen.tsx             # 3-step onboarding flow with custom vector art & dual CTAs
│   │   ├── WOTDDetailsScreen.tsx         # Deep-dive view for Word of the Day
│   │   └── WOTDScreen.tsx                # Daily devotional with 4 analytical lenses
│   ├── services/
│   │   ├── notifications.ts              # Expo notifications handler and scheduler
│   │   ├── supabase.ts                   # Supabase client SDK with AsyncStorage persistence
│   │   └── updates.ts                    # Expo OTA updates check, download, and reload service
│   └── theme/
│       ├── colors.ts                     # Strict 60-30-10 light theme tokens
│       └── index.ts                      # Spacing (8px grid), pillTabBar specs, and soft shadows
├── scripts/                              # Database seeding and development automation
│   └── seed_database.ts                  # Canonical content extraction and SQL seeder generator
├── supabase/                             # Supabase CLI project configuration
│   ├── config.toml                       # Supabase local and remote configuration
│   ├── seed.sql                          # Production seed dataset (categories, facts, scriptures, WOTD)
│   ├── migrations/                       # Database schema and RLS policies
│   │   ├── 20260920000000_create_profiles_and_avatars.sql # profiles table, trigger, and avatars bucket
│   │   └── 20260920000001_create_production_schema.sql   # Complete 8-table relational production schema
│   └── .gitignore                        # Supabase ignore rules
├── .env.example                          # Environment template for all Supabase connections
├── .gitignore                            # Standard git exclusion rules (includes .env and .agents)
├── .npmrc                                # npm configuration (legacy-peer-deps=true)
├── App.tsx                               # Root container, Dark StatusBar, providers, and UpdateModal
├── app.json                              # Expo configuration (v1.0.1, runtimeVersion 1.0.1, updates URL)
├── eas.json                              # EAS build profiles and update channels (production, preview)
├── index.ts                              # Expo entrypoint
├── package.json                          # Dependencies (@supabase/supabase-js, expo-image-picker)
├── tsconfig.json                         # TypeScript compiler configuration (extends expo/tsconfig.base.json)
└── README.md                             # Comprehensive project architecture guide
```

---

## 3-Step Welcome & Onboarding Screen Flow

Immediately after the application boots up, new and unauthenticated users are guided through an elegant, interactive 3-step Welcome & Onboarding walkthrough before reaching Login or Sign Up:

### 1. Slide 1: Welcome to exégeomai
- **Narrative**: *"We hope this sacred companion illuminates God's Word in your heart. Explore the timeless treasures of Scripture with rich historical, linguistic, and ancient cultural clarity."*
- **Visual Spec**: Custom high-resolution vector illustration with transparent background, seamlessly blending into the 60% slate canvas (`#F8FAFC`).
- **Action**: Persistent sliding tab locator at bottom-left + circular forward button with white Chevron SVG (`#FFFFFF`) on amber background (`#D97706`).

### 2. Slide 2: What Does exégeomai Mean?
- **Ancient Root**: *ἐξηγέομαι (Strong's Greek 1834)*
- **Narrative**: *"From ἐκ (out) and ἡγέομαι (to lead) — 'to lead out, unfold, declare, and draw out the true meaning.' Just as Christ declared the Father, exégeomai unfolds the profound depth and original intent of Sacred Scripture."*
- **Visual Spec**: Custom vector artwork with transparent background of an unfolding parchment scroll and Greek concordance study.
- **Action**: Persistent sliding tab locator at bottom-left + circular forward button to proceed to the purpose slide.

### 3. Slide 3: Our Sacred Purpose & Interactive "Swipe to Get Started"
- **Narrative**: *"This application was created to help you better understand the scriptures, deepen your knowledge in the glory of the Lord, and strengthen your everyday walk of faith through sound biblical exegesis."*
- **Visual Spec**: Custom vector illustration with transparent background depicting discipleship, study, and the Word of God.
- **Interactive "Swipe to Get Started" Slider**: Replaced the static full-width button with a sleek 210px `PanResponder` slider track (`#FFFFFF` surface, hairline border `rgba(15, 23, 42, 0.08)`). Users drag an amber circular thumb (`#D97706`) with white Chevron SVG across the track to launch into registration. Swiping past 60% executes the launch transition, while releasing early gently springs back. Tapping also navigates for accessibility.
- **Persistent Tab Locator (Zero Center-Jumping)**: The active tab locator stays firmly anchored at the bottom-left on all three slides, completely eliminating abrupt position shifts.
- **Real-Time Sliding Liquid Pill**: The active indicator pill interpolates `translateX` and `width` dynamically via `scrollX`, sliding smoothly between dot slots as the user drags.
- **Image Merge & Pure Crossfade Canvas (Zero Pop)**: Vector illustrations are mounted in a shared center stage where opacities crossfade seamlessly based on `scrollX`. Unwanted scale pop animations were removed, ensuring an organic dissolving morph between slides rather than rigid block translations.
- **Swipe-to-Start Reset & Flowing Trail**: Navigating back from registration automatically resets the slider thumb to origin via `useFocusEffect(useCallback(() => panX.setValue(0), []))`. Dragging features an amber trailing fill and real-time text fade-out.
- **Uniform Legal Typography**: The Terms of Service and Privacy Policy disclaimer lines match the surrounding text completely in font size (11px), regular font weight (`400`), line height, and color (`#64748B`), with zero underline or bolding, while remaining interactive.
- **Secondary CTA**: **"Already have an account? Sign In"** — Navigates directly to Login mode.
- **Header Skip Action**: "Skip" button located in the top-right header on Slides 1 & 2 allows users to jump straight into the application without swiping through all slides.

---

## Reactive Keyboard Avoidance & Input Accessibility Architecture

To ensure input fields are never obscured by virtual soft keyboards on Android or iOS:

```mermaid
graph TD
    Focus["User Taps TextInput (onFocus)"] --> ScrollToField["scrollToField(fieldKey, fallbackY)"]
    Layout["onLayout on InputGroup"] --> Offsets["fieldOffsets.current[fieldKey]"]
    SectionLayout["onLayout on Section"] --> SectionTop["sectionTop.current"]
    KeyboardEvent["Keyboard.addListener (keyboardDidShow / keyboardWillShow)"] --> DynamicPad["paddingBottom: keyboardHeight + 120"]
    AndroidConfig["app.json: softwareKeyboardLayoutMode: resize"] --> WinResize["Android Window Frame Resizes"]
    
    Offsets --> TargetY["targetY = sectionTop + fieldOffset"]
    SectionTop --> TargetY
    TargetY --> SmoothScroll["ScrollView.scrollTo({ y: targetY - 60, animated: true })"]
    DynamicPad --> SmoothScroll
    WinResize --> SmoothScroll
```

1. **Android Frame Resizing (`app.json`)**: Configured `"android.softwareKeyboardLayoutMode": "resize"`, directing Android's window manager to contract the activity viewport when the keyboard opens rather than drawing on top of it.
2. **Dynamic Inset Expansion**: Listens to `Keyboard.addListener` (`keyboardWillShow` / `keyboardDidShow`) and injects `paddingBottom: keyboardHeight > 0 ? keyboardHeight + 120 : 60` directly into `ScrollView.contentContainerStyle`. This guarantees the scroll container has sufficient vertical travel distance to elevate even the bottom-most fields (e.g. Confirm Password or Phone).
3. **Deterministic Layout Calculation (New Architecture Compatible)**: Bypasses deprecated `findNodeHandle` by caching native `onLayout` coordinates of sections and input groups. `targetY = sectionTop + fieldOffset` computes the exact pixel coordinates within the scroll content.
4. **Smooth Centering on Focus**: When any input receives focus, `scrollToField` smoothly animates the field into the upper third of the visible screen (`targetY - 60`), preserving 60px of breathing room above for labels and context.
5. **No Double-Offset Conflict**: Disables `automaticallyAdjustKeyboardInsets` on `ScrollView` to avoid collision with `KeyboardAvoidingView` on iOS.

---

## Supabase Relational Database Architecture (`ibwooiejzxhbzplnldcz`)

The application is backed by a full production-ready relational schema on Supabase with Row Level Security (RLS) enabled across every table:

| Table | Purpose | Row Level Security (RLS) | Seeded Records |
| :--- | :--- | :--- | :--- |
| **`public.profiles`** | User account identity, theological goals, translation preferences, and AVIF avatar URLs. | Public read; owner-restricted insert and update. | Dynamic (on signup) |
| **`public.categories`** | Canonical biblical categories (`History`, `Language`, `People`, `Prophecy`, `Customs`). | Public read (`USING (true)`). | 5 categories |
| **`public.facts`** | Curated historical, cultural, and Strong's concordance biblical facts with verification state. | Public read (`USING (true)`). | 120 facts |
| **`public.scriptures`** | Canonical scripture library passages with genre, testament, historical context, and Strong's data. | Public read (`USING (true)`). | 24 scriptures |
| **`public.word_of_the_day`** | Daily devotional readings with 4 analytical lenses, memory verses, and prayer prompts. | Public read (`USING (true)`). | Canonical entry |
| **`public.user_favorites_facts`** | User-saved biblical facts collection with cascade deletion on user removal. | Owner-restricted select, insert, and delete (`auth.uid() = user_id`). | User-generated |
| **`public.user_favorites_scriptures`** | User-saved scripture passages collection. | Owner-restricted select, insert, and delete (`auth.uid() = user_id`). | User-generated |
| **`public.user_study_progress`** | Tracks completed daily devotionals and reading streaks per authenticated user. | Owner-restricted select, insert, and delete (`auth.uid() = user_id`). | User-generated |
| **`public.study_notes`** | User-authored exegesis notes, reflections, and cross-references linked to scripture verses. | Owner-restricted select, insert, update, delete (`auth.uid() = user_id`). | User-generated |

---

## Clean UI Architecture & Zero Badge Standard (Rule 16)

In strict adherence to Rule 16 and clean typography principles:
- **Zero Status Badges & Pill Containers**: All status tags, rounded background pills, and card badge indicators have been completely eliminated across all screens and components (`FactCard`, `ScriptureCard`, `WOTDCard`, `DiscoverScreen`, `FactDetailsScreen`, `ScripturesScreen`, `ScriptureDetailsScreen`, `SearchScreen`, `WOTDScreen`, `WOTDDetailsScreen`).
- **Clean Inline Metadata**: Metadata (such as categories, testaments, genres, and dates) is rendered as clean, high-contrast inline typography (`Category • Testament • Genre`) without artificial container borders or colored badge backgrounds.
- **Analytical Lens Navigation**: The 4 analytical perspectives (*Original Intent*, *Theological Truth*, *Modern Walk*, *Prayer Focus*) are structured as clean, minimalist segmented tabs with active amber underlines rather than boxed badge buttons.
- **Zero Star Icons / Emojis**: Removed star shapes across the entire application; `DiscoverSvg` has been redesigned as a precision navigation compass needle.

---

## Project Directory Structure (Rule 12 & Rule 13)

```
bible_fun_facts/
├── .github/
│   └── workflows/
│       └── compile-and-ota.yml      # CI/CD: Direct GitHub Actions Android compile & EAS OTA
├── assets/
│   ├── android-icon-foreground.png  # Calibrated launcher icon (96px centered, Rule 15/19)
│   ├── icon.png                     # In-app brand icon (1024x1024, 800px symbol)
│   ├── splash-icon.png              # Splash screen asset
│   └── onboarding/                  # Compressed, transparent PNG onboarding slides (1, 2, 3)
├── src/
│   ├── components/                  # Reusable UI components strictly adhering to 60-30-10
│   │   ├── Card.tsx                 # Flat surface card with soft elevation shadow
│   │   ├── FactCard.tsx             # Fact presentation card with zero badges
│   │   ├── ScriptureCard.tsx        # Scripture reading card with inline typography
│   │   ├── SvgIcons.tsx             # Curated SVG icon collection (zero emojis)
│   │   ├── Typography.tsx           # Scaled typographic components
│   │   ├── UpdateModal.tsx          # Dual-action OTA update prompt with 30m snooze
│   │   └── WOTDCard.tsx             # Word of the Day analytical lens viewer
│   ├── context/
│   │   └── UserContext.tsx          # Global authentication, preferences, streak state
│   ├── data/
│   │   └── mockDatabase.ts          # Offline database: 120 facts, 24 scriptures, WOTD
│   ├── hooks/
│   │   └── useSecurePasswordCapture.ts # Hardware FLAG_SECURE blackout protection & app switcher privacy
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Tab navigation, AuthStack, ProfileStack, Root routes
│   ├── screens/
│   │   ├── AuthScreen.tsx           # Flattened body canvas, keyboard next, FLAG_SECURE
│   │   ├── DiscoverScreen.tsx       # Daily scripture, fact feeds, search jump
│   │   ├── FactDetailsScreen.tsx    # Modal sheet fact inspection
│   │   ├── FavoritesScreen.tsx      # Saved collections persisted offline
│   │   ├── PrivacyPolicyScreen.tsx  # 11-section GDPR/CCPA privacy policy screen
│   │   ├── ProfileScreen.tsx        # Profile management, study streak, legal navigation
│   │   ├── ScriptureDetailsScreen.tsx # In-depth chapter & linguistic breakdown
│   │   ├── ScripturesScreen.tsx     # Testament & genre catalog
│   │   ├── SearchScreen.tsx         # Unified biblical search across facts & scriptures
│   │   ├── TermsOfServiceScreen.tsx # 13-section theological & service terms screen
│   │   ├── WelcomeScreen.tsx        # 3-step onboarding introduction
│   │   ├── WOTDDetailsScreen.tsx    # Full 4-lens exegesis & prayer focus
│   │   └── WOTDScreen.tsx           # Daily Word of the Day dashboard
│   ├── services/
│   │   ├── supabase.ts              # Defensive Supabase client with fallback anon keys
│   │   └── updates.ts               # Background OTA update listener & dispatcher
│   └── theme/                       # 60-30-10 color tokens, 8px grid spacing, radius, shadow
├── App.tsx                          # Root provider wrapper & safe area initialization
├── app.json                         # Expo configuration (version: 1.0.1, runtimeVersion: 1.0.1)
├── package.json                     # Dependency manifests (expo-screen-capture, etc.)
└── tsconfig.json                    # Strict TypeScript configuration extending Expo base
```

---

## Direct-Body Authentication, Keyboard Flow & Screen Privacy

The authentication flow in `src/screens/AuthScreen.tsx` provides an airy, frictionless user experience:

### 1. Direct-Body Canvas Architecture (Elimination of Nested "Divs")
- **Clean Screen Surface**: Removed all outer card wrappers (`stepIndicatorCard`, `stepContentCard`, `formCard`).
- **Unified Body Placement**: The step progress bar, step pills, contextual heading, input fields, and action buttons sit directly on the application canvas (`#F8FAFC`), avoiding card-in-card visual clutter while maintaining 48px tactile input surfaces.

### 2. Smooth Keyboard "Next" Button Advancement
- **Seamless Field Transition**: Every input across Login and Sign Up is equipped with `returnKeyType="next"`, `blurOnSubmit={false}`, and ref-based focus routing.
- **Natural Progress**: Typing First Name advances to Last Name, which advances to Username, which triggers validation and steps forward into Contact Details, immediately auto-focusing Email.

### 3. Android Kotlin `FLAG_SECURE` Screen Recording Protection & Enterprise Hook
- **Dedicated Security Hook (`src/hooks/useSecurePasswordCapture.ts`)**: Encapsulates hardware-level window protection via `expo-screen-capture` with explicit named key tracking (`'password-protection'`), module availability verification (`ScreenCapture.isAvailableAsync()`), and unmount safety.
- **Hardware-Level Blackout Protection**: When the user enters the password creation step or focuses any password input (`loginPassword`, `password`, `confirmPassword`), the native Android Kotlin cradle (`ScreenCaptureModule.kt`) applies `WindowManager.LayoutParams.FLAG_SECURE` to the current window.
- **Blackout vs. User Experience**: The user holding the device sees and interacts with the screen normally, but any screen recorder (system built-in recorder or third-party recording application such as AZ Recorder, XRecorder, Mobizen, ADB screenrecord, or screen sharing) records a pure blank/black frame.
- **Dynamic Scoping & Restoration**: Window security flags are scoped strictly to password interaction and are immediately released upon leaving password fields or unmounting.
- **App Switcher Privacy Overlay**: Optionally integrates privacy blur protection when the application transitions to the background or app switcher.

### 4. Dedicated Legal Screens with Uniform Clickable Text & Zero-Duplication Architecture
- **Uniform Legal Disclaimers**: To preserve typographical balance, clickable Terms of Service and Privacy Policy text links match the surrounding caption typography exactly (no underline, no color deviation, no bold font) while retaining touch navigation to dedicated screens.
- **Zero-Duplication Guarantee**: Disclaimers render exactly once per active view (directly beneath Login actions, and directly beneath the active step's bottom action button), eliminating redundant outer scroll fallbacks.
- **Dedicated Standalone Legal Screens**:
  - **`TermsOfServiceScreen.tsx`**: 13 comprehensive, structured theological and service sections detailing scriptural integrity, account guidelines, Strong's concordance attribution, intellectual property, and theological disclaimers.
  - **`PrivacyPolicyScreen.tsx`**: 11 exhaustive sections covering GDPR/CCPA data protection, on-device AVIF avatar compression, cloud persistence in EU Central Supabase clusters, and zero ad-trackers.
- **Universal Availability**: Both legal screens are registered in both `AuthStack` and `ProfileStack`, allowing users to review terms both before creating an account and anytime from their profile settings.
- **Android Shadow Node Typography Fix (`Typography.tsx`)**: Refactored `Typography.tsx`'s `processChildren` to map array elements directly without wrapping them in `<React.Fragment>`. This guarantees React Native's Android shadow nodes (`RCTVirtualText`) preserve inline touch responder listeners on nested clickable `<Text>` elements without dropping virtual text spans.

---

## Streamlined 3-Step Authentication & AVIF Profile Storage

The mobile client integrates with Supabase for user authentication, profile data persistence, and compressed avatar storage:

### 1. Streamlined Sign Up Wizard (3 Steps)
- **Step 1: Personal Identity & Username**: First name, last name, and desired username with real-time availability check (queries reserved names and Supabase `profiles` table).
- **Step 2: Contact, Email & Phone Verification**:
  - Email address and confirmation email with real-time match verification.
  - **Country Code Selector & Phone Input**: Supports international dial prefixes (`+27`, `+1`, `+44`, `+234`, `+254`, etc.) via interactive selector.
  - **Leading Zero (0) Normalization**: Automatically strips redundant domestic leading trunk zeros (e.g. `082...` -> `82...`) in real-time and upon saving, guaranteeing compliant international E.164 database records.
- **Step 3: Security, Credentials & Account Completion**: Password with 4-segment **60-30-10 Strength Progress Bar** (minimum 8 characters, uppercase, number, symbol), confirm password matching, and Android Kotlin `FLAG_SECURE` screen recording protection. Submitting Step 3 directly invokes account creation.

### 2. Mobile Keyboard Avoidance Architecture
- To prevent software keyboards from overlaying active input fields on mobile screens:
  - `KeyboardAvoidingView` configured with `behavior={Platform.OS === 'ios' ? 'padding' : undefined}` and `keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}`.
  - `ScrollView` configured with `automaticallyAdjustKeyboardInsets={true}`, `keyboardDismissMode="on-drag"`, `keyboardShouldPersistTaps="handled"`, and dynamic bottom padding (`paddingBottom: 160`).
  - Smooth ref-based focus advancement routing (`returnKeyType="next"`) auto-advancing focus from field to field without manual tapping.

### 2. AVIF Profile Picture Upload & Compression
- In the **Profile** tab, users can tap their avatar to select a profile photo from the camera roll.
- The image is processed and compressed via `expo-image-manipulator` into ultra-lightweight format (`image/avif`) before uploading to the Supabase Storage `avatars` bucket at `user_id/avatar_timestamp.avif`.
- This ensures maximum visual fidelity while consuming minimal cloud storage space (< 50KB per avatar).

### 3. Environment Configuration (`.env`)
- `EXPO_PUBLIC_SUPABASE_URL`: `https://ibwooiejzxhbzplnldcz.supabase.co`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Supabase project anon key.
- `SUPABASE_DB_URL`: Direct Postgres pooled connection string for schema migrations and administrative queries.

---

## Rule 21: Mobile CI/CD & Native Compilation Architecture

This project strictly adheres to **Rule 21** of our global mobile standards:

| Standard | Implementation in `exégeomai` |
| :--- | :--- |
| **Direct Runner Compilation** | Android APKs compile on `ubuntu-latest` GitHub Actions runners using Java 17 Temurin, Android SDK, and `./gradlew assembleRelease`, bypassing cloud build queues entirely. |
| **EAS Exclusively for OTA** | EAS CLI is reserved exclusively for Over-The-Air updates (`production` and `preview` channels) via `npx eas-cli update`. |
| **Automated Release Distribution** | Compiled APKs are automatically uploaded to GitHub Releases (`exegeomai-v1.0.2.apk` under release tag `v1.0.2`) using `gh release upload --clobber`. |
| **Locked Runtime Versioning** | `runtimeVersion` is explicitly locked to `1.0.1` in `app.json`, guaranteeing continuous OTA compatibility across all installed clients while CI injects dynamic `versionCode = github.run_number`. |
| **In-App Update Modal** | Implemented in `src/components/UpdateModal.tsx` with foreground resume listening, "Update Now", and 30-minute "Remind Me Later" snooze. |
| **Peer Dependency Stability** | `.npmrc` with `legacy-peer-deps=true` committed at root to prevent React 19 / Expo peer dependency collisions. |
| **TypeScript Base Config** | `tsconfig.json` extends `expo/tsconfig.base.json` with explicit `jsx: "react-jsx"` and `esModuleInterop: true`. |
| **JVM & Node Memory Stability** | Gradle configured with `-Xmx4096m -XX:MaxMetaspaceSize=1024m`, Node.js with `NODE_OPTIONS: "--max-old-space-size=4096"`, and explicit timeouts (35m compile, 15m OTA) to eliminate OOM crashes and runner hangs. |
| **Autolinking Inline Modules** | `expo.inlineModules.watchedDirectories=[]` configured in `android/gradle.properties` and `app.json` `experiments`, resolving `ExpoAutolinkingPlugin` command-line parameter requirements. |
| **Startup Stability & Defensive Client** | Supabase client initialized defensively with fallback public anon key and exception handling, and onboarding assets compressed from 64MB RAM to 4.3MB, eliminating device crash-on-launch. |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v10+)
- Expo SDK 57 (`npx expo`)
- EAS CLI (`npm install -g eas-cli`)
- Expo Go app or EAS Development Client on Android or iOS

### Installation
```bash
npm install
```

### Running Locally (Rule 15 Concurrently Runner)
Development uses `concurrently --kill-others-on-fail --raw` with fixed port `8082` to avoid interactive prompts and render the Expo QR code cleanly:

```bash
npm run dev
```

### Publishing Over-The-Air (OTA) Updates
```bash
# Publish an OTA update to the production channel (targets runtimeVersion 1.0.1)
npx eas-cli update --branch production --message "Update description"

# Publish an OTA update to the preview channel
npx eas-cli update --branch preview --message "Preview update description"
```

### Compiling Native Binaries on GitHub Actions
Native compilation runs automatically on push to `main` directly on GitHub Actions compute runners (Java 17 + runner-native Android SDK + Gradle) without relying on EAS Cloud build servers:

- **Workflow**: `.github/workflows/compile-and-ota.yml` (`compile_native_app` job)
- **Engine**: `npx expo prebuild --platform android --no-install` + `./gradlew assembleRelease -x lint -x test --no-daemon`
- **Output**: Generates `exegeomai-v1.0.2.apk` and uploads it directly to the repository's GitHub Releases page under **Assets** with automatic clobbering.

### GitHub Releases vs. Over-The-Air (OTA) Updates
- **GitHub Releases (`/releases`)**: Houses official version tags (e.g. `v1.0.2`), changelogs, and direct `.apk` binary downloads compiled directly on GitHub Actions.
- **Expo EAS OTA Updates**: Seamless JavaScript and asset updates deployed directly to user devices over the air across the `production` and `preview` channels (targeting `runtimeVersion: 1.0.1`) without requiring a manual APK reinstall.

### Type Checking & Validation
```bash
npx tsc --noEmit
```

---

## License & Credits
Crafted for Scripture scholars, Bible study groups, and everyday believers seeking the deeper historical, linguistic, and cultural dimensions of God's Word.
