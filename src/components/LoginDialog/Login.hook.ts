import { useMutation } from '@hooks/@common/useMutation';

import { loginUser } from '@apis/user/loginUser';

export const useLoginMutation = () => {
  const { mutate, ...restMutation } = useMutation({
    mutationFn: loginUser,
  });

  return { login: mutate, ...restMutation };
};
