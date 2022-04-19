// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { connectFirestoreEmulator, Firestore, initializeFirestore } from 'firebase/firestore';

export class FirebaseClient {
  public readonly app: FirebaseApp;
  public readonly analytics: Analytics;
  public readonly store: Firestore;

  constructor(firebaseConfig: FirebaseOptions) {
    this.app = initializeApp(firebaseConfig);
    this.store = initializeFirestore(this.app, {
      ignoreUndefinedProperties: true,
    });
    this.analytics = getAnalytics(this.app);

    if (process.env.NODE_ENV === 'development') {
      connectFirestoreEmulator(this.store, 'localhost', 3000);
    }
  }
}
