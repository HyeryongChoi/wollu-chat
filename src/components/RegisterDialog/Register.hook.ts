import { useDialogContext } from '@components/@common/Dialog/DialogContext';

import { useMutation } from '@hooks/@common/useMutation';

import { postUser } from '@apis/user/postUser';

export const useRegisterMutation = () => {
  const { closeDialog } = useDialogContext();

  const { mutate, ...restMutation } = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      closeDialog();
      alert('회원가입이 완료되었습니다.');
    },
  });

  return { register: mutate, ...restMutation };
};
