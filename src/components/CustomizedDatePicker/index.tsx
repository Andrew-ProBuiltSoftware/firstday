import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  DatePicker,
  DatePickerProps,
  DatePickerHandle,
  DatePickerChangeEvent,
} from '@progress/kendo-react-dateinputs';
import moment from 'moment';

import CustomPopup from './CustomPopup';
import { PopupHandle } from '@progress/kendo-react-popup/dist/npm/Popup';
import CustomDateInput from './CustomDateInput';

export type CustomDatePickerChangeEvent = Partial<DatePickerChangeEvent>;
type Props = Omit<DatePickerProps, 'ref' | 'onChange'> & {
  onChange: (event: CustomDatePickerChangeEvent) => void;
};

const CustomizedDatePicker = React.forwardRef<DatePickerHandle, Props>(
  (props, ref) => {
    const { onChange, value, min, max } = props;

    const datePickerRef = useRef<DatePickerHandle>(null);
    const popupRef = useRef<PopupHandle>(null);
    useImperativeHandle(ref, () => datePickerRef.current as DatePickerHandle);

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
      const inputElement =
        datePickerRef?.current?.element?.querySelector('input');

      const handleInputDoubleClick = () => {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      };

      if (inputElement) {
        inputElement.addEventListener('dblclick', handleInputDoubleClick);
      }

      return () => {
        const inputElement =
          datePickerRef?.current?.element?.querySelector('input');
        if (inputElement) {
          inputElement.removeEventListener('dblclick', handleInputDoubleClick);
        }
      };
    }, [open]);

    useEffect(() => {
      function handleKeyPress(event: KeyboardEvent) {
        const { key, ctrlKey } = event;
        if (key === 'Help' || key === 'Insert') {
          event.preventDefault();
          console.log('insert on index');
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        }

        if (ctrlKey && (key === 'M' || key === 'm')) {
          const e = event as unknown as DatePickerChangeEvent;
          const dateWithCurrentMonth = moment().startOf('month').toDate();
          onChange?.({
            ...e,
            value: dateWithCurrentMonth,
            target: {
              ...e.target,
              value: dateWithCurrentMonth,
            },
          });
          event.preventDefault(); // Prevent the default action
          event.stopImmediatePropagation(); // Stop event propagation
        }
        if (ctrlKey && (key === 'Y' || key === 'y')) {
          const e = event as unknown as DatePickerChangeEvent;
          const dateWithCurrentYear = moment().startOf('year').toDate();
          onChange?.({
            ...e,
            value: dateWithCurrentYear,
            target: {
              ...e.target,
              value: dateWithCurrentYear,
            },
          });
          event.preventDefault(); // Prevent the default action
          event.stopImmediatePropagation(); // Stop event propagation
        }
        if (ctrlKey && (key === 'T' || key === 't')) {
          const e = event as unknown as DatePickerChangeEvent;
          const todayDate = moment().startOf('day').toDate();
          onChange?.({
            ...e,
            value: todayDate,
            target: {
              ...e.target,
              value: todayDate,
            },
          });
          event.preventDefault(); // Prevent the default action
          event.stopImmediatePropagation(); // Stop event propagation
        }
        if (ctrlKey && (key === 'W' || key === 'w')) {
          const e = event as unknown as DatePickerChangeEvent;
          const startOfWeekDate = moment()
            .startOf('week')
            .add(1, 'day')
            .toDate();
          onChange?.({
            ...e,
            value: startOfWeekDate,
            target: {
              ...e.target,
              value: startOfWeekDate,
            },
          });
          event.preventDefault(); // Prevent the default action
          event.stopImmediatePropagation(); // Stop event propagation
        }
        if (key === '+') {
          const e = event as unknown as DatePickerChangeEvent;
          const date = moment(value || new Date())
            .add(1, 'day')
            .toDate();
          onChange?.({
            ...e,
            value: date,
            target: {
              ...e.target,
              value: date,
            },
          });
          event.preventDefault(); // Prevent the default action
          event.stopImmediatePropagation(); // Stop event propagation
        }
        if (key === '-') {
          const e = event as unknown as DatePickerChangeEvent;
          const date = moment(value || new Date())
            .subtract(1, 'day')
            .toDate();
          onChange?.({
            ...e,
            value: date,
            target: {
              ...e.target,
              value: date,
            },
          });
          event.preventDefault(); // Prevent the default action
          event.stopImmediatePropagation(); // Stop event propagation
        }
      }

      datePickerRef?.current?.element?.addEventListener(
        'keydown',
        handleKeyPress
      );
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        datePickerRef?.current?.element?.removeEventListener(
          'keydown',
          handleKeyPress
        );
      };
    }, [open, onChange, value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          !(
            datePickerRef?.current?.element?.contains(event.target as Node) ||
            (popupRef?.current?.element?.contains(event.target as Node) && open)
          )
        ) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [open, setOpen, datePickerRef, popupRef]);

    useEffect(() => {
      const buttonElement =
        datePickerRef?.current?.element?.querySelector('button');

      const handleButtonClick = () => {
        if (open) {
          setOpen(false);
          setTimeout(() => {
            datePickerRef.current?.element?.querySelector('input')?.focus();
          }, 50);
        } else {
          setOpen(true);
        }
      };

      if (buttonElement)
        buttonElement.addEventListener('click', handleButtonClick);

      return () => {
        if (buttonElement)
          buttonElement.removeEventListener('click', handleButtonClick);
      };
    }, [open]);

    return (
      <span className="k-floating-label-container">
        <label className="k-label">{props.label}</label>
        <DatePicker
          {...props}
          label={undefined}
          onChange={(e) => {
            props?.onChange?.(e);
          }}
          ref={datePickerRef}
          size="small"
          fillMode="outline"
          format="MM/dd/yyyy"
          formatPlaceholder={{ year: '____', month: '__', day: '__' }}
          show={datePickerRef ? open : undefined}
          title=""
          popup={(props) => (
            <CustomPopup
              {...props}
              min={min}
              max={max}
              onChange={(date) => {
                onChange({ value: date });
                setOpen(false);
                setTimeout(() => {
                  datePickerRef.current?.element
                    ?.querySelector('input')
                    ?.focus();
                }, 50);
              }}
              show={open}
              setOpen={setOpen}
              currentDate={value ?? new Date()}
              datePickerRef={datePickerRef}
              popupRef={popupRef}
            />
          )}
          className="customized-datepicker"
          // dateInput={(props) => <CustomDateInput {...props} ref={dateInputRef} />}
          dateInput={CustomDateInput}
        />
      </span>
    );
  }
);

export default CustomizedDatePicker;
