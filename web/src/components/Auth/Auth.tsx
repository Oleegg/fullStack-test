import "./Auth.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeAuth } from "@/redux/auth";
import { State } from "@/redux/types";
import Image from "next/image";

export const Auth = () => {
  const isAuth = useSelector((state: State) => state.auth.isAuth);
  const dispatch = useDispatch();

  return (
    <div className="auth">
      {isAuth ? (
        <Image src="/images/svg/login.svg" alt="login" height={17} width={16} />
      ) : (
        <div onClick={() => dispatch(changeAuth(true))}>Вход</div>
      )}
    </div>
  );
};
