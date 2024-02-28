import { Context, useContext } from 'react';

interface InScope {
  inScope: boolean;
}

export const useContextInScope = <T extends InScope>(context: Context<T>) => {
  const value = useContext(context);

  if (!value.inScope) throw new Error(`Must use in ${context.displayName || 'root component'}`);

  return value;
};
