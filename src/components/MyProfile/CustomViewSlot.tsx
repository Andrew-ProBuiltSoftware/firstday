// @ts-nocheck

import {
  SchedulerViewSlot,
  SchedulerViewSlotProps,
} from '@progress/kendo-react-scheduler';
import { useState } from 'react';
import { Form } from '../Forms/GL_PTOManager/TimeOff/Request';

interface CustomViewSlotProps extends SchedulerViewSlotProps {
  currentMonth: number;
  fetchRequestsData: () => Promise<void>;
}

export const CustomViewSlot = (props: CustomViewSlotProps) => {
  const fetchRequestsData = props.fetchRequestsData;
  const currentMonth = props.currentMonth;
  const displayMonth = new Date(props.start).getMonth();
  const [selectedDate, setSelectedDate] = useState('');

  const [showRequestModal, setShowRequestOffModal] = useState(false);

  const handleShowModal = (e) => {
    setSelectedDate(e.target.props.start);
    setShowRequestOffModal(true);
  };

  const grayOutDaysLabel =
    currentMonth !== displayMonth ? 'text-slate-300 font-normal' : 'font-normal';
  return showRequestModal ? (
    <Form
      setShowRequestOffModal={setShowRequestOffModal}
      IDNo={0}
      fetchRequestsData={fetchRequestsData}
      selectedDate={selectedDate}
    />
  ) : (
    <SchedulerViewSlot
      {...props}
      className={`h-[185px] ${grayOutDaysLabel} hover:cursor-pointer`}
      onDoubleClick={(e) => handleShowModal(e)}
      id={props.id}
      fetchRequestsData={fetchRequestsData}
    />
  );
};
