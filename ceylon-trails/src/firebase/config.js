// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const isDev = process.env.NODE_ENV !== 'production';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Dev-only sanity check: confirms env vars loaded WITHOUT printing
// project id, keys, or any other identifying values to the console.
if (isDev) {
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error('⚠️ Missing Firebase env vars:', missing.join(', '));
  }

  const hasPlaceholders = Object.values(firebaseConfig).some(val =>
    val && (val.includes('YOUR_') || val === 'YOUR_API_KEY')
  );

  if (hasPlaceholders) {
    console.error('⚠️ Firebase config still has placeholder values. Update your .env file.');
  }
}

let app, db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  // Log only the error code/message — never the config or initialized
  // instances — and only outside production.
  if (isDev) {
    console.error('❌ Error initializing Firebase:', error.code || error.message);
  }
}

export { db };
export default app;