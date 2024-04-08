import MyScheduler from '../MyProfile/MyProfile';
import { TimeOffRequests } from './TimeOffRequests/TimeOffRequests';
import { PTOManagerAPI, HolidaysAPI } from '../../APIs';
import { useEffect, useState } from 'react';
import {
  RequestRecord,
  RequestsCalendarData,
  IHolidays,
} from './TimeOffRequests/types';

const TimeOff = () => {
  type CalendarData = {
    date: number;
    month: number;
    year: number;
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [calendarPTOdata, setCalendarPTOdata] = useState<
    RequestsCalendarData[]
  >([]);
  const [holidays, setHolidays] = useState<IHolidays[]>([]);
  const [timeOffRequestData, setTimeOffRequestData] = useState<RequestRecord[]>(
    []
  );

  // Month for calender view
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const [selectedDate] = useState<Date | null>(new Date());
  const currentDate = selectedDate ?? new Date();

  const [calendarData] = useState<CalendarData>({
    date: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });

  function convertTimeTo24Hour(timeString: string) {
    // Split the time string into hours, minutes, and AM/PM
    const [time, period] = timeString?.split(/(?=[AP]M)/);
    const [hourStr, minuteStr] = time?.split(':');

    // Convert hours and minutes to integers
    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    // Adjust hour for PM times
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    }

    // Adjust hour for midnight (12:00AM)
    if (period === 'AM' && hour === 12) {
      hour = 0;
    }

    // Format the hour and minute to ensure leading zeros if needed
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    // Return the time in 24-hour format
    return `${formattedHour}:${formattedMinute}:00.000Z`;
  }

  const transformData = (data: RequestRecord[]): RequestsCalendarData[] => {
    const transformedData: RequestsCalendarData[] = [];
    data?.forEach((entry) => {
      const startDate = `2024/${entry.DateRange?.split(' - ')[0]}T`.replace(
        /\//g,
        '-'
      );
      const endDate = `2024/${entry.DateRange?.split(' - ')[1]}T`.replace(
        /\//g,
        '-'
      );

      const startTime = convertTimeTo24Hour(entry.TimeRange?.split(' - ')[0]);

      const endTime = convertTimeTo24Hour(entry.TimeRange?.split(' - ')[1]);

      const Start = startDate + startTime;
      const End = endDate + endTime;

      const result: RequestsCalendarData = {
        TaskID: entry.IDNo,
        OwnerID: entry.EntityID,
        Title: entry.PTOCode,
        Description: entry.RequestStatus,
        Start,
        End,
        StartTimeZone: null,
        EndTimeZone: null,
        id: entry.IDNo,
      };
      transformedData.push(result);
    });
    return transformedData;
  };

  async function fetchData() {
    try {
      const timeOffCalendarData = await PTOManagerAPI.getTimeOffPerEmp(
        selectedMonth + 1,
        calendarData.year
      );
      const timeOffRequestsData = await PTOManagerAPI.getTimeOffPerEmp(4, 2024);
      setCalendarPTOdata(transformData(timeOffCalendarData.recordsRequests));
      setTimeOffRequestData(timeOffRequestsData.recordsRequests);
      const holidays = await HolidaysAPI.getList();
      setHolidays(holidays);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  return (
    <div className="flex w-full h-[1000px] overflow-hidden justify-around pt-[50px]">
     
      <MyScheduler
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        calendarPTOdata={calendarPTOdata}
        isLoading={isLoading}
        holidays={holidays}
        fetchRequestsData={fetchData}
      />
       <TimeOffRequests
        data={timeOffRequestData}
        fetchData={fetchData}
        isLoading={isLoading}
        setData={setTimeOffRequestData}
      />
   
    </div>
  );
};

export default TimeOff;
