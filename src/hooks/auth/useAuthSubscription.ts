import { useEffect } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useAppDispatch, useAppSelector } from '@store/index';
import { clearUser, selectUser, setUser } from '@store/userSlice';

export const useAuthSubscription = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    const unsubscribeAuthChange = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName,
          }),
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => {
      unsubscribeAuthChange();
    };
  }, []);

  return { isLoggedIn: currentUser.uid.length > 0 };
};
