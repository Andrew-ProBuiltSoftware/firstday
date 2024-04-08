import React, { ElementRef, PropsWithChildren, useEffect, useRef } from 'react';

type DatePickerFocusTrapProps = {
  onKeyPress?: (event: React.KeyboardEvent) => void;
};

export const DatePickerFocusTrap = ({
  children,
  onKeyPress,
}: PropsWithChildren & DatePickerFocusTrapProps) => {
  const containerRef = useRef<ElementRef<'div'>>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const currTarget = event.target as HTMLElement;

    if (event.key === 'Enter') {
      currTarget.click();
    }
  };

  const onKeyPressCapture = (e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    handleKeyPress(e);
    onKeyPress?.(e);
  };

  return (
    <div onKeyDownCapture={onKeyPressCapture} tabIndex={-1} ref={containerRef}>
      {children}
    </div>
  );
};
