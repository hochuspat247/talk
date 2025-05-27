
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
│  │  └─ default-avatar.png
│  ├─ icons
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
│  │  └─ MasterNavigator.tsx
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
│  │  │  ├─ Home
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  └─ types.ts
│  │  │  ├─ Profile
│  │  │  │  ├─ ProfileMenu
│  │  │  │  │  ├─ index.tsx
│  │  │  │  │  ├─ styled.ts
│  │  │  │  │  └─ types.ts
│  │  │  │  ├─ ProfileSettings
│  │  │  │  │  ├─ index.tsx
│  │  │  │  │  ├─ styled.ts
│  │  │  │  │  └─ types.ts
│  │  │  │  └─ index.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ NewBooking
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ types.ts
│  │  │  │  └─ styled.ts
│  │  │  └─ Map
│  │  │     ├─ index.tsx
│  │  │     ├─ styled.ts
│  │  │     └─ types.ts
│  │  └─ Master
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
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  └─ constants.ts
│  │  │  ├─ CalendarEventCard
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ utils.ts
│  │  │  │  └─ constants.ts
│  │  │  ├─ CalendarEventList
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ utils.ts
│  │  │  │  └─ constants.ts
│  │  │  ├─ ProfileHeader
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ constants.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ ProfileMenuList
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ constants.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ AvatarPicker
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ constants.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ SegmentedControl
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ constants.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ ExperienceControl
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ constants.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ ClientFilter
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ constants.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ DetailedEventCard
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ styled.ts
│  │  │  │  ├─ utils.ts
│  │  │  │  ├─ Header.tsx
│  │  │  │  └─ InfoRow.tsx
│  │  │  └─ AvailabilityCalendar
│  │  │     ├─ index.tsx
│  │  │     ├─ types.ts
│  │  │     ├─ styled.ts
│  │  │     ├─ utils.ts
│  │  │     ├─ hooks.ts
│  │  │     ├─ Header.tsx
│  │  │     ├─ WeekDays.tsx
│  │  │     └─ DaysGrid.tsx
│  │  └─ Layout
│  │     ├─ Screen
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  └─ types.ts
│  │     ├─ TransparentContainer
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  └─ types.ts
│  │     ├─ Header
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  ├─ types.ts
│  │     │  └─ constants.ts
│  │     ├─ BookingSummary
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  ├─ types.ts
│  │     │  └─ utils.ts
│  │     ├─ TimePicker
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  ├─ types.ts
│  │     │  ├─ utils.ts
│  │     │  └─ constants.ts
│  │     ├─ WeeklyEventsList
│  │     │  ├─ index.tsx
│  │     │  ├─ types.ts
│  │     │  ├─ styled.ts
│  │     │  ├─ utils.ts
│  │     │  └─ DayBlock.tsx
│  │     ├─ MapWebView
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  └─ types.ts
│  │     ├─ BookingForm
│  │     │  ├─ index.tsx
│  │     │  ├─ styled.ts
│  │     │  └─ types.ts
│  │     └─ TimeSlots
│  │        ├─ index.tsx
│  │        └─ styled.ts
│  ├─ constants
│  │  ├─ Colors.ts
│  │  ├─ Fonts.ts
│  │  ├─ Texts.ts
│  │  ├─ FontSizes.ts
│  │  ├─ phone.ts
│  │  └─ client
│  │     ├─ apiKeys.ts
│  │     ├─ geocoding.ts
│  │     ├─ booking.ts
│  │     └─ profile.ts
│  ├─ api
│  │  ├─ auth.ts
│  │  ├─ bookings.ts
│  │  ├─ users.ts
│  │  ├─ courts.ts
│  │  ├─ profile.ts
│  │  ├─ types.ts
│  │  ├─ client.ts
│  │  ├─ axiosInstance.ts
│  │  └─ models
│  │     └─ booking.ts
│  ├─ utils
│  │  ├─ index.ts
│  │  ├─ auth
│  │  │  ├─ passwordValidator.ts
│  │  │  └─ registeredUsers.ts
│  │  ├─ formatters
│  │  │  ├─ phoneFormatter.ts
│  │  │  └─ formatters.ts
│  │  └─ client
│  │     ├─ HomeBookingUtils.ts
│  │     ├─ MapUtils.ts
│  │     ├─ ProfileMenuUtils.ts
│  │     └─ ProfileSettings.ts
│  ├─ hooks
│  │  ├─ index.ts
│  │  ├─ general
│  │  │  ├─ useKeyboardVisibility.ts
│  │  │  ├─ useNavigationHandler.ts
│  │  │  ├─ usePasswordStrength.ts
│  │  │  ├─ usePhoneFormatter.ts
│  │  │  ├─ useTextInput.ts
│  │  │  └─ useTimer.ts
│  │  ├─ auth
│  │  │  ├─ index.ts
│  │  │  ├─ useLoginLogic.ts
│  │  │  ├─ usePasswordLogic.ts
│  │  │  ├─ useRegisterLogic.ts
│  │  │  └─ useVerificationLogic.ts
│  │  └─ client
│  └─ mocks
│     └─ mockData.ts
├─ README.md
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
│  │        └─ res
│  │           ├─ drawable
│  │           │  ├─ ic_launcher_background.xml
│  │           │  └─ rn_edit_text_material.xml
│  │           ├─ drawable-hdpi
│  │           │  └─ splashscreen_logo.png
│  │           ├─ drawable-mdpi
│  │           │  └─ splashscreen_logo.png
│  │           ├─ drawable-xhdpi
│  │           │  └─ splashscreen_logo.png
│  │           ├─ drawable-xxhdpi
│  │           │  └─ splashscreen_logo.png
│  │           ├─ drawable-xxxhdpi
│  │           │  └─ splashscreen_logo.png
│  │           ├─ mipmap-hdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  └─ ic_launcher_foreground.webp
│  │           ├─ mipmap-mdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  └─ ic_launcher_foreground.webp
│  │           ├─ mipmap-xhdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  └─ ic_launcher_foreground.webp
│  │           ├─ mipmap-xxhdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  └─ ic_launcher_foreground.webp
│  │           ├─ mipmap-xxxhdpi
│  │           │  ├─ ic_launcher.webp
│  │           │  ├─ ic_launcher_round.webp
│  │           │  └─ ic_launcher_foreground.webp
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
├─ app.json
├─ package.json
├─ removeComments.js
└─ package-lock.json

```