"use client";

import { IconType } from "react-icons";
import { Spinner } from "flowbite-react/components/Spinner";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  isLoading?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  isLoading,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 
                    ${
                      outline
                        ? "bg-white text-slate-700 hover:bg-slate-700 hover:text-white"
                        : "bg-slate-700 text-white"
                    } 
                    ${
                      small
                        ? "text-sm font-light py-1 px-2 border-[1px]"
                        : "text-md font-semibold py-3 px-4 border-2"
                    }
                    ${custom ? custom : ""}
                `}
    >
      {Icon && <Icon size={24} />}
      {isLoading && <Spinner className="size-5" color={"success"} />}
      {label}
    </button>
  );
};

export default Button;
