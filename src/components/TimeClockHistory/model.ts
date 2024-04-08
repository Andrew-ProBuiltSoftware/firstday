import type { GridColumnProps } from '@progress/kendo-react-grid';

export const columns: GridColumnProps[] = [
  {
    title: 'Date',
    field: 'date',
    width: '150',
  },
  {
    title: 'Clocks',
    field: 'clocks',
    width: '300',
  },
  {
    title: 'Total Hours',
    field: 'totalHours',
    width: '250',
  },
];
