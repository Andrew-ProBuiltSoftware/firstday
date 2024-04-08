import { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelContent,
  ExpansionPanelActionEvent,
} from '@progress/kendo-react-layout';
import { Reveal } from '@progress/kendo-react-animation';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import './Dashboard.styles.scss';

const Dashboard = () => {
  const [expanded, setExpanded] = useState<string[]>([
    'Time Clock',
    'Time Off',
    'Documents',
  ]);

  return (
    <div className="flex flex-col items-center mt-[50px] text-black">
      <div className="w-[800px] text-2xl font-semibold border-b-2 mb-2">
        My Dashboard
      </div>
      <ExpansionPanel
        title="Time Clock"
        expanded={expanded.includes('Time Clock')}
        tabIndex={0}
        style={{ width: '800[px]' }}
        onAction={(event: ExpansionPanelActionEvent) => {
          event.expanded
            ? setExpanded((prevExpanded) =>
                prevExpanded.filter((item) => item !== 'Time Clock')
              )
            : setExpanded((prevExpanded) => [...prevExpanded, 'Time Clock']);
        }}
      >
        <Reveal>
          {expanded.includes('Time Clock') && (
            <ExpansionPanelContent>
              <div className="w-[700px] h-[100px] flex items-center justify-between">
                <div className="scale-[3] text-slate-400 ml-[20px]">
                  <QueryBuilderIcon />
                </div>
                <div className="w-[400px]">
                  <div className="border-t font-semibold">Current Status: </div>
                  <div className="border-t font-semibold">Last Clock-In: </div>
                  <div className="border-t font-semibold">Last Clock-Out:</div>
                </div>
                <div></div>
              </div>
            </ExpansionPanelContent>
          )}
        </Reveal>
      </ExpansionPanel>
      <ExpansionPanel
        title="Time Off"
        expanded={expanded.includes('Time Off')}
        tabIndex={0}
        style={{ width: '800[px]' }}
        onAction={(event: ExpansionPanelActionEvent) => {
          event.expanded
            ? setExpanded((prevExpanded) =>
                prevExpanded.filter((item) => item !== 'Time Off')
              )
            : setExpanded((prevExpanded) => [...prevExpanded, 'Time Off']);
        }}
      >
        <Reveal>
          {expanded.includes('Time Off') && (
            <ExpansionPanelContent>
              <div className="w-[700px] h-[100px] flex items-center justify-between">
                <div className="scale-[3] text-slate-400 ml-[20px]">
                  <CalendarMonthIcon />
                </div>
                <div className="w-[400px]">
                  <div className="border-t font-semibold">
                    Time Off Pending:{' '}
                  </div>
                  <div className="border-t font-semibold">
                    Time Off Approval:{' '}
                  </div>
                </div>
                <div></div>
              </div>
            </ExpansionPanelContent>
          )}
        </Reveal>
      </ExpansionPanel>
      <ExpansionPanel
        title="Documents"
        expanded={expanded.includes('Documents')}
        tabIndex={0}
        style={{ width: '800[px]' }}
        onAction={(event: ExpansionPanelActionEvent) => {
          event.expanded
            ? setExpanded((prevExpanded) =>
                prevExpanded.filter((item) => item !== 'Documents')
              )
            : setExpanded((prevExpanded) => [...prevExpanded, 'Documents']);
        }}
      >
        <Reveal>
          {expanded.includes('Documents') && (
            <ExpansionPanelContent>
              <div className="w-[700px] h-[100px] flex items-center justify-between">
                <div className="scale-[3] text-slate-400 ml-[20px]">
                  <FileCopyIcon />
                </div>
                <div className="w-[400px]">
                  <div className="border-t font-semibold">New Documents: </div>
                  <div className="border-t font-semibold">
                    Total Documents:{' '}
                  </div>
                </div>
                <div></div>
              </div>
            </ExpansionPanelContent>
          )}
        </Reveal>
      </ExpansionPanel>
    </div>
  );
};

export default Dashboard;
