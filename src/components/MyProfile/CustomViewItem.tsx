// @ts-nocheck

import {
  SchedulerViewItemProps,
  SchedulerViewItem,
} from '@progress/kendo-react-scheduler';
import { Form } from '../Forms/GL_PTOManager/TimeOff/Request';
import { useState } from 'react';

interface CustomViewItemProps extends SchedulerViewItemProps {
  fetchRequestsData: () => Promise<void>;
}

export const CustomViewItem = (props: CustomViewItemProps) => {
  const isTakenDate = props.dataItem.start.getTime() < new Date().getTime();
  console.log(new Date().getTime());
  const fetchRequestsData = props.fetchRequestsData;
  const [showRequestOffModal, setShowRequestOffModal] = useState(false);
  const [IDNo, setIDNo] = useState(0);
  const statusStyle = isTakenDate
    ? '#16417C'
    : props.description === 'Pending'
    ? '#7F7F7F'
    : props.description === 'Approved'
    ? '#FF7F27'
    : '';

  const handleShowModal = (e) => {
    setIDNo(e.target.props.dataItem.id);
    setShowRequestOffModal(true);
  };

  return showRequestOffModal ? (
    <Form
      setShowRequestOffModal={setShowRequestOffModal}
      IDNo={IDNo}
      fetchRequestsData={fetchRequestsData}
    />
  ) : (
    <SchedulerViewItem
      {...props}
      style={{
        ...props.style,
        height: '1px',
        width: 'auto',
        backgroundColor: statusStyle,
      }}
      key={props.id}
      onDoubleClick={(e) => handleShowModal(e)}
      id={props.id}
      fetchRequestsData={fetchRequestsData}
    />
  );
};
