import LoginDialog from '@components/LoginDialog/LoginDialog';
import LogoutButton from '@components/LogoutButton/LogoutButton';
import RegisterDialog from '@components/RegisterDialog/RegisterDialog';
import Spreadsheet from '@components/Spreadsheet/Spreadsheet';

import { useAuthSubscription } from '@hooks/auth/useAuthSubscription';

function App() {
  const { isLoggedIn, authenticatedUser } = useAuthSubscription();

  const items = isLoggedIn
    ? [
        <p>
          반가워요, {authenticatedUser.name}님!{'   '}
        </p>,
        LogoutButton,
      ]
    : [LoginDialog, RegisterDialog];

  return (
    <div className='relative w-full'>
      <Spreadsheet renderItems={items} />
    </div>
  );
}

export default App;
