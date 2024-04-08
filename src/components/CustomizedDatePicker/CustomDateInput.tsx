import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import moment from 'moment';
import {
  DateInputProps,
  DatePickerChangeEvent,
} from '@progress/kendo-react-dateinputs';
import {
  MaskedTextBox,
  MaskedTextBoxChangeEvent,
  MaskedTextBoxEvent,
  MaskedTextBoxHandle,
} from '@progress/kendo-react-inputs';
import { flushSync } from 'react-dom';

const basicDateFormat = 'MM/DD/YYYY';

const fixDate = (dateString: string): string => {
  const [month, day, year] = dateString.split('/');
  const numericYear = parseInt(year, 10);
  let fullYear = numericYear;

  if (numericYear >= 0 && numericYear <= 99) {
    fullYear = 2000 + numericYear;
  }

  return `${month}/${day}/${fullYear}`;
};

const formatDigit = (number: number, digit: number) => {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: digit,
    useGrouping: false,
  });
};

const getValidDay = (day: string, month: string, year: string) => {
  const daysInMonth = moment(`${year}-${month}-${1}`).daysInMonth();

  if (!year && +month === 2) return +day > 29 ? 29 : +day;
  if (day && year) return +day > daysInMonth ? daysInMonth : +day;

  if (+day > 31) return 31;
  else if (+day < 1) return 1;
  return +day;
};

const formatDate = (
  date: string,
  options = { minYear: 1900, maxYear: 2100 }
) => {
  const MIN_YEAR = options.minYear;
  const MAX_YEAR = options.maxYear;

  const [month, day, year] = date.split('/');

  const clampMonth = (month: string | number) => {
    return Math.min(Math.max(1, Number(month)), 12);
  };
  const clampDay = (day: number) => {
    return Math.min(Math.max(1, day), 31);
  };

  const newMonth =
    month === '__'
      ? '__'
      : clampMonth(Number(month?.replaceAll('_', ''))).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        });
  const newDay =
    day === '__'
      ? '__'
      : clampDay(
          getValidDay(day?.replaceAll('_', ''), month, year)
        ).toLocaleString('en-US', { minimumIntegerDigits: 2 });
  let newYear = fixDate(date).split('/')[2];

  // Year
  if (Number(newYear) < MIN_YEAR) newYear = `${MIN_YEAR}`;
  else if (Number(newYear) > MAX_YEAR) newYear = `${MAX_YEAR}`;

  return `${newMonth === 'NaN' ? '__' : newMonth}/${
    newDay === 'NaN' ? '__' : newDay
  }/${newYear === 'NaN' ? '____' : newYear}`;
};
const CustomDateInput = forwardRef(
  (props: DateInputProps, ref: ForwardedRef<MaskedTextBoxHandle>) => {
    const MIN_YEAR = 1900;
    const MAX_YEAR = 2100;
    const maskedTextBoxInputRef = useRef<MaskedTextBoxHandle>(null);

    useImperativeHandle(ref, () => maskedTextBoxInputRef.current!);
    const [displayValue, setDisplayValue] = useState('');
    const [innerDisplayValue, setInnerDisplayValue] = useState('');
    const [focusedSegment, setFocusedSegment] = useState<string | null>(null);

    const focusSection = useCallback((type: 'mm' | 'dd' | 'yyyy') => {
      const inputElement = maskedTextBoxInputRef?.current?.element;
      const selectionValues = {
        mm: { start: 0, end: 2 },
        dd: { start: 3, end: 5 },
        yyyy: { start: 6, end: 10 },
      };
      setTimeout(() => {
        inputElement?.setSelectionRange(
          selectionValues[type].start,
          selectionValues[type].end
        );
      }, 10);
      setFocusedSegment(type);
    }, []);

    const focusAndFormat = useCallback(
      (segment: Parameters<typeof focusSection>[0]) => {
        focusSection(segment);
        setInnerDisplayValue(formatDate(innerDisplayValue || displayValue));
      },
      [displayValue, focusSection, innerDisplayValue]
    );

    useEffect(() => {
      setDisplayValue(
        props?.value ? moment(props.value).format(basicDateFormat) : ''
      );
      setInnerDisplayValue('');
    }, [props?.value]);

    useEffect(() => {
      const inputElement = maskedTextBoxInputRef?.current?.element;

      const resetOnOverShoot = (newKey: string) => {
        if (isNaN(Number(newKey))) return;

        const [month, day, year] =
          displayValue !== ''
            ? displayValue.split('/')
            : innerDisplayValue.split('/');
        if (focusedSegment === 'yyyy' && inputElement?.selectionStart! >= 6) {
          if (!isNaN(Number(year))) {
            flushSync(() => {
              const newValue = `${month}/${day}/`;
              setDisplayValue('');
              setInnerDisplayValue(newValue);
            });
            inputElement?.setSelectionRange(6, 7);
          }
        }
      };

      const handleInputKeyDown = (event: KeyboardEvent) => {
        const { key } = event;
        const isArrowRight = key === 'ArrowRight';
        const isArrowLeft = key === 'ArrowLeft';
        const isArrowUp = key === 'ArrowUp';
        const isArrowDown = key === 'ArrowDown';
        const isSlash = key === '/';
        const isLetter = new RegExp(/^[a-zA-Z]$/).test(key);

        if (isLetter && !event.ctrlKey) {
          event.preventDefault();
        }

        if (key === 'Delete') {
          setDisplayValue('__/__/____');
          setInnerDisplayValue('');
          focusAndFormat('mm');
        }

        if (key === '-' || key === '+') {
          focusAndFormat('dd');
        }

        const isMonthFocused = focusedSegment === 'mm';
        const isDayFocused = focusedSegment === 'dd';
        const isYearFocused = focusedSegment === 'yyyy';

        if (isSlash) {
          event.stopPropagation();
          event.preventDefault();
        }
        if ((isArrowRight || isSlash) && isMonthFocused) {
          focusAndFormat('dd');
        }
        if ((isArrowRight || isSlash) && isDayFocused) {
          focusAndFormat('yyyy');
        }
        if (isArrowRight && isYearFocused) {
          focusAndFormat('yyyy');
        }
        if (isArrowLeft && isYearFocused) {
          focusAndFormat('dd');
        }
        if (isArrowLeft && isDayFocused) {
          focusAndFormat('mm');
        }
        if (isArrowLeft && isMonthFocused) {
          focusAndFormat('mm');
        }
        if (key === 'Tab' && event.shiftKey) {
          if (focusedSegment === 'yyyy') {
            event.stopPropagation();
            event.preventDefault();
            focusAndFormat('dd');
          } else if (focusedSegment === 'dd') {
            event.stopPropagation();
            event.preventDefault();
            focusAndFormat('mm');
          }
        } else if (key === 'Tab') {
          if (focusedSegment === 'mm') {
            event.stopPropagation();
            event.preventDefault();
            focusAndFormat('dd');
          } else if (focusedSegment === 'dd') {
            event.stopPropagation();
            event.preventDefault();
            focusAndFormat('yyyy');
          }
        }
        if (key === 'End') {
          focusAndFormat('yyyy');
        }
        if (key === 'Home') {
          focusAndFormat('mm');
        }

        if (key === '_') {
          event.stopPropagation();
          event.preventDefault();
        }

        if (isArrowUp || isArrowDown) {
          event.preventDefault();
          event.stopPropagation();

          setDisplayValue('');
          setInnerDisplayValue((prev) => {
            const [month, day, year] = displayValue
              ? displayValue.split('/')
              : prev.split('/');
            const incrementor = isArrowDown ? -1 : 1;
            if (focusedSegment === 'mm') {
              focusSection('mm');
              return formatDate(
                `${formatDigit(+month + incrementor, 2)}/${day}/${year}`
              );
            } else if (focusedSegment === 'dd') {
              focusSection('dd');
              return formatDate(
                `${month}/${formatDigit(+day + incrementor, 2)}/${year}`
              );
            } else {
              focusSection('yyyy');
              return formatDate(
                `${month}/${day}/${formatDigit(+year + incrementor, 4)}`
              );
            }
          });
        }

        if (isYearFocused) resetOnOverShoot(key);
      };

      const handleClick = () => {
        const selectionStart = inputElement?.selectionStart;

        if (selectionStart === null || selectionStart === undefined) {
          return;
        }
        if (selectionStart < 3) {
          focusAndFormat('mm');
        } else if (selectionStart > 2 && selectionStart < 6) {
          focusAndFormat('dd');
        } else if (selectionStart > 5 && selectionStart < 11) {
          focusAndFormat('yyyy');
        }
      };

      if (inputElement) {
        inputElement.addEventListener('keydown', handleInputKeyDown);
        inputElement.addEventListener('click', handleClick);
      }

      return () => {
        if (inputElement) {
          inputElement.removeEventListener('keydown', handleInputKeyDown);
          inputElement.removeEventListener('click', handleClick);
        }
      };
    }, [
      displayValue,
      focusAndFormat,
      focusSection,
      focusedSegment,
      innerDisplayValue,
    ]);

    const formatMonth = (month: string) => {
      let tempMonth = month;
      if (Number(tempMonth[0]) > 1 && focusedSegment === 'mm') {
        tempMonth = `0${tempMonth[0]}`;
        focusSection('dd');
      }

      if (
        tempMonth[0] !== '0' &&
        tempMonth[0] !== '1' &&
        tempMonth[0] !== '_'
      ) {
        tempMonth = `0${tempMonth[1]}`;
      }

      if (
        tempMonth[0] === '1' &&
        tempMonth[1] !== '_' &&
        Number(tempMonth[1]) > 2
      ) {
        tempMonth = `0${tempMonth[1]}`;
      }

      if (Number(tempMonth) < 1) tempMonth = '01';
      else if (Number(tempMonth) > 12) tempMonth = '12';

      return tempMonth;
    };

    const formatDay = (day: string, month: string, year: string) => {
      let tempDay = day;
      if (Number(tempDay[0]) > 3 && focusedSegment === 'dd') {
        tempDay = `0${tempDay[0]}`;
        focusSection('yyyy');
      }

      if (Number(tempDay) > 10) {
        tempDay = `${getValidDay(tempDay, month, year).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        })}`;
      }
      if (Number(tempDay) < 1) tempDay = '01';

      return tempDay;
    };

    const formatYear = (year: string) => {
      let tempYear = year;
      if (Number(tempYear) < MIN_YEAR) tempYear = `${MIN_YEAR}`;
      else if (Number(tempYear) > MAX_YEAR) tempYear = `${MAX_YEAR}`;

      return tempYear;
    };

    const handleDisplayValueChange = (e: MaskedTextBoxChangeEvent) => {
      let newValue = e.value;

      // console.log('DTP 1: handleDisplayValueChange', newValue);
      let [month, day, year] = newValue.split('/') as string[];

      // Month
      if (month) {
        month = formatMonth(month);
      }

      // Day
      if (day) {
        day = formatDay(day, month, year);
      }

      // Year
      if (year) {
        year = formatYear(year);
      }

      setDisplayValue('');
      setInnerDisplayValue(`${month}/${day}/${year}`);

      if (
        e.selectionStart > 2 &&
        e.selectionStart < 4 &&
        focusedSegment !== 'mm'
      ) {
        focusSection('mm');
      } else if (
        e.selectionStart > 1 &&
        e.selectionStart < 6 &&
        focusedSegment !== 'dd'
      ) {
        focusSection('dd');
      } else if (e.selectionStart > 4 && focusedSegment !== 'yyyy') {
        focusSection('yyyy');
      }
    };

    return (
      <div className="k-dateinput k-input">
        <MaskedTextBox
          style={{ width: '100%' }}
          value={
            (displayValue ? displayValue : innerDisplayValue) || '__/__/____'
          }
          onChange={handleDisplayValueChange}
          mask="00/00/0000"
          tabIndex={props.tabIndex}
          onBlur={() => {
            const newDate = moment(innerDisplayValue, basicDateFormat);

            if (innerDisplayValue === '__/__/____') {
              const e = {} as unknown as DatePickerChangeEvent;
              if (props.onChange) {
                props.onChange({
                  ...e,
                  value: null,
                });
              }
              return;
            }

            if (!newDate.isValid() || innerDisplayValue.includes('_')) {
              let [month, day, year] = displayValue
                ? displayValue.split('/')
                : innerDisplayValue.split('/');

              month = month.includes('_') ? formatMonth(month) : month;
              day = day.includes('_') ? formatDay(day, month, year) : day;
              year = year?.replaceAll('_', '');

              if (month === '__') month = '01';
              if (day === '__') day = '01';

              setDisplayValue(`${month}/${day}/${year}`);
              setInnerDisplayValue('');

              const formattedDate = moment(
                formatDate(`${month}/${day}/${year}`),
                basicDateFormat
              );
              const originalValue = props?.value
                ? moment(props.value).format(basicDateFormat)
                : '';
              const newValue = formattedDate.format(basicDateFormat);

              if (props?.onChange && originalValue !== newValue) {
                const e = {} as unknown as DatePickerChangeEvent;
                props.onChange({
                  ...e,
                  value: formattedDate.toDate(),
                  target: {
                    ...e.target,
                    value: formattedDate.toDate(),
                  },
                });
              }
              return;
            }

            if (innerDisplayValue.replaceAll('_', '').length === 10) {
              const originalValue = props?.value
                ? moment(props.value).format(basicDateFormat)
                : '';
              const newValue = newDate.format(basicDateFormat);

              setDisplayValue(newValue);
              setInnerDisplayValue('');

              if (props?.onChange && originalValue !== newValue) {
                const e = {} as unknown as DatePickerChangeEvent;
                props.onChange({
                  ...e,
                  value: newDate.toDate(),
                  target: {
                    ...e.target,
                    value: newDate.toDate(),
                  },
                });
              }
            } else if (innerDisplayValue.replaceAll('_', '').length === 8) {
              let formattedDate = innerDisplayValue.replaceAll('_', '');
              formattedDate = fixDate(formattedDate);
              let dateToSave = moment(formattedDate);

              setDisplayValue(dateToSave.format(basicDateFormat));
              setInnerDisplayValue('');
              if (props?.onChange) {
                const e = {} as unknown as DatePickerChangeEvent;
                props.onChange({
                  ...e,
                  value: dateToSave.toDate(),
                  target: {
                    ...e.target,
                    value: dateToSave.toDate(),
                  },
                });
              }
            }
          }}
          onFocus={(e: MaskedTextBoxEvent) => {
            maskedTextBoxInputRef.current?.element?.setSelectionRange(0, 2);
            setFocusedSegment('mm');
            setTimeout(() => {
              if (
                e.target.element?.selectionStart ===
                e.target.element?.selectionEnd
              ) {
                maskedTextBoxInputRef.current?.element?.setSelectionRange(0, 2);
                setFocusedSegment('mm');
              }
            }, 10);
          }}
          ref={maskedTextBoxInputRef}
        />
      </div>
    );
  }
);

export default CustomDateInput;
