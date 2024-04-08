/*

import { Grid, GridColumn } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { useUserContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { columns } from './model';

const TimeAttendanceLog = () => {
  const [clocks, setClocks] = useState();
  const { userCreds } = useUserContext();
  const data: string[] = [];

  if (!userCreds) {
    return <></>;
  }

  const { id, token, email } = userCreds;

  console.log(clocks);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.mtillholdings.com/v3/PTOTimeClock/GetTimeClockLogs?EmployeeID=${id}`,
      headers: { sessionToken: token, userLoginEmail: email },
    })
      .then((response) => {
        const clocks = response.data.data.records;
        setClocks(clocks);
      })
      .catch((error): void => {
        console.error('Error: ', error);
      });
  }, []);

  return (
    <div className="listing-view-container">
      <h2 className="text-xl font-semibold mb-4 border-green-600 border-2">
        Time & Attendance Log
      </h2>
      <hr className="border-yellow-600 mb-4" />
      <Grid
        style={{ height: '100%', borderWidth: '1px' }}
        className="listing-grid"
        data={data}
      >
        {columns.map((column, index) => (
          <GridColumn
            {...column}
            key={index}
            footerCell={(props) => (
              <td
                className="k-table-td"
                colSpan={props.colSpan}
                style={props.style}
                role="gridcell"
              />
            )}
          />
        ))}
      </Grid>
    </div>
  );
};

const ClocksCell = (props: any) => {
  const clocks = [
    {
      time: '9:22 PM',
      type: 'Clock In',
    },
  ];
  return (
    <div>
      {clocks.map((clock: any, index: number) => {
        console.log('Clock: ', clock);
        return (
          <div key={index} className="flex items-center mb-1">
            <div className="mr-2">{clock.time}</div>
            <div>{clock.type}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeAttendanceLog;

const data = [
  {
    date: '2024-03-14',
    totalHours: '8',
    clocks: [
      { time: '09:00 AM', type: 'In' },
      { time: '01:00 PM', type: 'Out' },
      { time: '02:00 PM', type: 'In' },
      // Add more clock entries as needed
    ]
  },
  // Add more entries for different dates
];



const ListingGrid = ({ data }) => {
  return (
    <div className="listing-grid">
      {data.map((item, index) => (
        <div key={index} className="listing-item">
          <div>Date: {item.date}</div>
          <div>Clocks:</div>
          <ul>
            {item.clocks.map((clock, i) => (
              <li key={i}>
                Time: {clock.time}, Type: {clock.type}
              </li>
            ))}
          </ul>
          <div>Total Hours: {item.totalHours}</div>
        </div>
      ))}
    </div>
  );
};


*/
/* -------------------------------------------------------------------------------------------------- */
import { GridColumn } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { ListingGrid } from '../ListingView/ListingGrid';
import { columns } from './model';

const TimeAttendanceLog = () => {
  const data = [
    {
      date: '03/13/24',
      clocks: [
        { time: '09:00 AM', type: 'Clock In' },
        { time: '01:00 PM', type: 'Start Lunch' },
        { time: '02:00 PM', type: 'End Lunch' },
        { time: '03:00 PM', type: 'Clock Out' },
      ],
      totalHours: '6 hrs 22 mins',
    },
    {
      date: '03/12/24',
      clocks: [
        { time: '09:00 AM', type: 'Clock In' },
        { time: '01:00 PM', type: 'Start Lunch' },
        { time: '02:00 PM', type: 'End Lunch' },
        { time: '03:00 PM', type: 'Clock Out' },
      ],
      totalHours: '8 hrs 10 mins ',
    },
    {
      date: '03/11/24',
      clocks: [
        { time: '09:00 AM', type: 'Clock In' },
        { time: '01:00 PM', type: 'Start Lunch' },
        { time: '02:00 PM', type: 'End Lunch' },
        { time: '03:00 PM', type: 'Clock Out' },
      ],
      totalHours: '7 hrs 56 mins',
    },
  ];

  // const DateCell = (props: any) => {
  //   const date = props.dataItem.date;
  //   return (
  //     <td className="border-4 w-1/4 align-text-top">
  //       <div>{date}</div>
  //     </td>
  //   );
  // };

  // const ClocksCell = (props: any) => {
  //   const clocks = props.dataItem.clocks;
  //   return (
  //     <td className="border-4 w-[400px]">
  //       {clocks.map((clock: any, index: number) => (
  //         <div key={index} className="flex items-center my-1">
  //           <div className="mr-2">
  //             {clock.time} - {clock.type}
  //           </div>
  //         </div>
  //       ))}
  //     </td>
  //   );
  // };

  // const HoursCell = (props: any) => {
  //   const hours = props.dataItem.totalHours;
  //   return (
  //     <td className="border-4 w-1/4 align-text-top">
  //       <div>{hours}</div>
  //     </td>
  //   );
  // };

  return (
    //   <div className="bg-white p-4">
    //     <h2 className="text-xl font-semibold mb-4">Time Clock History</h2>
    //     <hr className="border-gray-300 mb-4" />
    //     <Grid data={data}>
    //       <GridColumn field="date" title="Date" cell={DateCell} />
    //       <GridColumn field="clocks" title="Clocks" cell={ClocksCell} />
    //       <GridColumn field="totalHours" title="Total Hours" cell={HoursCell} />
    //     </Grid>
    //   </div>
    // );

    <div className="listing-view-container">
      <div className="text-xl font-semibold h-[47px] border-b border-slate-300 align-text-bottom mt-[10px] mb-2">
        Time & Attendance Log
      </div>
      <>
        <ListingGrid data={data}>
          {columns.map((column, index) => {
            return (
              <GridColumn
                {...column}
                key={index}
                footerCell={(props) => (
                  <td
                    className="k-table-td"
                    colSpan={props.colSpan}
                    style={props.style}
                    role="gridcell"
                  >
                    {props.field === 'EntityName' ? (
                      <span className="px-5 py-3 text-[#424242] font-medium">
                        {data.length}
                      </span>
                    ) : (
                      ''
                    )}
                  </td>
                )}
              />
            );
          })}
        </ListingGrid>
      </>
    </div>
  );
};

export default TimeAttendanceLog;
