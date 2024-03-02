import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import app, { db } from 'src/firebase';

interface PostUserProps {
  email: string;
  name: string;
  password: string;
}

export const postUser = async (props: PostUserProps) => {
  const { email, name, password } = props;
  const auth = getAuth(app);
  const createdUser = await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser) await updateProfile(auth.currentUser, { displayName: name });

  /* db에 사용자 이름 저장 */
  set(ref(db, `users/${createdUser.user.uid}`), {
    name: createdUser.user.displayName,
  });
};
