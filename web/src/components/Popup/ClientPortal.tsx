import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Popup.scss";
import { PortalProps } from "./types";

export const ClientPortal = ({
  children,
  selector = "header",
  visible = false,
  isCloseEsc = false,
  onClose,
}: PortalProps) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
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
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  const content = <div className="portal-wrapper">{children}</div>;
  return visible && ref.current ? createPortal(content, ref.current) : null;
};
