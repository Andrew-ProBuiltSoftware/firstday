// import React from 'react';
// import { Grid, GridProps } from '@progress/kendo-react-grid';

// interface ListingGridProps extends GridProps {}

// export const ListingGrid = React.forwardRef<typeof Grid, ListingGridProps>(
//   ({ children, ...props }, ref) => {
//     return (
//       <Grid
//         ref={ref}
//         size="small"
//         navigatable={true}
//         selectable={{
//           enabled: true,
//           mode: 'single',
//         }}
//         rowHeight={30}
//         detailRowHeight={30}
//         style={{ height: '100%', borderWidth: '1px' }}
//         className="listing-grid"
//         selectedField="selected"
//         {...props}
//       >
//         {children}
//       </Grid>
//     );
//   }
// );

import React from 'react';
import { Grid, GridProps } from '@progress/kendo-react-grid';

interface ListingGridProps extends GridProps {}

export const ListingGrid = React.forwardRef<Grid, ListingGridProps>(
  ({ children, ...props }, ref) => {
    return (
      <Grid
        ref={ref}
        size="small"
        rowHeight={30}
        detailRowHeight={30}
        style={{ height: '100%', borderWidth: '1px' }}
        className="listing-grid"
        {...props}
      >
        {children}
        {/* Modify the Clocks column rendering */}
        {/* <GridColumn
          field="clocks"
          title="Clocks"
          cell={(props) => (
            <td>
              <ul>
                {props.dataItem.clocks.map((clock: any, index: number) => (
                  <li key={index}>
                    {clock.time} - {clock.type}
                  </li>
                ))}
              </ul>
            </td>
          )}
        /> */}
      </Grid>
    );
  }
);
