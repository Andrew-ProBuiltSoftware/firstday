import { useEffect, useState } from 'react';
import { IRecords } from './TimeClock.types';
import Button from '../common/Button';
import Clock from './Clock';
import axios from 'axios';
import { useUserContext } from '../../context/AppContext';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TimerIcon from '@mui/icons-material/Timer';

const TimeClock = () => {
  const { userCreds } = useUserContext();

  if (!userCreds) {
    return <></>;
  }

  const { email, id, token } = userCreds;

  const [records, setRecords] = useState<string[][]>([]);

  const validClocks = [
    'ClockInTime',
    'ClockOutTime',
    'LunchOut',
    'LunchIn',
    'BreakOut1',
    'BreakIn1',
  ];

  const clockLabelSwitch = (clock: string): string => {
    const labels: { [key: string]: string } = {
      ClockInTime: 'Clock In',
      ClockOutTime: 'Clock Out',
      LunchOut: 'Start Lunch',
      LunchIn: 'End Lunch',
      BreakOut1: 'Start Break',
      BreakIn1: 'End Break',
    };

    return labels[clock] || '';
  };

  const clockStatus = (clock: string) => {
    let color: string, label: string;

    switch (clock) {
      case 'ClockInTime':
      case 'LunchIn':
      case 'BreakIn1':
        color = 'bg-green-600';
        label = 'CLOCKED IN';
        break;
      case 'ClockOutTime':
        color = 'bg-red-600';
        label = 'CLOCKED OUT';
        break;
      case 'LunchOut':
      case 'BreakOut1':
        color = 'bg-yellow-600';
        label = clock === 'LunchOut' ? 'ON LUNCH' : 'ON BREAK';
        break;
      default:
        color = '';
        label = '';
    }

    const style = `grid items-center text-xs font-extrabold ${color} text-white px-2 rounded`;

    return <p className={style}>{label}</p>;
  };

  /* 
    This takes in the object returned from the API call and creates a set of tuples with each clock.
    [ ["ClockInTime", "2024-03-11T21:35:16.217"], ["ClockOutTime", "2024-03-11T21:35:55.357"] ]
    It sorts them ascending based on the time stamp at index 1.
    It then removes any entries that are null or are not in the list of valid clocks.
   */

  const formatClocks = (clocks: IRecords) => {
    return Object.entries(clocks)
      .sort(
        (a: any, b: any) => new Date(a[1]).valueOf() - new Date(b[1]).valueOf()
      )
      .filter((clock) => clock[1] !== null && validClocks.includes(clock[0]));
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.mtillholdings.com/v3/PTOTimeClock/GetTimeClockLogs?EmployeeID=${id}`,
      headers: { sessionToken: token, userLoginEmail: email },
    })
      .then((response) => {
        const records = response.data.data.records[0];
        setRecords(formatClocks(records));
      })
      .catch((error): void => {
        console.error('Error: ', error);
      });
  }, []);

  const handleButtonClick = (action: string) => {
    axios({
      method: 'patch',
      url: `https://api.mtillholdings.com/v3/PTOTimeClock/PatchClock?EmployeeID=${id}&ClockType=${action}`,
      headers: { sessionToken: token, userLoginEmail: email },
    })
      .then((response) => {
        if (response) {
          axios({
            method: 'get',
            url: `https://api.mtillholdings.com/v3/PTOTimeClock/GetTimeClockLogs?EmployeeID=${id}`,
            headers: { sessionToken: token, userLoginEmail: email },
          })
            .then((response) => {
              const records = response.data.data.records[0];
              setRecords(formatClocks(records));
            })
            .catch((error): void => {
              console.error('Error: ', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  const timeFormatter = (time: string | null): string => {
    if (time === null) return '';
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // const dateFormatter = (date: string): string => {
  //   return new Date(date).toLocaleDateString("en-US", {
  //     year: "2-digit",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });
  // };

  // const punchesStyle = (index: number): string => {
  //   return `w-35 border border-slate-400 border-l-1 border-y-0 text-sm ${
  //     index % 2 === 0 ? "bg-white" : "bg-slate-200"
  //   }`;
  // };

  // const gridHeadersStyle: string =
  //   "w-35 p-2 bg-slate-200 border border-slate-400 border-collapse font-medium text-sm";

  // const gridHeaders: string[] = [
  //   "ClockDate",
  //   "ClockInTime",
  //   "ClockOutTime",
  //   "LunchOut",
  //   "LunchIn",
  //   "BreakOut1",
  //   "BreakIn1",
  // ];

  return (
    <div className="flex container mx-auto justify-center items-center h-auto w-3/4 mt-[50px]">
      <div className="flex flex-col items-center justify-center h-5/6 bg-white p-10 mr-10 min-w-min rounded-md">
        <div className="container flex border-b justify-between pb-2">
          <p>Welcome, Jason</p>
          {records && records.length > 0
            ? clockStatus(records[records.length - 1][0])
            : ''}
        </div>
        <Clock />
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button
              label="Clock In"
              onClick={() => handleButtonClick('ClockIn')}
              icon={<LoginIcon />}
            />
            <Button
              // icon="k-icon k-font-icon k-i-logout"
              label="Clock Out"
              onClick={() => handleButtonClick('ClockOut')}
              icon={<LogoutIcon />}
            />
          </div>
          <div className="flex space-x-4">
            <Button
              label="Start Lunch"
              onClick={() => handleButtonClick('StartLunch')}
              icon={<RestaurantIcon />}
            />
            <Button
              label="End Lunch"
              onClick={() => handleButtonClick('EndLunch')}
              icon={<RestaurantIcon />}
            />
          </div>
          <div className="flex space-x-4">
            <Button
              label="Start Break"
              onClick={() => handleButtonClick('StartBreak')}
              icon={<SnoozeIcon />}
            />
            <Button
              label="End Break"
              onClick={() => handleButtonClick('EndBreak')}
              icon={<TimerIcon />}
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-10 h-[421px] text-nowrap rounded-md w-[255px] flex flex-col justify-between">
        <div>
          <div className="flex justify-start pb-2 border-b mb-2 font-bold">
            Today's Activity
          </div>
          <div>
            {records &&
              records.map(([key, value]) => {
                if (value !== null && validClocks.includes(key)) {
                  return (
                    <div className="flex justify-start" key={key}>
                      {timeFormatter(value)} - {clockLabelSwitch(key)}
                    </div>
                  );
                }
                return <></>;
              })}
          </div>
        </div>
        <div className="border-t">Total Hours: 8.23</div>
      </div>
    </div>
  );
};

export default TimeClock;
