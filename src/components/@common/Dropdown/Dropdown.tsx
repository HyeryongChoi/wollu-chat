import { ComponentPropsWithoutRef, PropsWithChildren, cloneElement, useId } from 'react';

import DropdownProvider, { useDropdownContext } from '@components/@common/Dropdown/DropdownContext';
import Portal from '@components/@common/Portal/Portal';

import { executeSequentially, getValidChild } from '@utils/common';

export interface DropdownProps {}

function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const { children, ...restProps } = props;

  return (
    <DropdownProvider {...restProps}>
      <DropdownContainer>{children}</DropdownContainer>
    </DropdownProvider>
  );
}

function DropdownContainer(props: PropsWithChildren) {
  const { children } = props;
  const { openDropdown, closeDropdown } = useDropdownContext();

  return (
    <div className='relative' onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
      {children}
    </div>
  );
}

interface TriggerProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

function DropdownTrigger(props: TriggerProps) {
  const { asChild = false, children, ...restProps } = props;
  const child = asChild && getValidChild<TriggerProps>(children);

  if (child) {
    return cloneElement(child, {
      ...restProps,
    });
  }

  return (
    <button type='button' {...restProps}>
      {children || 'Trigger'}
    </button>
  );
}

interface ContentProps extends ComponentPropsWithoutRef<'ul'> {
  asChild?: boolean;
}

function DropdownContent(props: ContentProps) {
  const { asChild = false, children, ...restProps } = props;
  const { isOpen } = useDropdownContext();
  const child = asChild && getValidChild<ContentProps>(children);

  const content = child ? (
    cloneElement(child, {
      ...restProps,
    })
  ) : (
    <ul
      className={`absolute min-w-full rounded-lg bg-gray-50 p-1 shadow-md`}
      tabIndex={1}
      {...restProps}
    >
      {children}
    </ul>
  );

  return isOpen ? content : null;
}

interface ItemProps extends ComponentPropsWithoutRef<'li'> {
  asChild?: boolean;
}

function DropdownItem(props: ItemProps) {
  const { asChild = false, children, onClick: onClickProps, ...restProps } = props;
  const { closeDropdown } = useDropdownContext();
  const child = asChild && getValidChild<ItemProps>(children);
  const uid = useId();

  if (child) {
    return cloneElement(child, {
      ...restProps,
      onClick: executeSequentially(onClickProps, closeDropdown),
    });
  }

  return (
    <li
      className='cursor-pointer'
      key={uid}
      onClick={executeSequentially(onClickProps, closeDropdown)}
      {...restProps}
    >
      {children}
    </li>
  );
}

function DropdownPortal(props: PropsWithChildren) {
  const { children } = props;
  const { isOpen } = useDropdownContext();

  return isOpen ? <Portal>{children}</Portal> : null;
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Portal = DropdownPortal;

export default Dropdown;
