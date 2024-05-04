import { ChangeEvent, FormEvent, useState } from "react";
import { TextInput } from "../Inputs";
import "./Auth.scss";
import { Button, CloseButton } from "../Button";
import { authorization, getList } from "@/api/requests";
import { toast } from "react-toastify";
import { emailValidation, passwordValidation } from "./utils";
import Link from "next/link";
import { Auth } from "@/components/Header/types";
import { AuthProps, Storage } from "./types";
import { useDispatch } from "react-redux";
import { addStateItems, changeStateAuth, createStateUser } from "@/redux/state";

export const Login = ({ onClose, setAuthType }: AuthProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    emailValidation(value, setEmailError);
    setEmail(value);
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    passwordValidation(value, setPasswordError);
    setPassword(value);
  };

  const changeSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailValidation(email, setEmailError);
    passwordValidation(password, setPasswordError);
    if (email && password && !emailError && !passwordError) {
      const registrationUser = async () => {
        try {
          const res = await authorization({ email, password });
          if (res.status === 200) {
            const { token, name, email, id } = res.data;
            const user = { name, email, id };
            localStorage.setItem(Storage.Token, token);
            dispatch(createStateUser(user));
            dispatch(changeStateAuth(true));
            const listRes = await getList(token);
            if (listRes.status === 200) {
              dispatch(addStateItems(listRes.data));
            }
            onClose();
          }
        } catch (e: any) {
          toast.error(e.response?.data.message);
        }
      };
      registrationUser();
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="title-wrapper">
        <h1 className="title">Вход</h1>
        <CloseButton onClick={onClose} />
      </div>
      <form className="form" onSubmit={(e) => changeSubmitHandler(e)}>
        <TextInput
          label="email"
          value={email}
          onChange={(e) => changeEmailHandler(e)}
        />
        <div className="error-text">{emailError}</div>
        <TextInput
          label="password"
          value={password}
          onChange={(e) => changePasswordHandler(e)}
        />
        <div className="error-text">{passwordError}</div>
        <p>
          Ещё не зарегистрированы?{" "}
          <Link
            className="auth-link"
            href=""
            onClick={() => setAuthType(Auth.Register)}
          >
            Регистрация
          </Link>
        </p>
        <div className="auth-btn-wrapper">
          <Button type="submit">Вход</Button>
        </div>
      </form>
    </div>
  );
};
