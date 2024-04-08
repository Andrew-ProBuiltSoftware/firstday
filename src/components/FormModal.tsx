import {
  ForwardedRef,
  ReactElement,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import { Button } from '@progress/kendo-react-buttons';
import {
  Window as KendoWindow,
  WindowProps,
  WindowActionsEvent,
} from '@progress/kendo-react-dialogs';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

interface FormModalProp extends WindowProps {
  onClose: () => void;
  onSave?: () => void;
  onApply?: () => void;
  onDelete?: () => void;
  hamburgerMenu?: ReactNode;
  onCustomButton?: ReactElement;
}
const FormModal = forwardRef(
  (
    {
      title,
      onClose,
      onSave,
      onApply,
      onDelete,
      children,
      className,
      onCustomButton,
      hamburgerMenu,
      ...props
    }: FormModalProp,
    forwardedRef: ForwardedRef<KendoWindow>
  ) => {
    const windowRef = useRef<KendoWindow>(null);

    useImperativeHandle(forwardedRef, () => windowRef.current!);

    useLayoutEffect(() => {
      if (windowRef.current) {
        (
          windowRef.current.element?.querySelector(
            "input[tabindex='101']"
          ) as HTMLInputElement
        )?.select();
      }

      function handleKeyPress(event: KeyboardEvent) {
        if (event.target === event.currentTarget) {
          if (event.key === 'Enter') {
            event.preventDefault();
            return;
          }
          if (event.key === 'Tab') {
            if (event.altKey) {
              console.log('Alt Key pressed!');
            }
            event.preventDefault();
            return;
          }
        }

        const target = event.target as HTMLElement;
        const tabIndex = target.tabIndex;

        const currentTarget = event.currentTarget as HTMLDivElement;

        function nextFocus(tabIndex: number) {
          console.log(`tab: ${tabIndex}`);
          if (tabIndex === 200) {
            nextFocus(101);
          } else {
            const sourceElement = currentTarget.querySelector(
              `[tabindex='${tabIndex}']`
            ) as HTMLElement;
            if (!sourceElement) {
              nextFocus(198);
            } else if (
              sourceElement.ariaDisabled === 'true' ||
              (sourceElement as HTMLButtonElement).disabled
            ) {
              nextFocus(tabIndex + 1);
            } else {
              if (sourceElement.tagName === 'INPUT')
                (sourceElement as HTMLInputElement).select();
              else sourceElement.focus();
            }
          }
        }

        function prevFocus(tabIndex: number) {
          console.log(`tab: ${tabIndex}`);
          if (tabIndex === 0 || tabIndex === 100) {
            prevFocus(199);
          } else {
            const sourceElement = currentTarget.querySelector(
              `[tabindex='${tabIndex}']`
            ) as HTMLElement;

            if (!sourceElement) {
              const elements = Array.from(
                currentTarget.querySelectorAll(
                  "[tabindex]:not([tabindex='-1']):not([tabindex='0']):not([disabled])"
                )
              );

              if (elements.length > 1) {
                const element = elements[elements.length - 3] as HTMLElement;
                if (element.tagName === 'INPUT') {
                  (element as HTMLInputElement).select();
                } else {
                  element.focus();
                }
              }
              prevFocus(tabIndex - 1); // re-check this line if shifttab not working
            } else if (
              sourceElement.ariaDisabled === 'true' ||
              (sourceElement as HTMLButtonElement).disabled
            ) {
              prevFocus(tabIndex - 1);
            } else {
              if (sourceElement.tagName === 'INPUT')
                (sourceElement as HTMLInputElement).select();
              else sourceElement.focus();
            }
          }
        }

        if (event.key === 'Tab' && tabIndex > 0) {
          if (event.shiftKey) {
            // Shift + Tab
            prevFocus(tabIndex - 1);
          } else {
            nextFocus(tabIndex + 1);
          }
          event.preventDefault();
        }

        if (event.key === 'Enter' && tabIndex > 0) {
          if (target.ariaExpanded !== 'true') {
            if (tabIndex === 198 || tabIndex === 199) target.click();
            else nextFocus(tabIndex + 1);
          }

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowRef]);

    useKeyboardShortcuts(windowRef, onSave, onClose, onApply, onDelete);

    return (
      <KendoWindow
        {...props}
        maximizeButton={() => null}
        minimizeButton={() => null}
        restoreButton={() => null}
        resizable={false}
        draggable={props.draggable || false}
        doubleClickStageChange={false}
        shouldUpdateOnDrag={false}
        modal={true}
        // overlayStyle={{ backgroundColor: 'transparent' }}
        title={
          <>
            {hamburgerMenu}
            {title}
            {onCustomButton}
          </>
        }
        onClose={(e: WindowActionsEvent) => {
          e.nativeEvent.preventDefault();
          onClose();
        }}
        closeButton={() => (
          <Button
            icon="x"
            fillMode="flat"
            onClick={onClose}
            className="hover:!bg-red-500 h-[40px]"
          />
        )}
        ref={windowRef}
        className={`form-modal ${className ? className : ''}`}
      >
        {children}
      </KendoWindow>
    );
  }
);

export default FormModal;
