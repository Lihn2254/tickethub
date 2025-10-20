import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOutsideClick = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    // Listen for mousedown events
    document.addEventListener('mousedown', listener);
    // Also listen for touchstart events for mobile devices
    document.addEventListener('touchstart', listener);

    // Cleanup function to remove the listeners when the component unmounts
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Rerun the effect if ref or handler changes
};