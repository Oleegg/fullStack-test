import { ButtonHTMLAttributes } from "react";
import "./Button.scss";

export const Button = ({
  children,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button className="button" type={type} {...rest}>
      {children}
    </button>
  );
};
