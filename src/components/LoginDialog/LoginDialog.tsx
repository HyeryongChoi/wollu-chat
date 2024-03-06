import Dialog from '@components/@common/Dialog/Dialog';
import LoginForm from '@components/LoginDialog/LoginForm';

function LoginDialog() {
  return (
    <Dialog>
      <Dialog.Trigger className='whitespace-pre'>로그인{'   '}</Dialog.Trigger>
      <LoginForm />
    </Dialog>
  );
}

export default LoginDialog;
