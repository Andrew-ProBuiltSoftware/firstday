import { ReactNode } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  additionalClasses?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  additionalClasses = '',
  disabled,
  icon,
}) => {
  const buttonClasses = `bg-[#7d7b77] hover:bg-[#9bb1c2] transition text-white font-bold py-2 px-4 rounded w-40 shadow-[0_3px_10px_rgb(0,0,0,0.2)] active:shadow-none ${additionalClasses}`;
  const contentClasses = 'flex items-center justify-center';

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      <span className={contentClasses}>
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </span>
    </button>
  );
};

export default Button;
