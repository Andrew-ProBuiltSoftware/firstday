import moment from 'moment';
import { FormChangesType } from '../../types';

export const formatClientDateTime = (date?: Date | string): string | null => {
  if (!date) {
    return null;
  }
  // converts date into MSSQL format string
  const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');

  return formattedDate;
};

export function isChanges(changes: FormChangesType) {
  return changes.gridItems.length > 1 || changes.changed;
}
