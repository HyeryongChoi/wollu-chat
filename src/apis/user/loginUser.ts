import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from 'src/firebase';

interface LoginUserProps {
  email: string;
  password: string;
}

export const loginUser = async (props: LoginUserProps) => {
  const { email, password } = props;
  const auth = getAuth(app);

  await signInWithEmailAndPassword(auth, email, password);
};
