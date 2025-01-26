import { ReactNode } from "react";

export type ButtonComponentProps = {
  label: string;
  className?: string;
  onClickCallback?: () => void;
  disable?: boolean;
  children?: ReactNode;
};

export default function ButtonComponent({
  label,
  className,
  onClickCallback,
  disable,
  children,
}: ButtonComponentProps) {
  return (
    <button
      className={`rounded font-medium min-h-[32px] text-center place-items-center place-content-center 
        hover:cursor-pointer hover:opacity-80 
         ${className}`}
      onClick={() => onClickCallback && onClickCallback()}
      disabled={disable}
    >
      {label}
      {children}
    </button>
  );
}
