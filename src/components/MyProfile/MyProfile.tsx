import React, { useState, Dispatch } from 'react';
import { Scheduler, MonthView } from '@progress/kendo-react-scheduler';
// import { sampleData, displayDate } from './events';
import '@progress/kendo-theme-default/dist/all.css';
import { CustomViewSlot } from './CustomViewSlot';
import { CustomViewItem } from './CustomViewItem';
import { SchedulerDateChangeEvent } from '@progress/kendo-react-scheduler';
import { Form } from '../Forms/GL_PTOManager/TimeOff/Request';
import { Loader } from '..';
import {
  RequestsCalendarData,
  IHolidays,
} from '../TimeOff/TimeOffRequests/types';
import { Button } from '@progress/kendo-react-buttons'

interface SchedulerProps {
  selectedMonth: number;
  setSelectedMonth: Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  calendarPTOdata: RequestsCalendarData[];
  holidays: IHolidays[];
  fetchRequestsData: () => Promise<void>;
}

const MyScheduler: React.FC<SchedulerProps> = ({
  selectedMonth,
  setSelectedMonth,
  calendarPTOdata,
  isLoading,
  fetchRequestsData,
}) => {
  const handleDateChange = React.useCallback(
    (event: SchedulerDateChangeEvent) => {
      setSelectedMonth(new Date(event.value).getMonth());
    },
    [setSelectedMonth]
  );

  const currentYear = new Date().getFullYear();
  const displayDate = new Date();

  const parseAdjust = (eventDate: Date | string) => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
  };

  const sampleData = calendarPTOdata.map((dataItem: any) => ({
    id: dataItem.TaskID,
    start: parseAdjust(dataItem.Start),
    end: parseAdjust(dataItem.End),
    title: dataItem.Title,
    description: dataItem.Description,

    ownerID: dataItem.OwnerID,
    personId: dataItem.OwnerID,
  }));

  const [, setShowRequestOffModal] = useState(false);

  // This is to populate the modal when openening or creating a new request from the calendar.
  // async function fetchIndividualRequest() {
  //   try {
  //     const data = await PTOManagerAPI.getTimeOffPerEmp(4, 2024);
  //     setRequestsData(data.recordsRequests);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setIsLoading(false);
  // }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className='flex flex-wrap w-100' >
        <div className='flex'>
          <div className='bg-grey w-100 ' >
          <Button className="w-10 aspect-square hover:bg-blue-500">
              <span className="text-2xl k-icon k-i-arrow-left w-full h-full"></span>
            </Button>
             <span className='text-sm'> April 2024 </span>
           <Button className="w-10 aspect-square hover:bg-blue-500">
              <span className="text-2xl k-icon k-i-arrow-right w-full h-full"></span>
            </Button>
         </div>
      </div>
        

        <Scheduler
           height={1500}
            style={{
               width: '925px',
            }}
           data={sampleData}
           defaultDate={displayDate}
           viewSlot={(props) => (
            <CustomViewSlot
               {...props}
               currentMonth={selectedMonth}
               fetchRequestsData={fetchRequestsData}
             />
            )}
         viewItem={(props) => (
          <CustomViewItem {...props} fetchRequestsData={fetchRequestsData} />
            )}
            header={() => <React.Fragment />}
         footer={() => <React.Fragment />}
         onDateChange={handleDateChange}
          form={(e) => (
           <Form
            IDNo={e.dataItem.id}
            fetchRequestsData={fetchRequestsData}
            setShowRequestOffModal={setShowRequestOffModal}
        />
      )}
    >
         <MonthView />
    </Scheduler>
      </div>
      
    
    </>
      
    
  );
};

export default MyScheduler;
