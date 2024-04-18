import { PropsWithChildren, createContext, useMemo } from 'react';

import { DropdownProps } from '@components/@common/Dropdown/Dropdown';
import { useDropdown } from '@components/@common/Dropdown/Dropdown.hook';

import { useContextInScope } from '@hooks/@common/useContextInScope';

interface DropdownContext {
  inScope: boolean;
  isOpen: boolean;
  openDropdown: VoidFunction;
  closeDropdown: VoidFunction;
}

interface DropdownProviderProps extends DropdownProps {}

const DropdownContext = createContext<DropdownContext>({
  inScope: false,
  isOpen: false,
  openDropdown: () => {},
  closeDropdown: () => {},
});

const DROPDOWN_NAME = 'Dropdown';
DropdownContext.displayName = DROPDOWN_NAME;

export const useDropdownContext = () => useContextInScope(DropdownContext);

function DropdownProvider(props: PropsWithChildren<DropdownProviderProps>) {
  const { children } = props;
  const { isOpen, openDropdown, closeDropdown } = useDropdown();

  const memoizedValue = useMemo(
    () => ({
      inScope: true,
      isOpen,
      openDropdown,
      closeDropdown,
    }),
    [isOpen, openDropdown, closeDropdown],
  );

  return <DropdownContext.Provider value={memoizedValue}>{children}</DropdownContext.Provider>;
}

export default DropdownProvider;
