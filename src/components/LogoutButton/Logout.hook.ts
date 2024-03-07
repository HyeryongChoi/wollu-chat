import { useMutation } from '@hooks/@common/useMutation';

import { logoutUser } from '@apis/user/logoutUser';

export const useLogoutMutation = () => {
  const { mutate, ...restMutation } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      alert('로그아웃이 완료되었습니다.');
    },
  });

  return { logout: mutate, ...restMutation };
};
