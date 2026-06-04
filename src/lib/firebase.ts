import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Handle anonymous auth for guest interactions
export const ensureAuth = async () => {
  if (auth.currentUser) return auth.currentUser;
  
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        try {
          const result = await signInAnonymously(auth);
          resolve(result.user);
        } catch (error: any) {
          // If Anonymous Auth is disabled in Firebase Console, we'll get 'auth/admin-restricted-operation'
          // or 'auth/operation-not-allowed'. We handle this gracefully here.
          console.warn("Anonymous Auth is not enabled in Firebase Console. Interactions like likes/comments will be disabled.");
          
          if (error.code === 'auth/admin-restricted-operation' || error.code === 'auth/operation-not-allowed') {
             // Resolve with null so the app doesn't block loading
             resolve(null);
          } else {
             console.error("Auth Error:", error);
             reject(error);
          }
        }
      }
    });
  });
};
