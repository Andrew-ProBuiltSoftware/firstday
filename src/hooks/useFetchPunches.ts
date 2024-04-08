import { useEffect, useState } from 'react';
import axios from 'axios';
import { IRecords } from '../components/TimeClock/TimeClock.types';

const useFetchPunches = (token: string, email: string, id: string) => {
  const [allClocks, setAllClocks] = useState();
  const [todaysClocks, setTodaysClocks] = useState<string[][]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* 
    This takes in the object returned from the API call and creates a set of tuples with each clock.
    [ ["ClockInTime", "2024-03-11T21:35:16.217"], ["ClockOutTime", "2024-03-11T21:35:55.357"] ]
    It sorts them ascending based on the time stamp at index 1.
    It then removes any entries that are null or are not in the list of valid clocks.
   */

  const validClocks = [
    'ClockInTime',
    'ClockOutTime',
    'LunchOut',
    'LunchIn',
    'BreakOut1',
    'BreakIn1',
  ];

  const formatClocks = (clocks: IRecords) => {
    return Object.entries(clocks)
      .sort(
        (a: any, b: any) => new Date(a[1]).valueOf() - new Date(b[1]).valueOf()
      )
      .filter((clock) => clock[1] !== null && validClocks.includes(clock[0]));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios({
        method: 'get',
        url: `https://api.mtillholdings.com/v3/PTOTimeClock/GetTimeClockLogs?EmployeeID=${id}`,
        headers: { sessionToken: token, userLoginEmail: email },
      })
        .then((response) => {
          const clocks = response.data.data.records;
          const todaysClocks = response.data.data.records[0];
          setAllClocks(clocks);
          setTodaysClocks(formatClocks(todaysClocks));
        })
        .catch((error): void => {
          console.error('Error: ', error);
        });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { allClocks, todaysClocks, isLoading };
};

export default useFetchPunches;
