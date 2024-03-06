import { useDialogContext } from '@components/@common/Dialog/DialogContext';

import { useMutation } from '@hooks/@common/useMutation';

import { loginUser } from '@apis/user/loginUser';

export const useLoginMutation = () => {
  const { closeDialog } = useDialogContext();

  const { mutate, ...restMutation } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      closeDialog();
      alert('로그인이 완료되었습니다.');
    },
  });

  return { login: mutate, ...restMutation };
};
