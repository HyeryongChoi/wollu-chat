import Dialog from '@components/@common/Dialog/Dialog';
import RegisterForm from '@components/RegisterDialog/RegisterForm';

function RegisterDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>회원가입</Dialog.Trigger>
      <RegisterForm />
    </Dialog>
  );
}

export default RegisterDialog;
