import { useEffect, useRef, useState } from "react";
import { Storage } from "../Auth/types";
import Image from "next/image";
import Link from "next/link";
import { User, emptyUser } from "@/redux/types";
import { useDispatch } from "react-redux";
import { changeStateAuth, changeStateUser } from "@/redux/state";

export const AccountMenu = ({ user }: { user: User }) => {
  const { name } = user;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        if ((e.target as HTMLElement).localName === "a") {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      } else if (root.current && !root.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", (e) => onClick(e));
    return () => document.removeEventListener("click", onClick);
  }, []);

  const exit = () => {
    localStorage.removeItem(Storage.Token);
    dispatch(changeStateUser(emptyUser));
    dispatch(changeStateAuth(false));
  };

  return (
    <div
      className={isOpen ? "account-wrapper open" : "account-wrapper"}
      onClick={() => setIsOpen(!isOpen)}
      ref={root}
    >
      <div className="account-name">
        <Image src="/images/svg/login.svg" alt="login" height={17} width={16} />
        {name ? name : "Кабинет"}
      </div>
      <div
        ref={ref}
        className={isOpen ? "account-content open" : "account-content"}
      >
        <Link className="account-item" href="/profile">
          Профиль
        </Link>
        <Link className="account-item" href="/" onClick={exit}>
          Выйти
        </Link>
      </div>
    </div>
  );
};
