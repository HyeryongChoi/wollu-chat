import Dialog from '@components/@common/Dialog/Dialog';

function LoginDialog() {
  return (
    <Dialog>
      <Dialog.Trigger className='whitespace-pre'>로그인{'   '}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Close>닫기</Dialog.Close>
        로그인로직
      </Dialog.Content>
    </Dialog>
  );
}

export default LoginDialog;
