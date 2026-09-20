# Rule 21: Mobile CI/CD, Direct GitHub Actions Native Compilation, Dual-Channel OTA & Release Standards

## 1. Direct GitHub Actions Native Compilation (Zero Cloud Build Dependency)
- All mobile applications must compile native binaries (Android APK / AAB, iOS when applicable) directly on GitHub Actions runners (`ubuntu-latest`) using open-source toolchains:
  - **JDK**: Eclipse Temurin Java 17 (`actions/setup-java@v4`)
  - **Android SDK**: Command-line tools & build-tools (`android-actions/setup-android@v3`)
  - **Native Project Generation**: `npx expo prebuild --platform android --no-install`
  - **Gradle Compilation**: `./gradlew assembleRelease -x lint -x test --no-daemon` executed directly inside the generated `android/` directory
- **Zero EAS Cloud Build Dependency**: Never burn EAS cloud build credits or wait in EAS build queues for compiling binaries. Native compiling must always execute on GitHub Actions runners.

## 2. EAS Exclusively for Over-The-Air (OTA) Updates
- EAS CLI is strictly reserved for JavaScript and asset updates (`eas update`), NEVER for compiling native binaries.
- **Dual-Channel Architecture**: Maintain `production` (production releases) and `preview` (staging/testing/preview branch) update channels.
- In GitHub Actions workflows: run `npx eas-cli update --branch <branch> --message "..." --non-interactive` using the repository secret `EXPO_TOKEN`. Never use deprecated or non-existent third-party GitHub Actions (such as `expo/eas-cli-action`).

## 3. Automatic GitHub Release Asset Distribution
- The compiled native binary (`<app-name>-v<version>.apk`) must automatically be attached and published to the repository's GitHub Releases via `gh release upload "$RELEASE_TAG" <path-to-apk> --clobber`.
- If the release tag does not yet exist in GitHub Releases, the workflow must create it automatically: `gh release create "$RELEASE_TAG" --title "Release $RELEASE_TAG" --notes "..."`.
- Always persist compiled binaries to CI artifacts as well using `actions/upload-artifact@v4`.

## 4. Dual-Channel Runtime Locking & Dynamic CI Versioning
- In `app.json`: permanently lock `"runtimeVersion": "x.y.z"` to match `"version": "x.y.z"`. Never use dynamic runtime policies (e.g. `appVersion`) that risk version mismatch between native builds and OTA updates.
- The native build number (`android.versionCode`) must be dynamically injected during CI runs using `${{ github.run_number }}` so every build has a unique incremental versionCode without mutating repository source code.
- Any compiled native application bearing runtimeVersion `x.y.z` will continuously and seamlessly receive OTA updates targeting that runtime without native version conflicts.

## 5. In-App Update Modal Standards (Dual Action + Snooze)
- Every mobile app must implement an in-app OTA update listener and modal (`UpdateModal`).
- Trigger update checks on application startup and on foreground resume (`AppState.addEventListener('change')`).
- **Modal Actions**: Provide two distinct user actions:
  1. **"Update Now"**: Downloads the update bundle in the background and immediately reloads the runtime via `Updates.reloadAsync()`.
  2. **"Remind Me Later"**: Snoozes the update prompt for 30 minutes, storing the snooze timestamp in `AsyncStorage`.
- **Modal Visual Calibration**: 50x50 brand logo inside a 68x68 rounded container (border radius 18px, image border radius 12px) per Rule 15/19, with strictly 60-30-10 surface and button colors.

## 6. Package Management & Dependency Stability
- Always commit a `.npmrc` file at the root of the repository containing `legacy-peer-deps=true`.
- In CI workflows, use Node.js 22 LTS (`actions/setup-node@v4`) and install dependencies using `npm install --legacy-peer-deps --prefer-offline --no-audit` to prevent React 19 / Expo peer dependency resolution conflicts.

## 7. TypeScript Configuration Standard
- `tsconfig.json` must extend `"expo/tsconfig.base.json"` with the explicit `.json` extension (never `"expo/tsconfig.base"`) and include self-contained compiler options (`"jsx": "react-jsx"`, `"esModuleInterop": true`, `"strict": true`) to prevent cross-toolchain compiler errors.
