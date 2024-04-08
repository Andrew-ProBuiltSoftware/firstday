import React from 'react';
import './style.scss';
interface TitleBarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  onAdd?: () => void;
}

export const SubGridListingTitleBar = ({
  title,
  onAdd,
  ...props
}: TitleBarProps) => {
  return (
    <div className="listing-title-bar border border-b-0">
      <span className={` text-base text-[#424242]`}>{title}</span>
      <div className="flex items-center gap-5 justify-end">
        {props.children && <>{props.children}</>}
        {onAdd && (
          <>
            <button onClick={onAdd} className="listing-action-button">
              <span className="k-icon k-i-plus" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
