
```
Tallk
├─ tsconfig.json
├─ index.ts
├─ App.tsx
├─ metro.config.js
├─ eas.json
├─ assets
│  ├─ adaptive-icon.png
│  ├─ favicon.png
│  ├─ icon.png
│  ├─ splash-icon.png
│  ├─ images
│  │  ├─ welcome-bg.png
│  │  ├─ login-bg.png
│  │  ├─ register-bg.png
│  │  ├─ default-avatar.png
│  │  ├─ court-bg.png
│  │  └─ rackets.png
│  ├─ icons
│  │  ├─ Upload Photo.svg
│  │  ├─ Upload Photo.png
│  │  ├─ check-icon.png
│  │  └─ error-icon.png
│  └─ fonts
│     ├─ NEXTART_Bold.otf
│     ├─ Manrope-Regular.ttf
│     ├─ Manrope-ExtraBold.ttf
│     ├─ Manrope-Bold.ttf
│     ├─ Manrope-Medium.ttf
│     └─ Manrope-SemiBold.ttf
├─ src
│  ├─ navigation
│  │  ├─ AuthNavigator.tsx
│  │  ├─ PlayerNavigator.tsx
│  │  └─ AdminNavigator.tsx
│  ├─ screens
│  │  ├─ WelcomeScreen.tsx
│  │  ├─ auth
│  │  │  ├─ index.tsx
│  │  │  ├─ Register
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  └─ RegisterScreen.tsx
│  │  │  ├─ Login
│  │  │  │  ├─ LoginScreen.tsx
│  │  │  │  └─ styled.ts
│  │  │  └─ Verification
│  │  │     ├─ VerificationScreen.tsx
│  │  │     └─ styled.ts
│  │  ├─ player
│  │  │  ├─ index.tsx
│  │  │  ├─ Home
│  │  │  │  ├─ HomeScreen.tsx
│  │  │  │  └─ styled.ts
│  │  │  ├─ Bookings
│  │  │  │  ├─ BookingsScreen.tsx
│  │  │  │  └─ styled.ts
│  │  │  └─ Profile
│  │  │     ├─ ProfileScreen.tsx
│  │  │     └─ styled.ts
│  │  └─ admin
│  │     ├─ Home
│  │     │  ├─ HomeScreen.tsx
│  │     │  └─ styled.ts
│  │     ├─ Bookings
│  │     │  ├─ BookingsScreen.tsx
│  │     │  └─ styled.ts
│  │     ├─ Profile
│  │     │  └─ ProfileScreen.tsx
│  │     ├─ SelectUser
│  │     │  └─ SelectUserScreen.tsx
│  │     ├─ Filter
│  │     │  └─ FilterScreen.tsx
│  │     ├─ ProfileOptions
│  │     │  ├─ ProfileOptionsScreen.tsx
│  │     │  └─ styled.ts
│  │     └─ AccountCreated
│  │        └─ AccountCreatedScreen.tsx
│  ├─ components
│  │  ├─ index.tsx
│  │  ├─ Screen
│  │  │  ├─ index.tsx
│  │  │  └─ styled.ts
│  │  ├─ BottomNavigator
│  │  │  ├─ index.tsx
│  │  │  └─ styled.ts
│  │  ├─ Header
│  │  │  ├─ index.tsx
│  │  │  └─ styled.ts
│  │  ├─ DatePicker
│  │  │  ├─ index.tsx
│  │  │  └─ styled.ts
│  │  ├─ TimePicker
│  │  │  ├─ index.tsx
│  │  │  └─ styled.ts
│  │  ├─ CourtSelector
│  │  │  ├─ index.tsx
│  │  │  └─ styled.ts
│  │  ├─ BookingConfirmation
│  │  │  ├─ index.tsx
│  │  │  └─ styled.ts
│  │  ├─ ContactCard
│  │  │  ├─ index.tsx
│  │  │  └─ styled.ts
│  │  └─ UI
│  │     ├─ Button
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  ├─ types.ts
│  │     │  ├─ variants.ts
│  │     │  └─ utils.ts
│  │     ├─ ToggleSwitch
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  ├─ types.ts
│  │     │  └─ variants.ts
│  │     ├─ TransparentContainer
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  └─ types.ts
│  │     ├─ WaveBackground
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  ├─ types.ts
│  │     │  └─ config.ts
│  │     └─ Input
│  │        ├─ index.tsx
│  │        ├─ styled.ts
│  │        ├─ variants.ts
│  │        ├─ types.ts
│  │        ├─ utils.ts
│  │        └─ components
│  │           ├─ CodeInput.tsx
│  │           └─ StrengthBars.tsx
│  ├─ constants
│  │  ├─ Colors.ts
│  │  ├─ Fonts.ts
│  │  ├─ Texts.ts
│  │  └─ FontSizes.ts
│  ├─ context
│  │  └─ BookingContext.tsx
│  ├─ api
│  │  ├─ auth.ts
│  │  ├─ bookings.ts
│  │  ├─ users.ts
│  │  ├─ courts.ts
│  │  ├─ profile.ts
│  │  ├─ types.ts
│  │  ├─ client.ts
│  │  └─ axiosInstance.ts
│  └─ utils
│     ├─ formatters.ts
│     └─ index.ts
├─ package-lock.json
├─ README.md
├─ app.json
├─ android
│  ├─ app
│  │  ├─ build.gradle
│  │  ├─ proguard-rules.pro
│  │  └─ src
│  │     ├─ debug
│  │     │  └─ AndroidManifest.xml
│  │     └─ main
│  │        ├─ AndroidManifest.xml
│  │        ├─ java
│  │        │  └─ com
│  │        │     └─ tallk
│  │        │        └─ app
│  │        │           ├─ MainApplication.kt
│  │        │           └─ MainActivity.kt
│  │        ├─ res
│  │        │  ├─ drawable
│  │        │  │  ├─ ic_launcher_background.xml
│  │        │  │  └─ rn_edit_text_material.xml
│  │        │  ├─ drawable-hdpi
│  │        │  │  └─ splashscreen_logo.png
│  │        │  ├─ drawable-mdpi
│  │        │  │  └─ splashscreen_logo.png
│  │        │  ├─ drawable-xhdpi
│  │        │  │  └─ splashscreen_logo.png
│  │        │  ├─ drawable-xxhdpi
│  │        │  │  └─ splashscreen_logo.png
│  │        │  ├─ drawable-xxxhdpi
│  │        │  │  └─ splashscreen_logo.png
│  │        │  ├─ mipmap-hdpi
│  │        │  │  ├─ ic_launcher.webp
│  │        │  │  ├─ ic_launcher_round.webp
│  │        │  │  └─ ic_launcher_foreground.webp
│  │        │  ├─ mipmap-mdpi
│  │        │  │  ├─ ic_launcher.webp
│  │        │  │  ├─ ic_launcher_round.webp
│  │        │  │  └─ ic_launcher_foreground.webp
│  │        │  ├─ mipmap-xhdpi
│  │        │  │  ├─ ic_launcher.webp
│  │        │  │  ├─ ic_launcher_round.webp
│  │        │  │  └─ ic_launcher_foreground.webp
│  │        │  ├─ mipmap-xxhdpi
│  │        │  │  ├─ ic_launcher.webp
│  │        │  │  ├─ ic_launcher_round.webp
│  │        │  │  └─ ic_launcher_foreground.webp
│  │        │  ├─ mipmap-xxxhdpi
│  │        │  │  ├─ ic_launcher.webp
│  │        │  │  ├─ ic_launcher_round.webp
│  │        │  │  └─ ic_launcher_foreground.webp
│  │        │  ├─ values
│  │        │  │  ├─ colors.xml
│  │        │  │  ├─ strings.xml
│  │        │  │  └─ styles.xml
│  │        │  ├─ mipmap-anydpi-v26
│  │        │  │  ├─ ic_launcher.xml
│  │        │  │  └─ ic_launcher_round.xml
│  │        │  └─ values-night
│  │        │     └─ colors.xml
│  │        └─ assets
│  │           └─ fonts
│  │              ├─ NEXTART_Bold.otf
│  │              ├─ Manrope-Regular.ttf
│  │              ├─ Manrope-ExtraBold.ttf
│  │              ├─ Manrope-Bold.ttf
│  │              ├─ Manrope-Medium.ttf
│  │              └─ Manrope-SemiBold.ttf
│  ├─ build
│  │  └─ generated
│  │     └─ autolinking
│  │        ├─ autolinking.json
│  │        ├─ package.json.sha
│  │        └─ yarn.lock.sha
│  ├─ build.gradle
│  ├─ gradle
│  │  └─ wrapper
│  │     ├─ gradle-wrapper.jar
│  │     └─ gradle-wrapper.properties
│  ├─ gradle.properties
│  ├─ gradlew
│  ├─ gradlew.bat
│  ├─ settings.gradle
│  └─ link-assets-manifest.json
└─ package.json

```