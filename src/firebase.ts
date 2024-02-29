import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBAKyFUv1HIU5CXmxsOae45xurMt4Ravlo',
  authDomain: 'wollu-chat-8d756.firebaseapp.com',
  projectId: 'wollu-chat-8d756',
  storageBucket: 'wollu-chat-8d756.appspot.com',
  messagingSenderId: '360751653285',
  appId: '1:360751653285:web:01695b1aa293a9756f484c',
  measurementId: 'G-NRNYBCJ9GE',
  databaseURL: ' https://wollu-chat-8d756-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, 'notification_received');

export const db = getDatabase(app);
export default app;
