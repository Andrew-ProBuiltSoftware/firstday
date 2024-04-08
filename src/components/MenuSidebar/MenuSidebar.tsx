import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import cx from 'classnames';
import { useState } from 'react';
import { default as ProBuiltLogo } from '../../assets/pb-image.png';
import { useUserContext } from '../../context/AppContext';
import MainContainer from '../MainContainer';

const MenuSidebar = () => {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);

  const { view, setView, setUserCreds, setIsUserLoggedIn } = useUserContext();

  const handleLogOut = () => {
    setUserCreds({
      email: '',
      id: 1,
      token: '',
    });
    setIsUserLoggedIn(false);
  };

  const showActiveBar = (viewBar: string) => {
    return view === viewBar ? (
      <div className="w-[5px] h-[24px] bg-[#528FCB] transition ease-in-out" />
    ) : (
      <div className="w-[5px] h-[30px]" />
    );
  };
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen overflow-hidden">
      <div className="grid grid-cols-[auto_1fr] h-full overflow-hidden">
        <Sidebar
          className="h-screen sidebar fixed top-[0px]"
          collapsed={isSideBarCollapsed}
          backgroundColor="#212121"
          width="280px"
          transitionDuration={300}
          collapsedWidth="55px"
        >
          <Menu
            renderExpandIcon={({ open, level }) => (
              <span>
                {level === 0 ? (
                  ''
                ) : open ? (
                  <KeyboardArrowDownIcon fontSize="small" />
                ) : (
                  <KeyboardArrowLeftIcon fontSize="small" />
                )}
              </span>
            )}
            menuItemStyles={{
              // might need to add back isSubMenu to this argument object
              button: ({ level, active, disabled }) => {
                return {
                  color: disabled ? '#8E8E8E' : '#90A2B5',
                  backgroundColor: active ? '#1B5199' : '#212121',
                  // width: collapsed ? "400px" : "200px",
                  paddingRight: level === 0 ? '10px' : '20px',
                };
              },
              // Might need to add back active and isSubMenu to this object
              label: ({ level, disabled }) => {
                return {
                  color: disabled
                    ? '#8E8E8E'
                    : level === 0
                    ? '#ededed'
                    : '#D4D9DE',
                };
              },
            }}
          >
            <div
              className={cx(
                'flex flex-col justify-between ps-header h-[51px] bg-[#0A1D37] fixed top-0 z-10 overflow-hidden transition-all duration-300',
                !isSideBarCollapsed ? 'w-[280px] ' : 'w-[55px] '
              )}
            >
              <MenuItem
                onClick={() => setIsSideBarCollapsed(!isSideBarCollapsed)}
                className="h-full flex items-center"
              >
                <div className="w-[280px] h-[60px] flex flex-row flex-nowrap gap-2 items-center mt-2">
                  <div className="flex gap-[13px] items-center">
                    <img
                      src={ProBuiltLogo}
                      alt="Logo"
                      className={`h-[30px] ${
                        !isSideBarCollapsed ? 'ml-[18px] ' : 'ml-[16px]'
                      } transition-all duration-300`}
                    />
                  </div>
                </div>
              </MenuItem>
              <div className="h-[1px] border-b w-[280px] border-[#5F6E8C] "></div>
            </div>
            <div className="mt-[60px]" />
            <SubMenu
              defaultOpen={true}
              label="HOME"
              icon={
                <HouseRoundedIcon
                  fontSize="small"
                  className=""
                  style={{ color: '#ededed' }}
                />
              }
            >
              <MenuItem
                disabled={false}
                onClick={() => setView('Dashboard')}
                prefix={showActiveBar('Dashboard')}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                disabled={false}
                onClick={() => setView('MyProfile')}
                prefix={showActiveBar('MyProfile')}
              >
                My Profile
              </MenuItem>
              <MenuItem
                disabled={false}
                onClick={() => setView('Documents')}
                prefix={showActiveBar('Documents')}
              >
                Documents
              </MenuItem>
              <MenuItem
                disabled={false}
                onClick={() => handleLogOut()}
                prefix={showActiveBar('Logout')}
              >
                Logout
              </MenuItem>
            </SubMenu>
            <SubMenu
              defaultOpen={false}
              label="TIME CLOCK"
              icon={
                <AccessTimeIcon
                  fontSize="small"
                  className=""
                  style={{ color: '#ededed' }}
                />
              }
            >
              <MenuItem
                disabled={false}
                onClick={() => setView('TimeClock')}
                prefix={showActiveBar('TimeClock')}
                className="font-normal"
              >
                Home
              </MenuItem>
              <MenuItem
                disabled={false}
                onClick={() => setView('TimeClockHistory')}
                prefix={showActiveBar('TimeClockHistory')}
                className="font-normal"
              >
                History
              </MenuItem>
            </SubMenu>
            <SubMenu
              defaultOpen={false}
              label="TIME OFF"
              icon={
                <CalendarMonthIcon
                  fontSize="small"
                  className=""
                  style={{ color: '#ededed' }}
                />
              }
            >
              <MenuItem
                disabled={false}
                onClick={() => setView('TimeOff')}
                prefix={showActiveBar('TimeOff')}
                className="font-normal"
              >
                Home
              </MenuItem>
              <MenuItem
                disabled={false}
                onClick={() => setView('TimeOffHistory')}
                prefix={showActiveBar('TimeOffHistory')}
                className="font-normal"
              >
                History
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
        <MainContainer />
      </div>
    </div>
  );
};

export default MenuSidebar;
