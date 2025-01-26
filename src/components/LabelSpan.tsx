import { ReactNode } from "react";

type LabelSpan = {
  children?: ReactNode;
  className?: string;
};

export default function LabelSpan({ children, className }: LabelSpan) {
  return (
    <span
      className={`${
        className ? className : "bg-red-400 text-white"
      } text-sm mx-auto text-center font-medium my-1 max-w-[100px] px-2.5 py-0.5 rounded-sm`}
    >
      {children}
    </span>
  );
}
