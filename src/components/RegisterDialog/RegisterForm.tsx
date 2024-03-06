import { useForm } from 'react-hook-form';

import Dialog from '@components/@common/Dialog/Dialog';
import { useRegisterMutation } from '@components/RegisterDialog/Register.hook';

interface RegisterFormValues {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

function RegisterForm() {
  const { register, isLoading, errorMessage: errorMessageFromSubmit } = useRegisterMutation();

  const {
    formState: { errors },
    register: registerFormValue,
    watch,
    reset,
    handleSubmit,
  } = useForm<RegisterFormValues>({ mode: 'onChange' });

  const password = watch('password');

  const onSubmit = (data: RegisterFormValues) => {
    register({ email: data.email, name: data.name, password: data.password });
  };

  return (
    <Dialog.Content onBackdropClick={() => reset()}>
      <div className='min-w-96 px-7 py-5'>
        <div className='flex justify-end'>
          <Dialog.Close aria-label='닫기' onClick={() => reset()}>
            X
          </Dialog.Close>
        </div>
        <div className='mb-5 text-center'>
          <h3 className='text-lg font-bold text-gray-800'>회원가입</h3>
        </div>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='email-register' className='mb-1 block font-bold text-gray-700'>
            이메일
          </label>
          <input
            id='email-register'
            type='email'
            placeholder='123@example.com'
            {...registerFormValue('email', { required: true, pattern: /^\S+@\S+$/i })}
            className='mb-1 w-full appearance-none border-b bg-transparent px-2 py-1 focus:border-gray-400 focus:outline-none'
          />
          <p className='mb-1 h-4 text-xs text-red-400' aria-live='assertive'>
            {errors.email && errors.email.type === 'required' && '이메일을 입력해 주세요.'}
            {errors.email &&
              errors.email.type === 'pattern' &&
              '올바른 이메일 형식으로 입력해 주세요.'}
          </p>

          <label htmlFor='name-register' className='mb-1 block font-bold text-gray-700'>
            이름
          </label>
          <input
            id='name-register'
            placeholder='한글 또는 영문 대소문자로 구성된 이름을 입력해 주세요.'
            {...registerFormValue('name', {
              required: true,
              maxLength: 10,
              pattern: /^[a-zA-Z가-힣]+$/,
            })}
            className='mb-1 w-full appearance-none border-b bg-transparent px-2 py-1 focus:border-gray-400 focus:outline-none'
          />
          <p className='mb-1 h-4 text-xs text-red-400' aria-live='assertive'>
            {errors.name && errors.name.type === 'required' && '이름을 입력해 주세요.'}
            {errors.name && errors.name.type === 'maxLength' && '이름은 최대 10자 이하여야 합니다.'}
            {errors.name &&
              errors.name.type === 'pattern' &&
              '이름에는 한글 또는 영문 대소문자만 포함 가능합니다.'}
          </p>

          <label htmlFor='password-register' className='mb-1 block font-bold text-gray-700'>
            비밀번호
          </label>
          <input
            id='password-register'
            type='password'
            placeholder='******'
            {...registerFormValue('password', { required: true, minLength: 8, maxLength: 32 })}
            className='mb-1 w-full appearance-none border-b bg-transparent px-2 py-1 focus:border-gray-400 focus:outline-none'
          />
          <p className='mb-1 h-4 text-xs text-red-400' aria-live='assertive'>
            {errors.password && errors.password.type === 'required' && '비밀번호를 입력해 주세요.'}
            {errors.password &&
              errors.password.type === 'minLength' &&
              '비밀번호는 최소 8자 이상으로 입력해 주세요.'}
            {errors.password &&
              errors.password.type === 'maxLength' &&
              '비밀번호는 최대 32자 이하로 입력해 주세요.'}
          </p>

          <label htmlFor='password-confirm' className='mb-1 block font-bold text-gray-700'>
            비밀번호 확인
          </label>
          <input
            id='password-confirm'
            type='password'
            placeholder='******'
            {...registerFormValue('passwordConfirm', {
              required: true,
              validate: passwordConfirm => passwordConfirm === password,
            })}
            className='mb-1 w-full appearance-none border-b bg-transparent px-2 py-1 focus:border-gray-400 focus:outline-none'
          />
          <p className='mb-1 h-4 text-xs text-red-400' aria-live='assertive'>
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === 'required' &&
              '비밀번호 확인을 입력해 주세요.'}
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === 'validate' &&
              '비밀번호가 다릅니다.'}
          </p>

          <p className='mb-2 h-4 text-xs text-red-400' aria-live='assertive'>
            {errorMessageFromSubmit}
          </p>

          <button
            type='submit'
            disabled={isLoading}
            className='block h-12 w-full rounded border-none bg-blue-500 p-2 text-sm text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300'
          >
            회원가입
          </button>
        </form>
      </div>
    </Dialog.Content>
  );
}

export default RegisterForm;
