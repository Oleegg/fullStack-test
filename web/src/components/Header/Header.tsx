import { useEffect, useState } from "react";
import { Account } from "../login";
import { ClientPortal } from "../Popup";
import "./Header.scss";
import { Register } from "../Auth/Register";
import { Auth } from "./types";
import { Login } from "../Auth/Login";
import { Storage } from "../Auth/types";
import { getAuthUserData, getList } from "@/api/requests";
import { addStateItems, changeStateAuth, createStateUser } from "@/redux/state";
import { useDispatch } from "react-redux";
import { Wrapper } from "../Wrapper";
import Link from "next/link";

export const Header = () => {
  const dispatch = useDispatch();
  const [authType, setAuthType] = useState<Auth.Register | Auth.Authoris>(
    Auth.Authoris
  );
  const [isShow, setIsShow] = useState(false);

  const showAuth = () => {
    setIsShow(true);
  };

  const closeAuth = () => {
    setIsShow(false);
  };

  useEffect(() => {
    const token = localStorage.getItem(Storage.Token);
    if (token) {
      const getUserData = async () => {
        const res = await getAuthUserData(token);
        if (res.status === 200) {
          const { token: newToken, name, nickname, email, id } = res.data;
          const user = { name, email, id, nickname };
          localStorage.setItem(Storage.Token, newToken);
          dispatch(createStateUser(user));
          dispatch(changeStateAuth(true));
          const listRes = await getList(token);
          if (listRes.status === 200) {
            dispatch(addStateItems(listRes.data));
          }
        }
      };
      getUserData();
    }
  }, []);

  return (
    <div className="header" id="header">
      <Wrapper>
        <div className="header__content">
          <ClientPortal visible={isShow} onClose={closeAuth}>
            {authType === Auth.Register ? (
              <Register onClose={closeAuth} setAuthType={setAuthType} />
            ) : (
              <Login onClose={closeAuth} setAuthType={setAuthType} />
            )}
          </ClientPortal>
          <Link href="/">Logo</Link>
          <Account showAuth={showAuth} />
        </div>
      </Wrapper>
    </div>
  );
};
