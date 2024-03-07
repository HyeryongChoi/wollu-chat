import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useAppSelector } from '@store/index';
import { clearUser, selectUser, setUser } from '@store/userSlice';

import LoginDialog from '@components/LoginDialog/LoginDialog';
import LogoutButton from '@components/LogoutButton/LogoutButton';
import RegisterDialog from '@components/RegisterDialog/RegisterDialog';
import Spreadsheet from '@components/Spreadsheet/Spreadsheet';

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
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

  const items = currentUser.uid ? [LogoutButton] : [LoginDialog, RegisterDialog];

  return (
    <div className='relative w-full'>
      <Spreadsheet renderItems={items} />
    </div>
  );
}

export default App;
