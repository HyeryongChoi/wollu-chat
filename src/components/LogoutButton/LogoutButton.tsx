import { useLogoutMutation } from '@components/LogoutButton/Logout.hook';

function LogoutButton() {
  const { logout } = useLogoutMutation();

  return (
    <button type='button' onClick={logout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
