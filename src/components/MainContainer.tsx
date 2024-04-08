// @ts-nocheck

import { useEffect } from 'react';
import { useUserContext } from '../context/AppContext';
import Dashboard from './Dashboard/Dashboard';
import Documents from './Documents/Documents';
import MyProfile from './MyProfile/MyProfile';
import TimeClock from './TimeClock/TimeClock';
import TimeClockHistory from './TimeClockHistory/TimeClockHistory';
import TimeOff from './TimeOff/TimeOff';
import TimeOffHistory from './TimeOffHistory/TimeOffHistory';

interface ComponentMap {
  [key: string]: JSX.Element;
}

const componentMap: ComponentMap = {
  TimeClock: <TimeClock />,
  Dashboard: <Dashboard />,
  MyProfile: <MyProfile />,
  Documents: <Documents />,
  TimeClockHistory: <TimeClockHistory />,
  TimeOff: <TimeOff />,
  TimeOffHistory: <TimeOffHistory />,
};

const MainContainer = () => {
  const { view, setView } = useUserContext();
  const Component = componentMap[view];

  useEffect(() => {
    setView('Dashboard');
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] w-full overflow-hidden bg-slate-100 border-4">
      <div className="w-full overflow-hidden">{Component}</div>
    </div>
  );
};

export default MainContainer;
