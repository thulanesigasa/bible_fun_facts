# exégeomai (ἐξηγέομαι)

<p align="left">
  <img src="https://img.shields.io/badge/Expo%20SDK-57.0-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 57" />
  <img src="https://img.shields.io/badge/React%20Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native 0.86" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Lucide%20Icons-16px%20Vector-333333?style=for-the-badge" alt="Lucide Icons" />
  <img src="https://img.shields.io/badge/Tab%20Architecture-Floating%20Pill%20280px-D97706?style=for-the-badge" alt="Floating Pill Tab Bar" />
  <img src="https://img.shields.io/badge/Design%20System-60--30--10%20Light-F8FAFC?style=for-the-badge" alt="60-30-10 Design System" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License MIT" />
</p>

> **Strong's Greek 1834**: *ἐξηγέομαι* (*exēgeomai*) — from *ἐκ* (out) and *ἡγέομαι* (to lead): **"to lead out, unfold, declare, interpret, draw out the true meaning."** As recorded in John 1:18: *"No one has seen God at any time; the only begotten Son, who is in the bosom of the Father, He has explained / declared (exēgēsato) Him."*

**exégeomai** is a modern, high-performance React Native & Expo mobile application exploring ancient historical context, cultural customs, original language deep dives (Strong's Concordance), and multi-lens daily devotionals from Sacred Scripture.

---

## Architecture Overview

```mermaid
graph TD
    App[App.tsx] --> Providers[UserProvider + SafeAreaProvider]
    Providers --> Nav[AppNavigator]
    Nav --> Auth[AuthScreen - 28x28 Calibrated Logo]
    Nav --> Tabs[Rule 20 Floating Pill Tab Bar - 280px]
    
    Tabs --> DiscoverStack[Discover Stack]
    Tabs --> WOTDScreen[Word of the Day - 4 Lenses]
    Tabs --> ScripturesStack[Scriptures Stack]
    Tabs --> SearchStack[Search Stack]
    Tabs --> FavoritesStack[Favorites Stack]
    
    DiscoverStack --> DiscoverMain[DiscoverScreen]
    DiscoverStack --> FactDetails[FactDetailsScreen - PageSheet]
    
    ScripturesStack --> ScripturesMain[ScripturesScreen]
    ScripturesStack --> ScriptureDetails[ScriptureDetailsScreen - PageSheet]
    
    SearchStack --> SearchMain[SearchScreen]
    FavoritesStack --> FavoritesMain[FavoritesScreen]
    
    subgraph Data & State
        AsyncStorage[(AsyncStorage)] <--> UserContext[UserContext - useApp / useUser]
        MockDB[(mockDatabase.ts)] --> Components[UI Components]
    end
    
    subgraph Design System & Navigation Standard
        Colors[60-30-10 Color Engine: #F8FAFC / #FFFFFF / #D97706]
        Tokens[8px Grid System & 96px Scroll Padding]
        PillBar[Rule 20 Bounded Floating Pill: 280x50px, 16px Radius]
        Icons[Lucide 16px Icons + Pure Vector SVGs]
    end
```

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
- **Iconography**: Compact `16px` Lucide icons (`<Icon size={16} color={color} />`)
  - Feed / Discover: `BookOpen`
  - Word of the Day: `Calendar`
  - Scriptures Library: `Scroll`
  - Search & Explore: `Search`
  - Saved Collection: `Bookmark`
- **Header Standard**: Flat clean white header (`backgroundColor: '#FFFFFF', shadowColor: 'transparent', elevation: 0, borderBottomWidth: 1, borderBottomColor: 'rgba(15, 23, 42, 0.08)'`), `fontFamily: 'SpaceMono', fontSize: 18`, and on the primary tab, include the `24x24` brand logo with `borderRadius: 5`

### 3. App Icon, Launcher & In-App Logo Calibration (Rule 15 & Rule 19)
- **Android Adaptive Launcher Icon**: `assets/android-icon-foreground.png` is centered on a `512x512` canvas with a target icon height of `96px` (bounding box ~`74x96px`), providing ~`72%` clean white breathing room so Samsung One UI squircle masks and standard Android launcher cutouts never crop or zoom into the icon. Background is solid `#FFFFFF`.
- **In-App Brand Icon / App Store Icon**: `assets/icon.png` is a `1024x1024` canvas with an `800px` prominent brand symbol so in-app usages remain sharp, bold, and readable.
- **Component In-App Logo Sizing**:
  - Header brand logos: `24x24` (with `borderRadius: 5`)
  - Auth / Login / Register logos: `28x28`
  - In-app update / modal logos: `50x50` inside a `68x68` rounded container (`borderRadius: 18`, image `borderRadius: 12`)

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

---

## Directory Structure

```text
exegeomai/
├── assets/                               # Calibrated brand assets
│   ├── adaptive-icon.png                 # Android adaptive icon (512x512, 96px symbol, #FFFFFF background)
│   ├── android-icon-foreground.png       # Android launcher foreground (512x512, 96px symbol, ~72% breathing room)
│   ├── favicon.png                       # Browser favicon
│   ├── icon.png                          # Master brand icon (1024x1024, 800px symbol)
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
│   │   └── WOTDCard.tsx                  # Word of the Day devotional card
│   ├── context/
│   │   └── UserContext.tsx               # State management with useApp & useUser hooks (tab & user state)
│   ├── data/
│   │   └── mockDatabase.ts               # Curated scriptures, facts, and Strong's database
│   ├── navigation/
│   │   └── AppNavigator.tsx              # Rule 20 floating pill tab navigation & stack navigators
│   ├── screens/                          # Application views
│   │   ├── AuthScreen.tsx                # Onboarding with 28x28 calibrated logo
│   │   ├── DiscoverScreen.tsx            # Daily fact discovery view (paddingBottom: 96)
│   │   ├── FactDetailsScreen.tsx         # In-depth modal sheet for biblical facts
│   │   ├── FavoritesScreen.tsx           # Saved collection (Facts, Scriptures, WOTD)
│   │   ├── HomeScreen.tsx                # Alternate home showcase
│   │   ├── ScriptureDetailsScreen.tsx    # In-depth modal sheet for scripture texts
│   │   ├── ScripturesScreen.tsx          # Categorized scripture library
│   │   ├── SearchScreen.tsx              # Unified search interface
│   │   ├── WOTDDetailsScreen.tsx         # Deep-dive view for Word of the Day
│   │   └── WOTDScreen.tsx                # Daily devotional with 4 analytical lenses
│   ├── services/
│   │   └── notifications.ts              # Expo notifications handler and scheduler
│   └── theme/
│       ├── colors.ts                     # Strict 60-30-10 light theme tokens
│       └── index.ts                      # Spacing (8px grid), pillTabBar specs, and soft shadows
├── App.tsx                               # Root container, Dark StatusBar, and providers
├── app.json                              # Expo configuration (light mode, calibrated launcher icon)
├── index.ts                              # Expo entrypoint
├── package.json                          # Dependencies (lucide-react-native) and scripts
├── tsconfig.json                         # TypeScript compiler configuration
└── README.md                             # Comprehensive project architecture guide
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v10+)
- Expo SDK 57 (`npx expo`)
- Expo Go app on Android or iOS

### Installation
```bash
npm install
```

### Running Locally (Rule 15 Concurrently Runner)
Development uses `concurrently --kill-others-on-fail --raw` with fixed port `8082` to avoid interactive prompts and render the Expo QR code cleanly:

```bash
npm run dev
```

### Platform Commands
```bash
# Run on Android
npm run android

# Run on iOS
npm run ios

# Run in Web Browser
npm run web
```

### Type Checking & Validation
```bash
npx tsc --noEmit
```

---

## License & Credits
Crafted for Scripture scholars, Bible study groups, and everyday believers seeking the deeper historical, linguistic, and cultural dimensions of God's Word.
