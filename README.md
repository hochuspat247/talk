
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
│  │  ├─ ClientNavigator.tsx
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
│  │  │  │  ├─ styled.ts
│  │  │  │  └─ types.ts
│  │  │  ├─ Verification
│  │  │  │  ├─ VerificationScreen.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  └─ types.ts
│  │  │  └─ Password
│  │  │     ├─ styled.ts
│  │  │     ├─ PasswordScreen.tsx
│  │  │     └─ types.ts
│  │  ├─ Client
│  │  │  ├─ index.tsx
│  │  │  └─ Home
│  │  │     ├─ HomeScreen.tsx
│  │  │     ├─ styled.ts
│  │  │     └─ mockData.ts
│  │  └─ Master
│  │     ├─ Home
│  │     │  ├─ HomeScreen.tsx
│  │     │  └─ styled.ts
│  │     ├─ Profile
│  │     │  └─ ProfileScreen.tsx
│  │     ├─ SelectUser
│  │     │  └─ SelectUserScreen.tsx
│  │     ├─ Filter
│  │     │  └─ FilterScreen.tsx
│  │     └─ ProfileOptions
│  │        ├─ ProfileOptionsScreen.tsx
│  │        └─ styled.ts
│  ├─ components
│  │  ├─ index.tsx
│  │  ├─ UI
│  │  │  ├─ Button
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ variants.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ ToggleSwitch
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  └─ variants.ts
│  │  │  ├─ WaveBackground
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  └─ config.ts
│  │  │  ├─ Input
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ variants.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ utils.ts
│  │  │  │  ├─ components
│  │  │  │  │  ├─ CodeInput.tsx
│  │  │  │  │  └─ StrengthBars.tsx
│  │  │  │  ├─ variants
│  │  │  │  │  ├─ BaseInput.tsx
│  │  │  │  │  ├─ PasswordInput.tsx
│  │  │  │  │  ├─ PhoneInput.tsx
│  │  │  │  │  ├─ ConfirmInput.tsx
│  │  │  │  │  ├─ DescriptionInput.tsx
│  │  │  │  │  └─ TimeInput.tsx
│  │  │  │  └─ hooks
│  │  │  │     ├─ useSecureEntry.ts
│  │  │  │     └─ usePasswordStrength.ts
│  │  │  ├─ PeriodSwitch
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ styled.ts
│  │  │  ├─ CalendarEventCard
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ stled.ts
│  │  │  ├─ CalendarEventList
│  │  │  │  └─ index.tsx
│  │  │  └─ BottomNavigator
│  │  │     ├─ index.tsx
│  │  │     └─ styled.ts
│  │  └─ Layout
│  │     ├─ Screen
│  │     │  ├─ index.tsx
│  │     │  └─ styled.ts
│  │     ├─ TransparentContainer
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  └─ types.ts
│  │     ├─ Header
│  │     │  ├─ index.tsx
│  │     │  └─ styled.ts
│  │     ├─ BookingSummary
│  │     │  ├─ index.tsx
│  │     │  └─ styled.ts
│  │     └─ TimePicker
│  │        ├─ index.tsx
│  │        └─ styled.ts
│  ├─ constants
│  │  ├─ Colors.ts
│  │  ├─ Fonts.ts
│  │  ├─ Texts.ts
│  │  ├─ FontSizes.ts
│  │  └─ phone.ts
│  ├─ api
│  │  ├─ auth.ts
│  │  ├─ bookings.ts
│  │  ├─ users.ts
│  │  ├─ courts.ts
│  │  ├─ profile.ts
│  │  ├─ types.ts
│  │  ├─ client.ts
│  │  └─ axiosInstance.ts
│  ├─ utils
│  │  ├─ index.ts
│  │  ├─ auth
│  │  │  ├─ passwordValidator.ts
│  │  │  └─ registeredUsers.ts
│  │  └─ formatters
│  │     ├─ phoneFormatter.ts
│  │     └─ formatters.ts
│  └─ hooks
│     ├─ index.ts
│     ├─ general
│     │  ├─ useKeyboardVisibility.ts
│     │  ├─ useNavigationHandler.ts
│     │  ├─ usePasswordStrength.ts
│     │  ├─ usePhoneFormatter.ts
│     │  ├─ useTextInput.ts
│     │  └─ useTimer.ts
│     └─ auth
│        ├─ index.ts
│        ├─ useLoginLogic.ts
│        ├─ usePasswordLogic.ts
│        ├─ useRegisterLogic.ts
│        └─ useVerificationLogic.ts
├─ README.md
├─ app.json
├─ package-lock.json
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
│  │        │           ├─ MainActivity.kt
│  │        │           └─ MainApplication.kt
│  │        └─ res
│  │           ├─ drawable
│  │           │  ├─ ic_launcher_background.xml
│  │           │  ├─ rn_edit_text_material.xml
│  │           │  └─ splashscreen.xml
│  │           ├─ drawable-hdpi
│  │           │  ├─ splashscreen_logo.png
│  │           │  └─ splashscreen_image.png
│  │           ├─ drawable-mdpi
│  │           │  ├─ splashscreen_logo.png
│  │           │  └─ splashscreen_image.png
│  │           ├─ drawable-xhdpi
│  │           │  ├─ splashscreen_logo.png
│  │           │  └─ splashscreen_image.png
│  │           ├─ drawable-xxhdpi
│  │           │  ├─ splashscreen_logo.png
│  │           │  └─ splashscreen_image.png
│  │           ├─ drawable-xxxhdpi
│  │           │  ├─ splashscreen_logo.png
│  │           │  └─ splashscreen_image.png
│  │           ├─ mipmap-hdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  ├─ ic_launcher.png
│  │           │  ├─ ic_launcher_round.png
│  │           │  └─ ic_launcher_foreground.png
│  │           ├─ mipmap-mdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  ├─ ic_launcher.png
│  │           │  ├─ ic_launcher_round.png
│  │           │  └─ ic_launcher_foreground.png
│  │           ├─ mipmap-xhdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  ├─ ic_launcher.png
│  │           │  ├─ ic_launcher_round.png
│  │           │  └─ ic_launcher_foreground.png
│  │           ├─ mipmap-xxhdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  ├─ ic_launcher.png
│  │           │  ├─ ic_launcher_round.png
│  │           │  └─ ic_launcher_foreground.png
│  │           ├─ mipmap-xxxhdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  ├─ ic_launcher.png
│  │           │  ├─ ic_launcher_round.png
│  │           │  └─ ic_launcher_foreground.png
│  │           ├─ values
│  │           │  ├─ colors.xml
│  │           │  ├─ strings.xml
│  │           │  └─ styles.xml
│  │           ├─ mipmap-anydpi-v26
│  │           │  ├─ ic_launcher.xml
│  │           │  └─ ic_launcher_round.xml
│  │           └─ values-night
│  │              └─ colors.xml
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
│  └─ settings.gradle
└─ package.json

```