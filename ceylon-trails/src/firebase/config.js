// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

console.log('=== FIREBASE CONFIG LOADING ===');

// Your web app's Firebase configuration
// REPLACE THESE WITH YOUR ACTUAL FIREBASE CREDENTIALS
const firebaseConfig = {
  apiKey: "AIzaSyBIf-fXRwCV02dsRq-eTpDBP8bNxXkpty4",
  authDomain: "ceylontrails-ba75e.firebaseapp.com",
  projectId: "ceylontrails-ba75e",
  storageBucket: "ceylontrails-ba75e.firebasestorage.app",
  messagingSenderId: "776839810430",
  appId: "1:776839810430:web:1f55d90deafe304e04372f"
};

console.log('Firebase config loaded:', {
  apiKey: firebaseConfig.apiKey ? '✓ Present' : '✗ Missing',
  authDomain: firebaseConfig.authDomain ? '✓ Present' : '✗ Missing',
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket ? '✓ Present' : '✗ Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✓ Present' : '✗ Missing',
  appId: firebaseConfig.appId ? '✓ Present' : '✗ Missing'
});

// Check if any value is still the placeholder
const hasPlaceholders = Object.values(firebaseConfig).some(val => 
  val && (val.includes('YOUR_') || val === 'YOUR_API_KEY')
);

if (hasPlaceholders) {
  console.error('⚠️ WARNING: Firebase config still has placeholder values!');
  console.error('Please update src/firebase/config.js with your actual Firebase credentials');
}

let app, db;

try {
  // Initialize Firebase
  console.log('Initializing Firebase app...');
  app = initializeApp(firebaseConfig);
  console.log('✓ Firebase app initialized successfully');

  // Initialize Firestore
  console.log('Initializing Firestore...');
  db = getFirestore(app);
  console.log('✓ Firestore initialized successfully');
  console.log('Firestore instance:', db);
} catch (error) {
  console.error('❌ Error initializing Firebase:', error);
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
}

export { db };
export default app;