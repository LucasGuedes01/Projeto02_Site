import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAimJuIeZfLJRv7vejsqJ0te6Ut1_rVlKw",
  authDomain: "rio-amambai-agroenergia.firebaseapp.com",
  projectId: "rio-amambai-agroenergia",
  storageBucket: "rio-amambai-agroenergia.appspot.com",
  messagingSenderId: "441581683512",
  appId: "1:441581683512:web:53a5896fb2f367c5bc77cd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.warn('Firebase persistence failed: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // The current browser doesn't support persistence
    console.warn('Firebase persistence not supported in this browser');
  }
});

// Add connection state listener
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Reconnecting to Firebase...');
  });
}

export default app;