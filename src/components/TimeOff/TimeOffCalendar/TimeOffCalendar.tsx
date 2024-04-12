import { ReactNode, useEffect, useState } from 'react';
import moment from 'moment';
import { PTOManagerAPI, HolidaysAPI } from '../../../APIs';
// import cx from 'classnames';

type CalendarData = {
  date: number;
  month: number;
  year: number;
};


const TimeOffCalendar = () => {
  const min = undefined;
  const max = undefined;
  enum CalendarScreen {
    Date = 'Date',
    Month = 'Month',
    Year = 'Year',
  }
  const [calendarScreen, setCalendarScreen] = useState<CalendarScreen>(
    CalendarScreen.Date
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const currentDate = selectedDate ?? new Date();
  const [calendarData, setCalendarData] = useState<CalendarData>({
    date: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });
  const yearRange = {
    startingYear: calendarData.year - (calendarData.year % 10),
    endingYear: calendarData.year - (calendarData.year % 10) + 9,
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
    // onChange(newDate);
  };

  const onKeyDown = () => {
    console.log('popup key');
  };

  return (
    <div
      // ref={ref}
      onKeyDown={onKeyDown}
      className="w-[900px] min-w-[900px] py-4 px-2 flex flex-col gap-3 border-2 border-slate-200 rounded-md m-4 bg-white"
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
          <h1 className="text-2xl font-normal">
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
            <span className="text-2xl k-icon k-i-arrow-left w-full h-full"></span>
          </button>
          <button
            tabIndex={3}
            onClick={onNextButton}
            className="w-10 aspect-square"
          >
            <span className="text-2xl k-icon k-i-arrow-right w-full h-full"></span>
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

        {/* <CalendarContent.TodayButton onClick={() => onChange(new Date())} /> */}
      </CalendarContent>
    </div>
  );
};

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
  // const currentFocusedDate = useRef<HTMLButtonElement>(null);
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

  // useEffect(() => {
  //   currentFocusedDate.current?.focus();
  // }, []);

  interface Props {
    day: number;
  }

  interface IHolidays {
    DateOfMonth: number | null;
    DayOfWeek: string;
    IDNo: number;
    Month: number;
    PayCode: string;
    PayDesc: string;
    SystenYN: boolean;
    WeekOfMonth: string;
  }

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);
  const [holidays, setHolidays] = useState<IHolidays[]>([]);

  async function fetchData() {
    try {
      const data = await PTOManagerAPI.getTimeOffPerEmp(
        calendarData.month + 1,
        calendarData.year
      );
      setData(data.recordsCalendar);
      const holidays = await HolidaysAPI.getList();
      setHolidays(holidays);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [calendarData.month]);

  type IHolidayMap = Record<string, string>;

  const holidayMap: IHolidayMap = {
    JUL4: 'Independance Day',
    LABDAY: 'Labor Day',
    MEMDAY: 'Memorial Day',
    NEWYRD: 'New Years Day',
    TKSGVG: 'Thanksgiving',
    XMASD: 'Christmas Day',
    XMASE: 'Christmas Eve',
  };

  // const day = calendarData.date;
  const month = calendarData.month + 1;
  // const year = calendarData.year;
  // const testDate = `${year}-${month}-${day}`; //new Date(`${year}-${month}-${day}`);

  const Day: React.FC<Props> = ({ day }) => {
    if (isLoading) return <></>;

    // new Date('2024-03-20'); Tue Mar 19 2024 19:00:00 GMT-0500 (Central Daylight Time)
    // new Date('2024-3-20');  Wed Mar 20 2024 00:00:00 GMT-0500 (Central Daylight Time)

    const formatNumber = (num: number): string =>
      num < 10 ? '0' + num : String(num);
    const formattedMonth = formatNumber(calendarData.month + 1);
    const formattedDay = formatNumber(day);
    const date: string = `${calendarData.year}-${formattedMonth}-${formattedDay}`;

    console.log(new Date(date));

    const today = new Date().toISOString().split('T')[0];
    const todaysStyle = date === today ? 'bg-blue-200' : '';

    interface DayResult {
      dayEvent: string;
      dayStyle: string;
    }

    function dayStyleAndEvent(): DayResult {
      const results: DayResult = { dayEvent: '', dayStyle: '' };

      if (Object.keys(data[0]).includes(date) && data[0][date] !== null) {
        const eventData: string = data[0][date];
        switch (true) {
          case eventData.includes('Pending'):
            results.dayStyle = 'bg-[#7F7F7F] text-slate-100';
            break;
          case eventData.includes('Approved'):
            results.dayStyle = 'bg-[#FF7F27] text-slate-100';
            break;
          case eventData.includes('Taken'):
            results.dayStyle = 'bg-[#16417C] text-slate-100';
            break;
        }
        results.dayEvent = 'Vacation';
      }

      // console.log(holidays);

      for (const holiday of holidays) {
        const holidayPayCode: string = holiday.PayCode;
        // if (holiday.Month === month && holiday.DateOfMonth === null && )
        if (holiday.Month === month && holiday.DateOfMonth === day) {
          results.dayEvent = holidayMap[holidayPayCode];
          results.dayStyle = 'bg-[#377D22] text-slate-100';
          break;
        }
      }
      return results;
    }

    return (
      <div
        className={`flex flex-col h-[100%] rounded-t-lg rounded-b-lg ${
          todaysStyle === '' ? dayStyleAndEvent().dayStyle : todaysStyle
        }`}
      >
        <div className="h-[25%] text-left pl-1 font-normal">
          {day}
          {date === today ? ' - Today' : ''}
        </div>
        <div className="overflow-hidden truncate px-1 h-[75%] text-left">
          {dayStyleAndEvent().dayEvent}
        </div>
      </div>
    );
  };

  return (
    <>
      <DateScreen.DayLabels />
      <div className="flex flex-wrap">
        {daysArray.map((day, index) => {
          /* These are for the previous and next month's days that are present on the current month */
          if (day === '')
            return (
              <button
                data-dayIndex={day || index}
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
              disabled={!isValidMax || !isValidMin}
              onClick={() => {
                onDateChange(moment(dateString).toDate());
              }}
              className={`border rounded-md w-[14.2%] text-center  aspect-square ${
                isSelected ? 'selected' : ''
              }`}
            >
              <Day day={day} />
            </button>
          );
        })}
      </div>
    </>
  );
};

const Header = ({ children }: { children: ReactNode }) => {
  return <div className="w-full flex justify-between border-b">{children}</div>;
};

const CalendarContent = ({ children }: { children: ReactNode }) => {
  return <div className="w-full  ">{children}</div>;
};

DateScreen.DayLabels = () => {
  const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="flex w-full">
      {labels.map((label) => {
        return (
          <span className="text-sm font-bold text-gray-400 w-[14.2%] text-center">
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

export default TimeOffCalendar;
