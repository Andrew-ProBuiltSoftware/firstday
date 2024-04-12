import React, { useState, Dispatch, useEffect, useRef } from 'react';
import { Scheduler,  MonthView } from '@progress/kendo-react-scheduler';
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
import './CustomCalendarFont.css'
import { DateInput, end } from '@progress/kendo-react-dateinputs';
import { start } from 'repl';



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
 
  const [getDisplayDate, setDisplay] = useState(new Date());
  const currentYear = getDisplayDate.getFullYear();
  const displayDate = new Date();
  
  

  const handleDateChange = React.useCallback(
    (event: SchedulerDateChangeEvent) => {

      const newDate = new Date(event.value)
      setSelectedMonth(newDate.getMonth());
      setDisplay(newDate)
    },
    [setSelectedMonth, setDisplay]
  );



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


  // async function fetchIndividualRequest() {
  //   try {
  //     const data = await PTOManagerAPI.getTimeOffPerEmp(4, 2024);
  //     setRequestsData(data.recordsRequests);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setIsLoading(false);
  // }


  

    



  const updateNextMonth = () => {

    const nextMonth = new Date(getDisplayDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setDisplay(nextMonth);
    setSelectedMonth(nextMonth.getMonth())
    displayDate.setMonth(nextMonth.getMonth());


    
  }

  const updatePrevMonth = () => {
    const prevMonth = new Date(getDisplayDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setDisplay( prevMonth);
    setSelectedMonth(prevMonth.getMonth())
    displayDate.setMonth(prevMonth.getMonth());

  }

  var options = { month: "long", year: "numeric" };


 



  return isLoading ? (
    <Loader />
  ) : (
    <>
    
       <div>
       <div className="sale-calendar ">
          <div className="header min-h-[30px] flex items-center border border-[#d6d6d6] px-[8px] py-[10px] border-b-0 bg-[#FFFFFF]">
            <div className='flex justify-betwwen '>
            <div className='w-[700px] h-[30px]'></div>
              <div className='flex items-center min-w-[180px] gap-[20px]'>
                <Button 
                  onClick={updatePrevMonth} 
                  
                  fillMode='solid'    
                  className="w-[45px] h-[30px] px-[4px] py-[4px] aspect-square hover:bg-[#0d3f75]">
                  <span className="text-lg k-icon k-i-arrow-left k-button-icon  w-[45px] h-[30px] hover:text-slate-50"></span>
                </Button> 
                <div className='min-w-[120px] h-[26] text-[15px] text-center mt-1'>{getDisplayDate.toLocaleDateString("en-US", options)} </div>
               <Button 
                  onClick={updateNextMonth}

                  fillMode={"solid"}
                  className="w-[45px] h-[30px] px-[4px] py-[4px] aspect-square hover:bg-[#0d3f75]">
                   <span className="text-lg k-icon k-i-arrow-right w-[45px] h-[30px] hover:text-slate-50"></span>
                 </Button>
              </div>

               </div>
            </div>         
          </div>
          <div className='k-widget k-scheduler k-floatwrap k-pos-relative h-[745px] bg-[#f5f5f5]' tabIndex={1} role='application' dir="ltr">
            <div>
            <Scheduler
            height={1082}
            style={{
              width: "975px",
            }}
            data={sampleData}
            defaultDate={displayDate}
            date={getDisplayDate}
            viewSlot={(props) => (
              <CustomViewSlot
                {...props}
                currentMonth={selectedMonth}
                fetchRequestsData={fetchRequestsData}
                expandable={false}
              />
            )}
            viewItem={(props) => (
              <CustomViewItem
                {...props}
                fetchRequestsData={fetchRequestsData}
              />
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
            <div>

            </div>


            </div>
            
            
            
          </div>  
          
       </div>


    
          

        
      
    
    </>
      
    
  );
};

export default MyScheduler;



{/***
  header that works

  
          <div className="h-[40px]">
            <div className="bg-grey flex justify-between items-center">
              <div className="flex items-center ml-auto">
                <Button className="w-8 h-6 aspect-square hover:bg-button">
                  <span className="text-lg k-icon k-i-arrow-left w-full h-full"></span>
                </Button>
                <span className="text-sm bg-[#F1F5F9]">
                  {" "}
                  <SchedulerHeader />{" "}
                </span>
                <Button className="w-8 h-6 aspect-square hover:bg-button ml-2">
                  <span className="text-lg k-icon k-i-arrow-right w-full h-full"></span>
                </Button>
                <span> </span>
              </div>
            </div>
          </div>






          buttons


          <Button 
                       className="w-[50px] h-8 aspect-square">
                          <span className="text-lg k-icon k-i-arrow-left w-full h-full"></span>
                      </Button>
                      <SchedulerHeader />
                      <Button 
                       className="w-[50px] h-8 aspect-square hover:bg-button">
                        <span className="text-lg k-icon k-i-arrow-right w-full h-full"></span>
                      </Button>







        <div className="min-h-[30px] flex items-center justify-between px-2 py-[10px] border border-[#D6D6D6]">
         <div className="flex items-center gap-[10px]">
          <button
            className={`sched-action-button ${
              viewMode === "calendar" ? "active-list" : ""
            }`}
            onClick={handleSwitchToCalendar}
          >
            <span
              className="k-icon k-i-calendar k-button-icon"
              role="presentation"
            />
          </button>
          <button
            className={`sched-action-button ${
              viewMode === "list" ? "active-list" : ""
            }`}
            onClick={handleSwitchToList}
          >
            <span
              className="k-icon k-i-table-row-insert-above k-button-icon"
              role="presentation"
            />
          </button>
        </div>
        <div className="flex items-center gap-[10px]">
          <button className="sched-action-button" onClick={handlePrevBtn}>
            <span
              className="k-icon k-i-arrow-left k-button-icon"
              role="presentation"
            />
          </button>
          <div className="w-[112px] text-center text-[13px]">
            {formatDate(currentDate.toLocaleDateString())}
          </div>
          <button className="sched-action-button" onClick={handleNextBtn}>
            <span
              className="k-icon k-i-arrow-right k-button-icon"
              role="presentation"
            />D
          </button>
        </div>
      </div>

      attempt 3:
        const [isLoadingData, setIsLoadingData] = useState(true);

      
  const fetchData = async () =>{
    try{
      setIsLoadingData(true);
      await fetchRequestsData;
    }
    catch (error){
      console.error("Error" , error);
    } 
    finally{
      setIsLoadingData(false);
    }
  }


        


const handleOverride = React.useCallback(
    (event: SchedulerDateChangeEvent) => { 
      if(event.value){
        setDisplay(event.value);
      }
    },[setDisplay]
  );


  const [isLoadingData, setIsLoadingData] = useState(true);

      
  const fetchData = async (month: number) =>{
    try{
      setIsLoadingData(true);
      await fetchRequestsData();
    }
    catch (e){
      console.error("Error");
    } 
    finally{
      setIsLoadingData(false);
    }
  }






        
        */}