# NovelliaPet

A React Native (Expo) app for managing your pets and their medical records.

## Requirements

- [Node.js](https://nodejs.org/) v18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- [Expo Go](https://expo.dev/client) installed on your iOS device or Xcode with an iOS simulator

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app and backend

   ```bash
   npm run dev
   ```

## App Architecture

NovelliaPet follows a layered architecture with unidirectional data flow. Dependencies only flow downward — UI calls context, context calls services, services call the API.

### Layers

**`/services`** — Data layer. Responsible only for API calls. No state, no business logic.

```
services/
  userService.ts
  petService.ts
  recordService.ts
```

**`/context`** — Business logic layer. Manages in-memory state and exposes actions to the UI. Calls services and updates state with the results.

```
context/
  UserContext.tsx
  PetContext.tsx
```

**`/app` + `/components`** — UI layer. Screens and components consume context state and dispatch context actions. They never import from `/services` directly.

**Navigation** — Expo Router (file-based). Sits alongside the UI layer and reacts to context state (e.g. redirecting unauthenticated users to the login screen).

**`/types`** — Shared TypeScript interfaces for all data models.

```
types/
  models.ts
```

### Data Flow

```
[User]
  | taps, form submits
  ↓
[/app + /components]        ←→        [navigation]
  screens & UI                        expo-router
  ↑  ↓
  | actions down, state up
[/context]
  UserContext.tsx
  PetContext.tsx
  ↑  ↓
  | called by / returns data to
[/services]
  userService.ts
  petService.ts
  recordService.ts
  ↑  ↓
  | fetch calls (GET, POST, PUT, DELETE)
[API / server.js]
```

### Backend

A lightweight Express server (`server.js`) running on port 4000 with in-memory storage. Start it standalone with:

```bash
node server.js
```

or run it with the rest of the app using

```bash
npm run dev
```

#### Endpoints

| Method   | Route                                          | Description                   |
| -------- | ---------------------------------------------- | ----------------------------- |
| `POST`   | `/users`                                       | Create account                |
| `POST`   | `/users/login`                                 | Log in by username            |
| `POST`   | `/users/:userId/logout`                        | Log out                       |
| `GET`    | `/users/:userId/pets`                          | Get all pets                  |
| `POST`   | `/users/:userId/pets`                          | Add a pet                     |
| `GET`    | `/users/:userId/pets/:petId`                   | Get pet + its records         |
| `PUT`    | `/users/:userId/pets/:petId`                   | Update pet                    |
| `DELETE` | `/users/:userId/pets/:petId`                   | Delete pet (cascades records) |
| `POST`   | `/users/:userId/pets/:petId/records`           | Add a record                  |
| `PUT`    | `/users/:userId/pets/:petId/records/:recordId` | Update a record               |
| `DELETE` | `/users/:userId/pets/:petId/records/:recordId` | Delete a record               |

---
