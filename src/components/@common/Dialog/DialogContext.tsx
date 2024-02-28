import { PropsWithChildren, RefObject, createContext, useCallback, useMemo, useRef } from 'react';

import { DialogProps } from '@components/@common/Dialog/Dialog';

import { useContextInScope } from '@hooks/@common/useContextInScope';

interface DialogContext {
  defaultOpen: boolean;
  dialogRef: RefObject<HTMLDialogElement>;
  inScope: boolean;
  openDialog: VoidFunction;
  closeDialog: VoidFunction;
}

interface DialogProviderProps extends DialogProps {}

const DialogContext = createContext<DialogContext>({
  defaultOpen: false,
  dialogRef: { current: null },
  inScope: false,
  openDialog: () => {},
  closeDialog: () => {},
});

const DIALOG_NAME = 'Dialog';
DialogContext.displayName = DIALOG_NAME;

export const useDialogContext = () => useContextInScope(DialogContext);

function DialogProvider(props: PropsWithChildren<DialogProviderProps>) {
  const { defaultOpen = false, children } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = useCallback(() => dialogRef.current?.showModal(), []);
  const closeDialog = useCallback(() => dialogRef.current?.close(), []);

  const memoizedValue = useMemo(
    () => ({
      defaultOpen,
      dialogRef,
      inScope: true,
      openDialog,
      closeDialog,
    }),
    [defaultOpen, openDialog, closeDialog],
  );

  return <DialogContext.Provider value={memoizedValue}>{children}</DialogContext.Provider>;
}

export default DialogProvider;
