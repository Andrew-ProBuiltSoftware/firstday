import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';

import { WindowHandle } from '@progress/kendo-react-dialogs';

import { WindowFormType } from '../types';

type UserCreds = {
  email: string | undefined;
  id: number | undefined;
  token: string | undefined;
};

type UserContextType = {
  userCreds: UserCreds | null;
  setUserCreds: Dispatch<SetStateAction<UserCreds | null>>;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  view: string;
  setView: Dispatch<SetStateAction<string>>;
  onOpenForm: (
    id: number | string,
    parentGrid: string,
    type: WindowFormType,
    title?: string,
    additionalData?: any
  ) => void;
  openedForms: OpenedFormType[];
  onCloseForm: (id: number | string, type: WindowFormType) => void;
};

type PositionType = { top: number; left: number };

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
};

export type OpenedFormType = {
  key: string;
  id: number | string;
  type: WindowFormType;
  title?: string;
  minimized?: boolean;
  inTaskBar?: boolean;
  parentGrid?: string;
  newFormId?: number | string;
  ref?: WindowHandle | null;
  additionalData?: any;
};

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userCreds, setUserCreds] = useState<UserCreds | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [openedForms, setOpenedForms] = useState<OpenedFormType[]>([]);
  const [currentTaskPage, setCurrentTaskPage] = useState<number>(0);
  const [lastFormPosition, setLastFormPosition] = useState<PositionType>();

  console.log(lastFormPosition);

  const [view, setView] = useState<string>('');

  const onOpenForm = useCallback(
    (
      id: number | string,
      parentGrid: string,
      type: WindowFormType,
      title?: string,
      additionalData?: any
    ) => {
      let form = openedForms.find(
        (form) => form.id === id && form.type === type
      );
      if (!form) {
        form = openedForms.find(
          (form) => form.newFormId === id && form.type === type
        );
      }

      const maxTaskBarItems = 4; /* Math.floor(
        (windowDimensions.width - 281 - 56 - 123 - 35 - 10) / 209
      ); */

      if (form) {
        if (form.minimized) {
          let minimizedCount = 0;

          let currentTP = currentTaskPage;
          const minimizedForms = openedForms.filter(
            (openedForm) => openedForm.minimized
          );

          if (minimizedForms.length - 1 === currentTaskPage * maxTaskBarItems) {
            setCurrentTaskPage(Math.max(currentTaskPage - 1, 0));
            currentTP = currentTaskPage - 1;
          }

          // restore form
          setOpenedForms(
            openedForms.map((openedForm, index) => {
              console.log(`index restore ${index}`);
              const row = Math.floor(minimizedCount / maxTaskBarItems);
              minimizedCount +=
                openedForm.id === form?.id && openedForm.type === form.type
                  ? 0
                  : openedForm.minimized
                  ? 1
                  : 0;
              return openedForm.id === form?.id && openedForm.type === form.type
                ? {
                    ...openedForm,
                    ...form,
                    minimized: false,
                    inTaskBar: row === currentTP && openedForm.minimized,
                  }
                : {
                    ...openedForm,
                    inTaskBar: row === currentTP && openedForm.minimized,
                  };
            })
          );
        } else {
          // focus form
        }
      } else {
        // setOpenedForms([...openedForms, { id, type, title, parentGrid }]);
        openedForms.push({
          key: crypto.randomUUID(),
          id,
          type,
          title,
          parentGrid,
          minimized: false,
          inTaskBar: false,
          additionalData,
        });
        setOpenedForms([...openedForms]);
      }

      // console.log(`openForms:${JSON.stringify(openedForms)}`);
    },
    [currentTaskPage, openedForms]
  );

  const handleFocus = () => {
    const formWindows = Array.from(
      document.querySelectorAll('#root div.k-window.form-window')
    );
    if (formWindows.length > 0) {
      let highestZindex = 0,
        highestWindow = null;
      for (let formWindow of formWindows) {
        const form = formWindow as HTMLDivElement;
        const zIndex = parseInt(form.style.zIndex);
        if (form.classList.contains('k-window-minimized')) {
          form.style.order = `${zIndex}`;
          continue;
        }
        if (zIndex > highestZindex) {
          highestZindex = zIndex;
          highestWindow = form;
        }
      }

      if (highestWindow) {
        (highestWindow as HTMLDivElement).focus();
      } else {
        setLastFormPosition(undefined);
      }
    } else {
      setLastFormPosition(undefined);
    }
  };

  const onCloseForm = (id: number | string, type: WindowFormType) => {
    let minimizedCount = 0;
    const maxTaskBarItems = 4; /* Math.floor(
      (windowDimensions.width - 281 - 56 - 123 - 35 - 10) / 209
    ); */

    let currentTP = currentTaskPage;
    const quickCount = openedForms.reduce(
      (prev, curr) => prev + (curr.minimized ? 1 : 0),
      0
    );
    // console.log(`quickCount:${quickCount-1} currentTaskPage:${currentTaskPage + 1} maxTaskBarItems:${maxTaskBarItems} currentTaskPage:${currentTaskPage} quickCount - 1 < (currentTaskPage + 1) * maxTaskBarItems:${quickCount - 1 === (currentTaskPage + 1) * maxTaskBarItems}`)
    if (quickCount - 1 === currentTaskPage * maxTaskBarItems) {
      setCurrentTaskPage(Math.max(currentTaskPage - 1, 0));
      currentTP = currentTaskPage - 1;
      // console.log(`currentTP:${currentTP}`)
    }

    setOpenedForms(
      openedForms
        .filter(
          (openedForm) => !(openedForm.id === id && openedForm.type === type)
        )
        .map((openedForm) => {
          const row = Math.floor(minimizedCount / maxTaskBarItems);
          minimizedCount += openedForm.minimized ? 1 : 0;
          console.log(
            `openedForm: ${openedForm.title} count ${minimizedCount}`
          );

          return {
            ...openedForm,
            inTaskBar: row === currentTP && openedForm.minimized,
          };
        })
    );
    setTimeout(handleFocus, 100);
  };

  const value: UserContextType = {
    userCreds,
    setUserCreds,
    isUserLoggedIn,
    setIsUserLoggedIn,
    view,
    setView,
    onOpenForm,
    openedForms,
    onCloseForm,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};
