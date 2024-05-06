import { MouseEvent, ReactNode, useEffect } from "react";
import "./Popup.scss";
import { Button } from "../Button";

type PopupProps = {
  visible: boolean;
  children: ReactNode | string;
  onClose: () => void;
  title?: string;
  isCloseWrapper?: boolean;
  isCloseEsc?: boolean;
  isPortal?: boolean;
};

export const Popup = ({
  visible = false,
  children,
  onClose,
  isCloseWrapper = false,
  isCloseEsc = false,
  title,
  isPortal = false,
}: PopupProps) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  const close = (e: MouseEvent) => {
    if (isCloseWrapper) {
      const id = (e.target as HTMLDivElement).id;
      if (id === "popup") {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (isCloseEsc) {
      document.addEventListener("keydown", onKeydown);
      return () => document.removeEventListener("keydown", onKeydown);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else if (isPortal) {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="popup__wrapper" onClick={(e) => close(e)} id="popup">
      <div className="popup">
        <h2>{title}</h2>
        {children}
        <Button onClick={() => onClose()}>Закрыть</Button>
      </div>
    </div>
  );
};
