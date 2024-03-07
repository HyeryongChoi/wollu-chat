import { getAuth, signOut } from 'firebase/auth';
import app from 'src/firebase';

export const logoutUser = async () => {
  const auth = getAuth(app);

  await signOut(auth);
};
