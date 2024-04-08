import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  ComboBoxBlurEvent,
  ComboBoxChangeEvent,
  ComboBoxCloseEvent,
  MultiColumnComboBox,
  MultiColumnComboBoxHandle,
  MultiColumnComboBoxProps,
} from '@progress/kendo-react-dropdowns';

interface Props extends Omit<MultiColumnComboBoxProps, 'ref'> {
  ariaColumnIndex?: number;
  /**
   * Restrict control's ability to clear value
   */
  restrictBlank?: boolean;
  headers?: boolean;
  textField: string;
  dataItemKey: string;
  readOnly?: boolean;
}

const CustomDropdown = React.forwardRef<MultiColumnComboBoxHandle, Props>(
  (
    {
      data,
      value,
      textField,
      dataItemKey,
      ariaColumnIndex,
      fillMode = 'outline',
      onClose,
      restrictBlank,
      headers,
      readOnly,
      ...props
    },
    ref
  ) => {
    const comboboxRef = useRef<MultiColumnComboBoxHandle>(null);

    useImperativeHandle(
      ref,
      () => comboboxRef.current as MultiColumnComboBoxHandle
    );

    const [placeholder, setPlaceholder] = useState<string>('');
    const [controlledValue, setControllledValue] = useState(value);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [opened, setOpened] = useState<boolean>(false);
    const [dropdownData, setDropdownData] = useState<any[]>(data || []);

    useEffect(() => {
      setPlaceholder('');
      // console.log(`${textField} test alue 1,`, value)
      setControllledValue(value);
    }, [value]);

    useEffect(() => {
      if (data?.length) {
        setDropdownData(data);
      }
    }, [data]);

    useLayoutEffect(() => {
      const element = comboboxRef.current?.element;

      function handleKeyPress(event: KeyboardEvent) {
        const { key, altKey, metaKey, ctrlKey } = event;
        if (
          (key !== 'Backspace' &&
            key !== 'Enter' &&
            key !== 'Tab' &&
            key.length > 1) ||
          altKey ||
          metaKey ||
          ctrlKey
        ) {
          if (
            (key === 'ArrowDown' || key === 'ArrowUp') &&
            !altKey &&
            !controlledValue &&
            element?.firstElementChild?.ariaExpanded === 'false'
          ) {
            event.stopPropagation();
          }

          if (
            (key === 'ArrowDown' || key === 'ArrowUp') &&
            dropdownData?.length &&
            !altKey &&
            element?.firstElementChild?.ariaExpanded === 'true'
          ) {
            const target = event.target as HTMLInputElement;
            let prevText = target.value;
            const text = prevText + (key.length > 1 ? '' : key);

            const suggestionIndex =
              text === ''
                ? 0
                : dropdownData.findIndex((value) =>
                    String(value[textField])
                      .toLowerCase()
                      .startsWith(text.toLowerCase())
                  );
            const suggestionText = dropdownData[suggestionIndex][
              textField
            ] as string;

            let currentValueIndex = -1;
            if (controlledValue?.[dataItemKey]) {
              currentValueIndex = dropdownData.findIndex(
                (dataItem) =>
                  dataItem[dataItemKey] === controlledValue[dataItemKey]
              );
            } else if (!controlledValue?.[dataItemKey]) {
              currentValueIndex = -1;
            }
            if (text?.toLowerCase() !== suggestionText?.toLowerCase()) {
              return;
            }

            const nextValueIndex =
              key === 'ArrowDown'
                ? currentValueIndex + 1
                : currentValueIndex - 1;

            if (nextValueIndex === dropdownData.length && key === 'ArrowDown') {
              return;
            }

            if (nextValueIndex === -1 && key === 'ArrowUp') {
              return;
            }
            const currentVal = dropdownData[currentValueIndex];
            const nextVal = dropdownData[nextValueIndex];

            if (
              currentVal?.[textField] === nextVal?.[textField] ||
              dropdownData.filter(
                (item) => item?.[textField] === nextVal?.[textField]
              )?.length > 1
            ) {
              setPlaceholder(dropdownData[nextValueIndex]?.[textField]);
              setControllledValue(dropdownData[nextValueIndex]);
              // console.log(`${textField} setControllledalue 2,`, dropdownData[nextValueIndex])
              event.preventDefault();
              event.stopPropagation();

              return;
            }
          }
          return;
        }

        if (!isMounted) setIsMounted(true);

        const target = event.target as HTMLInputElement;
        const { selectionStart, selectionEnd } = target;
        let prevText = target.value;

        if (prevText === '') {
          if (key === 'Backspace') {
            setPlaceholder('');

            const item = document.querySelector(
              'ul.k-table.k-table-list li.k-table-row'
            ) as HTMLLIElement;
            if (item) {
              item.classList.remove('k-selected');
            }
            return;
          } else if (key === 'Enter' || key === 'Tab') {
            if (
              restrictBlank === true ||
              (textField === 'value' && dataItemKey === 'value')
            ) {
              return;
            }
            setPlaceholder('');
            setControllledValue(null);
            // console.log(`${textField} setControllledValue 3,`, null)
            if (opened) {
              setOpened(false);
              setPlaceholder('');
            }
            event.preventDefault();
            return;
          }
        }

        if (selectionStart === selectionEnd) {
          if (key === 'Backspace') {
            prevText = prevText.slice(0, prevText.length - 1);
          }
        } else {
          if (key !== 'Enter' && key !== 'Tab') {
            prevText =
              prevText.slice(0, selectionStart ?? 0) +
              prevText.slice(selectionEnd ?? 0);
          }
        }

        const text = prevText + (key.length > 1 ? '' : key);

        const suggestionIndex =
          text === ''
            ? 0
            : dropdownData.findIndex((value) =>
                String(value[textField])
                  .toLowerCase()
                  .startsWith(text.toLowerCase())
              );

        if (suggestionIndex === -1 && !prevText) {
          event.preventDefault();
          return;
        }
        if (suggestionIndex === -1) {
          if (key !== 'Backspace') event.preventDefault();
          return;
        }
        const suggestionText = dropdownData[suggestionIndex][
          textField
        ] as string;

        setPlaceholder(text + suggestionText.slice(text.length));

        const focusNextElementOnEnter = () => {
          if (key === 'Enter' && props.tabIndex && props.tabIndex !== 99) {
            const nextTabIndex = props.tabIndex + 1;
            const parentWindowEl = element?.closest('.k-window-content');
            let nextElement = parentWindowEl?.querySelector(
              `[tabindex="${nextTabIndex}"]`
            ) as HTMLElement | null;
            if (!nextElement) {
              nextElement = parentWindowEl?.querySelector(
                `[tabindex="98"]`
              ) as HTMLElement | null;
            }

            if (!nextElement) {
              nextElement = parentWindowEl?.querySelector(
                `[tabindex="198"]`
              ) as HTMLElement | null;
            }

            setTimeout(() => {
              if (nextElement) {
                if (nextElement.tagName === 'INPUT') {
                  if (!(nextElement as HTMLInputElement).disabled) {
                    (nextElement as HTMLInputElement).select();
                  }
                } else {
                  nextElement.focus();
                }
              }
            }, 50);
          }
        };

        if (key === 'Enter' || key === 'Tab') {
          if (element?.firstElementChild?.ariaExpanded === 'true') {
            if (
              dropdownData.filter(
                (item) =>
                  item?.[textField] ===
                  dropdownData?.[suggestionIndex]?.[textField]
              )?.length > 1 &&
              suggestionText?.toLowerCase() === placeholder?.toLowerCase() &&
              text?.toLowerCase() === suggestionText?.toLowerCase()
            ) {
              focusNextElementOnEnter();
              return;
            }
            focusNextElementOnEnter();
            setPlaceholder(suggestionText);
            setControllledValue(dropdownData[suggestionIndex]);
            // console.log(`${textField} setControllledalue 4,`, dropdownData[suggestionIndex])
            event.preventDefault();
            return;
          }
          return;
        }

        setTimeout(() => {
          const items = document.querySelectorAll(
            'ul.k-table.k-table-list li.k-table-row'
          );
          const suggestItem = items[suggestionIndex] as HTMLLIElement;

          if (suggestItem) {
            suggestItem.scrollIntoView();
            suggestItem.classList.add('k-selected');
          }
        }, 10);
      }

      function handleKeyPressCheck(event: KeyboardEvent) {
        if (!dropdownData?.length) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        const { key, altKey, metaKey, ctrlKey } = event;
        if (
          (key !== 'Backspace' &&
            key !== 'Enter' &&
            key !== 'Tab' &&
            key.length > 1) ||
          altKey ||
          metaKey ||
          ctrlKey
        ) {
          if (
            (key === 'ArrowDown' || key === 'ArrowUp') &&
            !altKey &&
            !controlledValue &&
            element?.firstElementChild?.ariaExpanded === 'false'
          ) {
            event.stopPropagation();
          }
          if (element?.firstElementChild?.ariaExpanded === 'false' && !altKey) {
            event.stopPropagation();
          }
          event.preventDefault();
          return;
        }
      }

      if (element && dropdownData?.length) {
        element?.addEventListener('keydown', handleKeyPress);
      }
      if (element) {
        element?.addEventListener('keydown', handleKeyPressCheck);
      }

      return () => {
        if (element) {
          element?.removeEventListener('keydown', handleKeyPress);
          element?.removeEventListener('keydown', handleKeyPressCheck);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comboboxRef, isMounted, opened, dropdownData, controlledValue]);

    const handleClose = useCallback(
      (e: ComboBoxCloseEvent) => {
        setPlaceholder('');
        onClose?.(e);
        setOpened(false);

        setControllledValue((currentValue: any) => {
          // console.log(`${textField} setControllledalue 5,`, currentValue)
          if (currentValue) {
            const event = e as unknown as ComboBoxChangeEvent;
            // console.log(`${textField} setState 2,`, currentValue)
            props.onChange?.({
              ...event,
              value: currentValue,
            });
          }
          return currentValue;
        });
      },
      [onClose, props]
    );

    return (
      <div className={`custom-dropdown`} aria-colindex={ariaColumnIndex}>
        <MultiColumnComboBox
          {...props}
          className={`${readOnly ? 'read-only' : ''}`}
          // disabled={true}
          // style={{...props.style, color: 'red'}}
          ref={comboboxRef}
          data={dropdownData}
          value={controlledValue}
          opened={opened}
          textField={textField}
          dataItemKey={dataItemKey}
          clearButton={false}
          size="small"
          fillMode={fillMode}
          popupSettings={{
            className: `${!headers ? 'headless' : ''} ${
              props.className
            } custom-col-box-popup`,
            height: 301,
          }}
          onClose={handleClose}
          onOpen={(e) => {
            if (!readOnly) {
              setOpened(true);
              props.onOpen?.(e);
            }
          }}
          onChange={(e) => {
            // console.log(`${textField} test onChange`, e.value)
            if (!e.value) {
              if (
                !restrictBlank &&
                textField === 'value' &&
                dataItemKey === 'value'
              ) {
                setPlaceholder('');
                setControllledValue(e.value);
              }
              return;
            } else {
              setPlaceholder('');
              setControllledValue(e.value);
              // console.log(`${textField} setControllledalue 6,`, e.value)
            }
          }}
          onBlur={(event: ComboBoxBlurEvent) => {
            // console.log(`${textField} onBlur`, controlledValue)
            if (!controlledValue && restrictBlank) {
              return;
            } else {
              if (
                value &&
                controlledValue &&
                value[dataItemKey] === controlledValue[dataItemKey]
              ) {
                return;
              }
              const e = event as unknown as ComboBoxChangeEvent;
              // console.log(`${textField} setState 3,`, controlledValue)

              props.onChange?.({
                ...e,
                value: controlledValue,
              });
            }
          }}
        />
        <span className="placeholder">{placeholder}</span>
      </div>
    );
  }
);

export default CustomDropdown;
