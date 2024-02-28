type Func<T> = (arg: T) => void;

export const executeSequentially = <T>(...funcs: Array<Func<T> | undefined>): Func<T> => {
  return arg => funcs.forEach(func => func?.(arg));
};
