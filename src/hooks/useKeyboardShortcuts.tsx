import { useEffect } from 'react';
import { WindowHandle } from '@progress/kendo-react-dialogs';

const useKeyboardShortcuts = (
  windowRef: React.RefObject<WindowHandle>,
  onAltSPress?: () => void,
  onAltCPress?: () => void,
  onAltAPress?: () => void,
  onAltDPress?: () => void
) => {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      // Shortcut Key
      if (
        event.altKey &&
        (event.key === 's' ||
          event.key === 'S' ||
          event.key === 'ß' ||
          event.key === 'Í')
      ) {
        onAltSPress?.();
        event.preventDefault();
      } else if (
        event.altKey &&
        (event.key === 'c' ||
          event.key === 'C' ||
          event.key === 'ç' ||
          event.key === 'Ç')
      ) {
        onAltCPress?.();
        event.preventDefault();
      } else if (
        event.altKey &&
        (event.key === 'a' ||
          event.key === 'A' ||
          event.key === 'å' ||
          event.key === 'Å')
      ) {
        onAltAPress?.();
        event.preventDefault();
      } else if (
        event.altKey &&
        (event.key === 'd' ||
          event.key === 'D' ||
          event.key === '∂' ||
          event.key === 'Î')
      ) {
        onAltDPress?.();
        event.preventDefault();
      }
    }

    windowRef.current?.element?.addEventListener('keydown', handleKeyPress);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      windowRef.current?.element?.removeEventListener(
        'keydown',
        handleKeyPress
      );
    };
  }, [windowRef, onAltSPress, onAltCPress, onAltAPress, onAltDPress]);
};

export default useKeyboardShortcuts;
