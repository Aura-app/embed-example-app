## Aura Embed Example App

This repository is a minimal React Native (Expo) app used to demonstrate embedding Aura inside a mobile app. It focuses on a simple, working integration so you can run it quickly, inspect the flow, and adapt it to your own app.

### Prerequisites
- **Node.js**: v22 recommended (see .nvmrc)
- **Package manager**: npm
- **Expo** tooling: installed via project scripts (`npm run start`) or `npx expo`
- For device builds:
  - **iOS**: macOS with Xcode
  - **Android**: Android Studio, an emulator or a device with USB debugging

### Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run start
   ```
3. Launch a platform target (in a separate terminal or from the Expo UI):
   ```bash
   npm run ios     # iOS simulator (requires Xcode)
   npm run android # Android emulator/device
   npm run web     # Web preview
   ```

### Security and backend integration
**Do not perform token exchange (token swap) or any privileged Aura API calls in the mobile app.** These should happen on your own backend, behind your authentication and authorization.

- Keep client credentials and signing secrets on the server only
- Implement minimal backend endpoints (e.g., `/aura/token`, `/aura/callout`) that:
  - authenticate/authorize the caller (your app user/session)
  - validate input and apply your business rules
  - call Aura services server-to-server using your secrets
  - return only short-lived tokens/URLs necessary for the client to open the embed
- Treat the in-app flows as examples only; do not ship secrets in the app bundle

See `src/screens/LoginScreen.tsx` for a reminder note; it demonstrates flow, not production security.

### Redirect and result handling
When the embedded flow finishes, it redirects to a `https://finish.com` URL that the app intercepts and summarizes. The app parses the following query parameters and shows them in an alert after navigating back:

- **status**: `completed`, `failed`, or `cancelled`
- **error_code**: present when `status=failed` (e.g., `payment_failed`)
- **signupSessionId**: Will always be returned
- **customerId**: Will be returned if an Aura customer was created during the flow
- **siteId**: Will be returned if a site (predefined location) was returned during the flow


See `src/screens/HomeScreen.tsx` for the URL handling logic.

### Configuration
- Runtime config lives in `src/config.js` and switches by `AURA_ENV` (from `@env`):
  - `staging` (default): uses the staging Aura API
  - `development`: uses the dev Aura API

Create a `.env` file to set the environment explicitly:
```ini
AURA_ENV=staging
```

You can run the app normally with `npm run start`. For device builds, ensure your `.env` is present before building.

### What to Explore
- `src/screens/MainScreen.tsx`: main embedded experience
- `src/screens/LoginScreen.tsx`: basic auth/login flow example
- `src/api/` and `src/config.js`: API base URLs and simple client wiring

### Troubleshooting
- If iOS build fails the first time, ensure Xcode command line tools are selected and try:
  ```bash
  cd ios && pod install && cd -
  ```
- Make sure an emulator is running before `npm run android`, or connect a device with USB debugging enabled.

### License
This example is provided for demonstration purposes. See the repository license for details.


