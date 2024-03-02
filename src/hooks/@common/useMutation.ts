import { useState } from 'react';

type MutationFunction<TData = unknown, TProps = unknown> = (props: TProps) => Promise<TData>;

interface UseMutationProps<TData = unknown, TProps = never> {
  mutationFn: MutationFunction<TData, TProps>;
  onSuccess?: VoidFunction;
}

export const useMutation = <TData = unknown, TProps = never>(
  props: UseMutationProps<TData, TProps>,
) => {
  const { mutationFn, onSuccess = () => {} } = props;

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mutate = async (props: Parameters<typeof mutationFn>[number]) => {
    try {
      setIsLoading(true);
      await mutationFn(props);
    } catch (error) {
      setIsError(true);

      if (error instanceof Error) {
        console.error(error.message);
        setErrorMessage(error.message);

        setTimeout(() => {
          setErrorMessage('');
        }, ERROR_MESSAGE_VISIBLE_TIME);
      }
    } finally {
      setIsLoading(false);
      setIsSuccess(!isError);

      if (!isError) onSuccess();
    }
  };

  return { mutate, isSuccess, isLoading, isError, errorMessage };
};

const ERROR_MESSAGE_VISIBLE_TIME = 3000;
