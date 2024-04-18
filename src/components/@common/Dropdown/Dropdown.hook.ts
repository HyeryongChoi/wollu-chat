import { useCallback, useEffect, useState } from 'react';

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openDropdown = useCallback(() => setIsOpen(true), []);
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const closeWithEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeDropdown();
  }, []);

  useEffect(() => {
    isOpen
      ? document.addEventListener('keydown', closeWithEscape)
      : document.removeEventListener('keydown', closeWithEscape);

    return () => document.removeEventListener('keydown', closeWithEscape);
  }, [isOpen, closeWithEscape]);

  return { isOpen, openDropdown, closeDropdown, closeWithEscape };
};
