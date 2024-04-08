import { Button } from '@progress/kendo-react-buttons';
import { Popup } from '@progress/kendo-react-popup';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

export type HamburgerMenuProps = {
  parentElement: HTMLElement | null;
  items: (
    | string
    | ({
        /**
         * @param itemName Display name, $ for divider line
         */
        itemName: string;
        style?: React.CSSProperties;
        className?: string;
      } & (
        | { iconClass?: string; iconComponent?: never }
        | { iconClass?: never; iconComponent?: ReactNode }
      ))
  )[];
  onItemClick: (
    itemName: string,
    /**
     * Starts from 0, skips dividers
     */
    itemIndex: number
  ) => void;
};

export const HamburgerMenu = ({
  items,
  onItemClick,
  parentElement,
}: HamburgerMenuProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const buttonRef = useRef<Button>(null);
  const popupRef = useRef<Popup>(null);
  const firstItemRef = useRef<HTMLLIElement>();
  const lastFocusedEl = useRef<HTMLElement>();
  const itemList = items.map((item) =>
    typeof item === 'string'
      ? {
          key: crypto.randomUUID(),
          itemName: item,
          className: '',
          style: {},
          iconClass: null,
          iconComponent: <></>,
        }
      : { ...item, key: crypto.randomUUID() }
  );
  const noDividerList = itemList.filter((item) => item.itemName !== '$');

  const onDocumentFocus = useCallback((e: FocusEvent) => {
    const focusedEl = e.target as HTMLElement;
    if (
      !popupRef.current?.element?.contains(focusedEl) &&
      focusedEl !== buttonRef.current?.element
    )
      setShowPopup(false);
  }, []);

  const onItemKeyPress =
    (item: any, index: number) => (e: React.KeyboardEvent) => {
      const popupEl = popupRef.current?.element as HTMLElement | null;
      e.preventDefault();

      if (e.key === 'Enter') {
        e.stopPropagation();
        onItemClick(item.itemName, index);
        setShowPopup(false);
      }

      if (e.key === 'Escape') {
        e.stopPropagation();
        setShowPopup(false);
        lastFocusedEl.current?.focus();
      }

      const tabableEls: HTMLElement[] = Array.from(
        popupEl?.querySelectorAll('[tabindex]') ?? []
      );
      const currentIndex = Number(e.currentTarget.getAttribute('tabindex'));

      if (e.key === 'ArrowDown') {
        const nextEl = tabableEls.at(currentIndex + 1);
        if (nextEl) {
          nextEl.focus();
        } else {
          tabableEls.at(0)?.focus();
        }
      }

      if (e.key === 'ArrowUp') {
        tabableEls.at(currentIndex - 1)?.focus();
      }
    };

  useEffect(() => {
    const onDocumentKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'z' || e.key === 'Z')) {
        if (!showPopup) {
          lastFocusedEl.current = document.activeElement as HTMLElement;
          setShowPopup((prev) => !prev);
        }
        lastFocusedEl.current?.focus();
      }
    };

    parentElement?.addEventListener('keydown', onDocumentKeyPress);

    return () => {
      parentElement?.removeEventListener('keydown', onDocumentKeyPress);
    };
  }, [parentElement, showPopup]);

  return (
    <>
      <Button
        className="hamburger-menu mr-2"
        ref={buttonRef}
        icon="menu"
        fillMode={'flat'}
        onClick={() => setShowPopup((prev) => !prev)}
      />
      <Popup
        onOpen={(e) => {
          (e.target.element as HTMLElement).querySelector('li')?.focus();
          document.addEventListener('focus', onDocumentFocus, {
            capture: true,
          });
        }}
        onClose={() => {
          document.removeEventListener('focus', onDocumentFocus, {
            capture: true,
          });
        }}
        ref={popupRef}
        show={showPopup}
        anchor={buttonRef.current?.element}
      >
        <div className="min-w-20 min-h-10 bg-white rounded-sm ">
          <ul className="py-2">
            {itemList.map((item) => {
              const itemIndex = noDividerList.indexOf(item);

              if (item.itemName === '$') {
                return (
                  <li key={item.key}>
                    <div className="border-b-[1px] border-solid w-full " />
                  </li>
                );
              }

              return (
                <li
                  tabIndex={itemIndex}
                  ref={(el) => {
                    if (firstItemRef.current) return;
                    firstItemRef.current = el ?? undefined;
                  }}
                  onKeyDown={onItemKeyPress(item, itemIndex)}
                  onClick={() => {
                    onItemClick(item.itemName, itemIndex);
                    setShowPopup(false);
                  }}
                  key={item.key}
                  className={`grid 
              ${
                !item.iconComponent && !item.iconClass
                  ? 'grid-cols-1'
                  : 'grid-cols-[16px_1fr]'
              }
               items-center px-4 gap-2 h-[33.5px] leading-[33.5px] hover:bg-gray-200 hover:cursor-pointer focus:bg-gray-300 focus:outline-none ${
                 item.className ?? ''
               }`}
                  style={item.style}
                >
                  {item.iconComponent && item.iconComponent}
                  {item.iconClass && (
                    <span
                      className={`k-icon k-font-icon k-i-${item.iconClass}`}
                    />
                  )}

                  <span>{item.itemName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Popup>
    </>
  );
};
