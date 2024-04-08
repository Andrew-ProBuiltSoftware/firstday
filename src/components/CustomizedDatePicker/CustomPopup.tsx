import {
  FC,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DatePickerHandle } from '@progress/kendo-react-dateinputs';
import { PopupProps } from '@progress/kendo-react-popup';
import { Popup, PopupHandle } from '@progress/kendo-react-popup/dist/npm/Popup';
import moment from 'moment';

import { DatePickerFocusTrap } from './FocusTrap';

interface CustomPopupProps extends PopupProps {
  setOpen: (value: React.SetStateAction<boolean>) => void;
  datePickerRef: React.RefObject<DatePickerHandle>;
  popupRef: React.RefObject<PopupHandle>;
  onChange: (date: Date) => void;
  min?: Date;
  max?: Date;
  currentDate: Date | null;
}

enum CalendarScreen {
  Date = 'Date',
  Month = 'Month',
  Year = 'Year',
}

const CustomPopup: FC<CustomPopupProps> = (props: CustomPopupProps) => {
  const {
    datePickerRef,
    popupRef,
    show,
    setOpen,
    onChange,
    currentDate,
    min,
    max,
  } = props;
  const [calendarScreen, setCalendarScreen] = useState<CalendarScreen>(
    CalendarScreen.Date
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    moment(currentDate).isValid() ? currentDate : new Date()
  );
  const [calendarData, setCalendarData] = useState<CalendarData>({
    date:
      currentDate && moment(currentDate).isValid()
        ? currentDate.getDate()
        : new Date().getDate(),
    month:
      currentDate && moment(currentDate).isValid()
        ? currentDate.getMonth()
        : new Date().getDate(),
    year:
      currentDate && moment(currentDate).isValid()
        ? currentDate.getFullYear()
        : new Date().getDate(),
  });

  useEffect(() => {
    if (!popupRef.current?.element) {
      return;
    }
    setTimeout(() => {
      const firstElementToFocus =
        popupRef?.current?.element.querySelector('.selected');
      if (firstElementToFocus) {
        (firstElementToFocus as HTMLElement).focus();
      }
    }, 10);
  }, [popupRef]);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      const { key } = event;

      if (key === 'Help' || key === 'Insert' || key === 'Tab') {
        if (show) {
          setOpen(false);
          datePickerRef.current?.element?.querySelector('input')?.focus();
        } else {
          setOpen(true);
        }
      }
      if (key === 'Enter' && show) {
        setTimeout(() => {
          setOpen(false);
          datePickerRef.current?.element?.querySelector('input')?.focus();
        }, 100);
      }
    }

    popupRef?.current?.element?.addEventListener('keydown', handleKeyPress);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      popupRef?.current?.element?.removeEventListener(
        'keydown',
        handleKeyPress
      );
    };
  }, [setOpen, datePickerRef, popupRef, show]);

  const focusFirstElement = () => {
    setTimeout(() => {
      const firstNonSelectedElementToFocus =
        popupRef?.current?.element.querySelector('.not-selected');
      const firstSelectedElementToFocus =
        popupRef?.current?.element.querySelector('.selected');
      if (firstSelectedElementToFocus) {
        (firstSelectedElementToFocus as HTMLElement).focus();
      } else if (firstNonSelectedElementToFocus) {
        (firstNonSelectedElementToFocus as HTMLElement).focus();
      }
    }, 10);
  };

  const onDatePickerKeyPress = (event: React.KeyboardEvent) => {
    const currTarget = event.target as HTMLElement;
    // Get list and order by tabindex in ascending order
    const tabableElements = (
      Array.from(
        popupRef?.current?.element.querySelectorAll('[tabindex]') ?? []
      ) as Element[]
    )
      .filter((el) => el.getAttribute('tabindex') !== '-1')
      .sort(
        (a, b) =>
          +(a.getAttribute('tabindex') ?? 0) -
          +(b.getAttribute('tabindex') ?? 0)
      ) as HTMLElement[];

    const isPrevious =
      (event.shiftKey && event.key === 'Tab') || event.key === 'ArrowLeft';
    const isNext =
      (!event.shiftKey && event.key === 'Tab') || event.key === 'ArrowRight';
    const isUp = event.key === 'ArrowUp';
    const isDown = event.key === 'ArrowDown';

    if (isPrevious) {
      const nextFocusedEl =
        tabableElements[tabableElements.indexOf(currTarget) - 1];
      if (nextFocusedEl) {
        nextFocusedEl.focus();
      } else {
        tabableElements[tabableElements.length - 1].focus();
      }
    }

    if (isNext) {
      const nextFocusedEl =
        tabableElements[tabableElements.indexOf(currTarget) + 1];
      if (nextFocusedEl) {
        nextFocusedEl.focus();
      } else {
        tabableElements[0].focus();
      }
    }

    if (isUp || isDown) {
      const incrementAmount = calendarScreen === CalendarScreen.Date ? 7 : 4;
      const incrementor = isUp ? incrementAmount * -1 : incrementAmount;
      const nextFocusedEl =
        tabableElements[tabableElements.indexOf(currTarget) + incrementor];
      if (nextFocusedEl) {
        nextFocusedEl.focus();
      }
    }

    if (
      event.key === 'Insert' ||
      event.key === 'Help' ||
      event.key === 'Escape'
    ) {
      setOpen(false);
      datePickerRef.current?.element?.querySelector('input')?.focus();
    }
    if (event.key === 'Enter' && calendarScreen === CalendarScreen.Month) {
      focusFirstElement();
    }
    if (event.key === 'PageUp' && calendarScreen === CalendarScreen.Date) {
      onPrevButton();
      focusFirstElement();
    }
    if (event.key === 'PageDown' && calendarScreen === CalendarScreen.Date) {
      onNextButton();
      focusFirstElement();
    }
  };

  const onNextButton = () => {
    if (calendarScreen === CalendarScreen.Date) {
      setCalendarData((prev) => ({
        ...prev,
        month: prev.month + 1 === 12 ? 0 : prev.month + 1,
        year: prev.month + 1 === 12 ? prev.year + 1 : prev.year,
      }));
    }

    if (calendarScreen === CalendarScreen.Month) {
      setCalendarData((prev) => ({
        ...prev,
        year: prev.year + 1,
      }));
    }

    if (calendarScreen === CalendarScreen.Year) {
      setCalendarData((prev) => ({
        ...prev,
        year: prev.year + 10,
      }));
    }
  };

  const onPrevButton = () => {
    if (calendarScreen === CalendarScreen.Date) {
      setCalendarData((prev) => ({
        ...prev,
        month: prev.month - 1 === -1 ? 11 : prev.month - 1,
        year: prev.month - 1 === -1 ? prev.year - 1 : prev.year,
      }));
    }

    if (calendarScreen === CalendarScreen.Month) {
      setCalendarData((prev) => ({
        ...prev,
        year: prev.year - 1,
      }));
    }

    if (calendarScreen === CalendarScreen.Year) {
      setCalendarData((prev) => ({
        ...prev,
        year: prev.year - 10,
      }));
    }
  };

  return (
    <Popup {...props} ref={popupRef}>
      <DatePickerFocusTrap onKeyPress={onDatePickerKeyPress}>
        <CustomDatePicker
          calendarScreen={calendarScreen}
          setCalendarScreen={setCalendarScreen}
          calendarData={calendarData}
          setCalendarData={setCalendarData}
          onChange={onChange}
          min={min}
          max={max}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onNextButton={onNextButton}
          onPrevButton={onPrevButton}
        />
      </DatePickerFocusTrap>
    </Popup>
  );
};

type CustomDatePickerProps = {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  onChange: (date: Date) => void;
  min?: Date;
  max?: Date;
  calendarScreen: CalendarScreen;
  setCalendarScreen: React.Dispatch<React.SetStateAction<CalendarScreen>>;
  calendarData: CalendarData;
  setCalendarData: React.Dispatch<React.SetStateAction<CalendarData>>;
  onNextButton: () => void;
  onPrevButton: () => void;
};

type CalendarData = {
  date: number;
  month: number;
  year: number;
};

const CustomDatePicker = forwardRef(
  (
    {
      selectedDate,
      setSelectedDate,
      onChange,
      max,
      min,
      calendarScreen,
      setCalendarScreen,
      calendarData,
      setCalendarData,
      onNextButton,
      onPrevButton,
    }: CustomDatePickerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const currentDate = selectedDate ?? new Date();
    const yearRange = {
      startingYear: calendarData.year - (calendarData.year % 10),
      endingYear: calendarData.year - (calendarData.year % 10) + 9,
    };

    const onScreenSelectorButton = () => {
      if (calendarScreen === CalendarScreen.Date) {
        setCalendarScreen(CalendarScreen.Month);
      } else if (calendarScreen === CalendarScreen.Month) {
        setCalendarScreen(CalendarScreen.Year);
      }
    };

    const onYearChange = (year: number) => {
      setCalendarData((prev) => ({ ...prev, year }));
      setCalendarScreen(CalendarScreen.Month);
    };

    const onMonthChange = (month: number) => {
      setCalendarData((prev) => ({ ...prev, month }));
      setCalendarScreen(CalendarScreen.Date);
    };

    const onDateChange = (newDate: Date) => {
      setSelectedDate(newDate);
      onChange(newDate);
    };

    const onKeyDown = () => {
      console.log('popup key');
    };

    return (
      <div
        ref={ref}
        onKeyDown={onKeyDown}
        className="w-72 custom-date-picker-popup py-4 px-2 flex flex-col gap-3"
      >
        <Header>
          <button
            tabIndex={1}
            onClick={onScreenSelectorButton}
            className={`px-4 py-2 ${
              calendarScreen === CalendarScreen.Year
                ? 'pointer-events-none'
                : 'pointer-events-auto'
            }`}
          >
            <h1 className="text-lg">
              {calendarScreen === CalendarScreen.Date
                ? `${moment().month(calendarData.month).format('MMMM')} ${
                    calendarData.year
                  }`
                : calendarScreen === CalendarScreen.Month
                ? `${calendarData.year}`
                : `${yearRange.startingYear} - ${yearRange.endingYear}`}
            </h1>
          </button>
          <div>
            <button
              tabIndex={2}
              name="date-selector"
              onClick={onPrevButton}
              className="w-10 aspect-square"
            >
              <span className="text-2xl k-icon k-i-arrow-chevron-up w-full h-full"></span>
            </button>
            <button
              tabIndex={3}
              onClick={onNextButton}
              className="w-10 aspect-square"
            >
              <span className="text-2xl k-icon k-i-arrow-chevron-down w-full h-full"></span>
            </button>
          </div>
        </Header>
        <CalendarContent>
          {calendarScreen === CalendarScreen.Date ? (
            <DateScreen
              calendarData={calendarData}
              onDateChange={onDateChange}
              currentDate={currentDate}
              min={min}
              max={max}
            />
          ) : calendarScreen === CalendarScreen.Month ? (
            <MonthScreen
              onMonthChange={onMonthChange}
              currentDate={currentDate}
              calendarData={calendarData}
            />
          ) : (
            <YearScreen
              yearRange={yearRange}
              onYearChange={onYearChange}
              currentYear={currentDate.getFullYear()}
            />
          )}

          <CalendarContent.TodayButton onClick={() => onChange(new Date())} />
        </CalendarContent>
      </div>
    );
  }
);

type YearScreenProps = {
  yearRange: { startingYear: number; endingYear: number };
  onYearChange: (year: number) => void;
  currentYear: number | null;
};

const YearScreen = ({
  yearRange,
  onYearChange,
  currentYear,
}: YearScreenProps) => {
  const years = new Array(12).fill('').map((_, index) => {
    if (index === 0 || index === 11) return '';
    return yearRange.startingYear + index - 1;
  });

  return (
    <div className="grid grid-cols-4 grid-rows-3">
      {years.map((year, index) => {
        if (year === '') return <span key={index} className="p-3"></span>;

        return (
          <button
            tabIndex={10 + index}
            key={year}
            className={`p-3 ${currentYear === year ? 'selected' : ''}`}
            onClick={() => onYearChange(year)}
          >
            <span>{year}</span>
          </button>
        );
      })}
    </div>
  );
};

type MonthScreenProps = {
  onMonthChange: (month: number) => void;
  calendarData: CalendarData;
  currentDate: Date | null;
};

const MonthScreen = ({
  onMonthChange,
  currentDate,
  calendarData,
}: MonthScreenProps) => {
  const currentDateString = currentDate
    ? `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`
    : '';
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-3 w-full">
      {months.map((month, index) => {
        const dateString = `${index + 1}/${calendarData.date}/${
          calendarData.year
        }`;
        return (
          <button
            tabIndex={10 + index}
            key={dateString}
            className={`p-3 ${
              dateString === currentDateString ? 'selected' : ''
            }`}
            onClick={() => onMonthChange(index)}
          >
            <span>{month}</span>
          </button>
        );
      })}
    </div>
  );
};

type DateScreenProps = {
  onDateChange: (date: Date) => void;
  calendarData: CalendarData;
  currentDate: Date | null;
  min?: Date;
  max?: Date;
};

const DateScreen = ({
  onDateChange,
  calendarData,
  currentDate,
  min,
  max,
}: DateScreenProps) => {
  const currentFocusedDate = useRef<HTMLButtonElement>(null);
  const currentDateString = currentDate
    ? `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`
    : '';
  const currentMonth = moment(
    `${calendarData.month + 1}/${calendarData.date}/${calendarData.year}`
  );
  const daysInMonth = currentMonth.daysInMonth();

  const firstDayIndex =
    moment(`${calendarData.month + 1}/${1}/${calendarData.year}`).day() || 0;
  const lastDayIndex = moment(
    `${calendarData.month + 1}/${daysInMonth}/${calendarData.year}`
  ).day();

  const daysArray = new Array(firstDayIndex).fill('');

  for (let i = 0; i < daysInMonth; i++) {
    daysArray.push(i + 1);
  }

  for (let i = lastDayIndex; i < 6; i++) {
    daysArray.push('');
  }

  useEffect(() => {
    currentFocusedDate.current?.focus();
  }, []);

  interface Props {
    day: number;
  }

  const Day: React.FC<Props> = ({ day }) => {
    const todayBackground =
      currentDate?.getDate() === day
        ? 'bg-[#65A1D7] text-white hover:none'
        : 'hover:bg-slate-200';
    return (
      <span
        className={`flex m-auto items-center text-center justify-center rounded-md aspect-square ${todayBackground}`}
      >
        {day}
      </span>
    );
  };

  return (
    <>
      <DateScreen.DayLabels />
      <div className="flex flex-wrap">
        {daysArray.map((day, index) => {
          if (day === '')
            return (
              <button
                data-dayindex={day || index}
                key={day || index}
                className="w-[14.2%] aspect-square pointer-events-none"
              >
                <span>{day}</span>
              </button>
            );

          const dateString = `${calendarData.month + 1}/${day}/${
            calendarData.year
          }`;
          const isValidMin = min
            ? moment(dateString).isSameOrAfter(moment(min?.toDateString()))
            : true;
          const isValidMax = max
            ? moment(dateString).isSameOrBefore(moment(max?.toDateString()))
            : true;
          const isSelected = dateString === currentDateString;

          return (
            <button
              tabIndex={10 + index}
              ref={
                index === 0
                  ? currentFocusedDate
                  : isSelected
                  ? currentFocusedDate
                  : undefined
              }
              disabled={!isValidMax || !isValidMin}
              onClick={() => {
                onDateChange(moment(dateString).toDate());
              }}
              className={`w-[14.2%] text-center  aspect-square  ${
                isSelected ? 'selected' : 'not-selected'
              }`}
            >
              <Day day={day} />
              {/* <span>{day}</span> */}
            </button>
          );
        })}
      </div>
    </>
  );
};

const Header = ({ children }: { children: ReactNode }) => {
  return <div className="w-full flex justify-between">{children}</div>;
};

const CalendarContent = ({ children }: { children: ReactNode }) => {
  return <div className="w-full">{children}</div>;
};

DateScreen.DayLabels = () => {
  const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="flex w-full">
      {labels.map((label) => {
        return (
          <span className="text-sm font-semibold text-gray-400 w-[14.2%] text-center">
            {label}
          </span>
        );
      })}
    </div>
  );
};

CalendarContent.TodayButton = (props: JSX.IntrinsicElements['button']) => {
  return (
    <div className="flex justify-end">
      <button
        id="calendar-today-button"
        {...props}
        className="w-fit px-4 py-1 cursor-pointer"
      >
        TODAY
      </button>
    </div>
  );
};

export default CustomPopup;
