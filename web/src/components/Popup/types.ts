import { ReactNode } from "react";

export type PortalProps = {
  children: ReactNode;
  visible: boolean;
  selector?: string;
  onClose: () => void;
  isCloseEsc?: boolean;
};
