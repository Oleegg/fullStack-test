import { ChangeEvent, InputHTMLAttributes } from "react";

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelStyle?: any;
  wrapperStyle?: any;
  inputStyle?: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
