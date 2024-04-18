import {
  ComponentPropsWithoutRef,
  MouseEvent,
  PropsWithChildren,
  cloneElement,
  useEffect,
} from 'react';

import { executeSequentially, getValidChild } from '@utils/common';

import DialogProvider, { useDialogContext } from './DialogContext';

export interface DialogProps {
  defaultOpen?: boolean;
}

interface TriggerProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

interface ContentProps extends ComponentPropsWithoutRef<'dialog'> {
  onBackdropClick?: VoidFunction;
}

interface CloseProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

function Dialog(props: PropsWithChildren<DialogProps>) {
  const { children, ...restProps } = props;

  return <DialogProvider {...restProps}>{children}</DialogProvider>;
}

function Trigger(props: TriggerProps) {
  const { asChild = false, children, onClick: onClickProps, ...restProps } = props;
  const { openDialog } = useDialogContext();
  const child = asChild && getValidChild<TriggerProps>(children);

  if (child) {
    return cloneElement(child, {
      ...restProps,
      onClick: executeSequentially(onClickProps, openDialog),
    });
  }

  return (
    <button type='button' onClick={executeSequentially(onClickProps, openDialog)} {...restProps}>
      {children || 'Trigger'}
    </button>
  );
}

function Content(props: ContentProps) {
  const { children, onBackdropClick, ...restProps } = props;
  const { defaultOpen, dialogRef, openDialog, closeDialog } = useDialogContext();

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.currentTarget === e.target) executeSequentially(onBackdropClick, closeDialog)(null);
  };

  useEffect(() => {
    if (defaultOpen) openDialog();
  }, [defaultOpen, openDialog]);

  return (
    <dialog
      className='rounded-lg border-none shadow-md'
      ref={dialogRef}
      onClick={handleBackdropClick}
      {...restProps}
    >
      {children}
    </dialog>
  );
}

function Close(props: CloseProps) {
  const { asChild = false, children, onClick: onClickProps, ...restProps } = props;
  const { closeDialog } = useDialogContext();
  const child = asChild && getValidChild<CloseProps>(children);

  if (child) {
    return cloneElement(child, {
      ...restProps,
      onClick: executeSequentially(onClickProps, closeDialog),
    });
  }

  return (
    <button type='button' onClick={executeSequentially(onClickProps, closeDialog)} {...restProps}>
      {children || 'Close'}
    </button>
  );
}

Dialog.Trigger = Trigger;
Dialog.Content = Content;
Dialog.Close = Close;

export default Dialog;
