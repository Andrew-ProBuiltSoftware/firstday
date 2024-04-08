import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export const DialogPrimaryMessage = {
  DELETE: 'Delete record?',
};

export type GenericDialogType =
  | 'None'
  | 'Error'
  | 'Message'
  | 'Confirmation'
  | 'UnsavedClose';

type TypeBasedProps =
  | {
      type: 'None';
      onClose?: never;
      onCancel?: never;
      onConfirmed?: never;
      confirmButtonText?: never;
    }
  | {
      type: 'Error';
      onClose: () => void;
      onCancel?: never;
      onConfirmed?: never;
      confirmButtonText?: never;
    }
  | {
      type: 'Message';
      onClose: () => void;
      onCancel?: never;
      onConfirmed?: never;
      confirmButtonText?: never;
    }
  | {
      type: 'Confirmation';
      onClose?: never;
      onCancel: () => void;
      onConfirmed: () => void;
      confirmButtonText?: string;
    }
  | {
      type: 'UnsavedClose';
      onClose: () => void;
      onCancel: () => void;
      onConfirmed: () => void;
      confirmButtonText?: never;
    };

type GenericConfirmModalProps = {
  showIcon?: boolean;
  primaryMessage: string;
  secondaryMessage?: string;
  reactNode?: ReactNode;
} & TypeBasedProps;

// function getUnderlinedHTMLText(text: string) {
//   return <>
//     <u>{text.charAt(0)}</u>{text.substring(1)}
//   </>
// }

export const GenericDialog = ({
  primaryMessage,
  type,
  showIcon = true,
  confirmButtonText,
  onCancel,
  onClose,
  onConfirmed,
  reactNode,
}: GenericConfirmModalProps) => {
  const [dialogPos, setDialogPos] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const firstFocusBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;

    setDialogPos({
      top: window.innerHeight / 2 - dialogEl.getBoundingClientRect().height / 2,
      left: window.innerWidth / 2 - dialogEl.getBoundingClientRect().width / 2,
    });
  }, []);

  useEffect(() => {
    firstFocusBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;

    let offset = { top: 0, left: 0 };

    const handleTab = (event: KeyboardEvent) => {
      const currTabIndex =
        Number((event.target as HTMLElement).getAttribute('tabindex')) - 1;
      // Get list and order by tabindex in ascending order
      const tabableElements: HTMLButtonElement[] = Array.from(
        dialogEl.querySelectorAll('[tabindex]')
      ).sort(
        (a, b) =>
          +(a.getAttribute('tabindex') ?? 0) -
          +(b.getAttribute('tabindex') ?? 0)
      ) as HTMLButtonElement[];

      if (event.shiftKey || event.key === 'ArrowLeft') {
        const nextFocusedEl = tabableElements[currTabIndex - 1];
        if (nextFocusedEl) {
          nextFocusedEl.focus();
        } else {
          tabableElements[tabableElements.length - 1].focus();
        }
      } else {
        const nextFocusedEl = tabableElements[currTabIndex + 1];
        if (nextFocusedEl) {
          nextFocusedEl.focus();
        } else {
          tabableElements[0].focus();
        }
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (type === 'Error' || type === 'Message') onClose();
        else if (type === 'Confirmation' || type === 'UnsavedClose') onCancel();
      } else if (
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight'
      ) {
        event.preventDefault();
        event.stopPropagation();
        handleTab(event);
      }

      // const sKeys = ['s', 'S', 'ß', 'Í'];
      const cKeys = ['c', 'C', 'ç', 'Ç'];
      const yKeys = ['y', 'Y'];
      const nKeys = ['n', 'N'];

      if (nKeys.includes(event.key)) {
        if (type === 'UnsavedClose') onClose();
        if (type === 'Confirmation') onCancel();
      } else if (yKeys.includes(event.key)) {
        if (type === 'UnsavedClose' || type === 'Confirmation') onConfirmed();
      } else if (cKeys.includes(event.key)) {
        if (type === 'Error' || type === 'Message') onClose();
      }
    };

    const handleMousemove = (event: MouseEvent) => {
      setIsDragging(true);
      setDialogPos({
        top: event.clientY - offset.top,
        left: event.clientX - offset.left,
      });
    };

    const handleMousedown = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement).tagName === 'button' ||
        (event.target as HTMLElement).tagName === 'span'
      )
        return;
      offset = {
        top: event.clientY - dialogEl.getBoundingClientRect().top,
        left: event.clientX - dialogEl.getBoundingClientRect().left,
      };

      event.preventDefault();
      document.addEventListener('mousemove', handleMousemove);
    };

    const handleMouseup = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMousemove);
    };

    dialogEl.addEventListener('keydown', handleKeyPress);
    dialogEl.addEventListener('mousedown', handleMousedown);
    document.addEventListener('mouseup', handleMouseup);
    return () => {
      dialogEl.removeEventListener('keydown', handleKeyPress);
      dialogEl.removeEventListener('mousedown', handleMousedown);
      document.removeEventListener('mouseup', handleMouseup);
      document.removeEventListener('mousemove', handleMousemove);
    };
  }, [type, onClose, onCancel, onConfirmed, confirmButtonText]);

  const handleButtonMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  if (type === 'None') return <></>;

  return createPortal(
    <>
      <DialogOverlay />
      <CustomDialog
        ref={dialogRef}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          ...dialogPos,
          zIndex: 10000000000,
        }}
      >
        <DialogContent>
          {showIcon && <DialogContent.Icon type={type} />}

          <DialogContent.PrimaryMessage>
            {primaryMessage}
          </DialogContent.PrimaryMessage>

          {reactNode}
          {/* {secondaryMessage && (
            <DialogContent.SecondaryMessage>
              {secondaryMessage}
            </DialogContent.SecondaryMessage>
          )} */}

          <DialogContent.ButtonsContainer>
            {(type === 'Message' || type === 'Error') && (
              <button
                onMouseDown={handleButtonMouseDown}
                tabIndex={1}
                className="bg-[#E40000]   hover:bg-[#990000] py-3"
                onClick={onClose}
                ref={firstFocusBtnRef}
              >
                CLOSE
              </button>
            )}

            {type === 'Confirmation' && (
              <>
                <button
                  onMouseDown={handleButtonMouseDown}
                  tabIndex={1}
                  className=" bg-[#24A23B]  hover:bg-[#186B27] py-3"
                  onClick={onConfirmed}
                >
                  YES
                </button>
                <button
                  onMouseDown={handleButtonMouseDown}
                  tabIndex={2}
                  className="bg-[#E40000]  hover:bg-[#990000] py-3"
                  onClick={onCancel}
                  ref={firstFocusBtnRef}
                >
                  NO
                </button>
              </>
            )}

            {type === 'UnsavedClose' && (
              <>
                <button
                  onMouseDown={handleButtonMouseDown}
                  tabIndex={1}
                  className=" bg-[#24A23B]  hover:bg-[#186B27] py-3"
                  onClick={onConfirmed}
                  ref={firstFocusBtnRef}
                >
                  YES
                </button>
                <button
                  onMouseDown={handleButtonMouseDown}
                  tabIndex={2}
                  className="bg-[#E40000]  hover:bg-[#990000] py-3"
                  onClick={onClose}
                >
                  NO
                </button>
              </>
            )}
          </DialogContent.ButtonsContainer>
        </DialogContent>
      </CustomDialog>
    </>,
    document.body
  );
};

const CustomDialog = forwardRef(
  (
    {
      children,
      ...props
    }: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className="generic-custom-dialog absolute inset-0 bg-white w-fit h-fit rounded-[10px] p-[30px]"
      >
        {children}
      </div>
    );
  }
);

const DialogOverlay = () => {
  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      className="bg-black bg-opacity-25 w-screen h-screen absolute inset-0 z-[10000000]"
    />
  );
};

const DialogContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-6 items-center">{children}</div>;
};

DialogContent.Icon = ({ type }: { type: GenericDialogType }) => {
  return (
    <>
      {type === 'Message' && (
        <InfoOutlinedIcon sx={{ fontSize: 50 }} className="text-blue-500" />
      )}
      {type === 'Error' && (
        <ErrorOutlineOutlinedIcon
          sx={{ fontSize: 50 }}
          className="text-red-500"
        />
      )}
      {(type === 'Confirmation' || type === 'UnsavedClose') && (
        <HelpOutlineOutlinedIcon
          sx={{ fontSize: 50 }}
          className="text-blue-500"
        />
      )}
    </>
  );
};

DialogContent.PrimaryMessage = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-2xl text-center font-medium select-none">{children}</h1>
  );
};

DialogContent.SecondaryMessage = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="text-base text-center font-normal select-none">
      {children}
    </h3>
  );
};

DialogContent.ButtonsContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-3 mt-6">{children}</div>;
};
