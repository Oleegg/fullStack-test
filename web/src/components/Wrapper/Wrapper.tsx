import { ReactNode } from "react";
import "./Wrapper.scss";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="wrapper">{children}</div>;
};
