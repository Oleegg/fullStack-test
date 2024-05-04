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

export const TransparentButton = ({
  children,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button className="button transparent" type={type} {...rest}>
      {children}
    </button>
  );
};

export const CloseButton = ({
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button className="button transparent close-btn" type={type} {...rest}>
      X
    </button>
  );
};
