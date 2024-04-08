import {
  SchedulerHeader,
  SchedulerHeaderProps,
} from '@progress/kendo-react-scheduler';

export const CustomHeader = (props: SchedulerHeaderProps) => {
  console.log(props);
  return (
    <SchedulerHeader>
      {props.children instanceof Array ? props.children[3] : null}
      {props.children instanceof Array ? props.children[2] : null}
      {props.children instanceof Array ? props.children[1] : null}
      {props.children instanceof Array ? props.children[0] : null}
    </SchedulerHeader>
  );
};
