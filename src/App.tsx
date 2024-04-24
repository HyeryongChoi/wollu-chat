import { useEffect } from 'react';

import LoginDialog from '@components/LoginDialog/LoginDialog';
import LogoutButton from '@components/LogoutButton/LogoutButton';
import RegisterDialog from '@components/RegisterDialog/RegisterDialog';
import Spreadsheet from '@components/Spreadsheet/Spreadsheet';
import UserDropdown from '@components/UserDropdown/UserDropdown';

import { useAuthSubscription } from '@hooks/auth/useAuthSubscription';

function App() {
  const { isLoggedIn } = useAuthSubscription();

  const items = isLoggedIn ? [UserDropdown, LogoutButton] : [LoginDialog, RegisterDialog];

  useEffect(() => {
    /** @todo toast로 변경 */
    if (isLoggedIn) alert('로그인이 완료되었습니다.');
  }, [isLoggedIn]);
  return (
    <div className='relative w-full'>
      <Spreadsheet renderItems={items} />
    </div>
  );
}

export default App;
