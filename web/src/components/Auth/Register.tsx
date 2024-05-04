import { ChangeEvent, FormEvent, useState } from "react";
import { TextInput } from "../Inputs";
import "./Auth.scss";
import { Button, CloseButton } from "../Button";
import { registration } from "@/api/requests";
import { toast } from "react-toastify";
import { emailValidation, nameValidation, passwordValidation } from "./utils";
import Link from "next/link";
import { AuthProps, Storage } from "./types";
import { Auth } from "@/components/Header/types";
import { useDispatch } from "react-redux";
import { changeStateAuth, createStateUser } from "@/redux/auth";

export const Register = ({ onClose, setAuthType }: AuthProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    nameValidation(value, setNameError);
    setName(value);
  };

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
    nameValidation(name, setNameError);
    emailValidation(email, setEmailError);
    passwordValidation(password, setPasswordError);
    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      const registrationUser = async () => {
        try {
          const res = await registration({ name, email, password });
          if (res.status === 200) {
            const { token, name, email, id } = res.data;
            const user = { name, email, id };
            localStorage.setItem(Storage.Token, token);
            dispatch(createStateUser(user));
            dispatch(changeStateAuth(true));
            onClose();
          }
        } catch (e: any) {
          console.error(e);
          toast.error(e.response?.data.message);
        }
      };
      registrationUser();
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="title-wrapper">
        <h1 className="title">Регистрация</h1>
        <CloseButton onClick={onClose} />
      </div>
      <form className="form" onSubmit={(e) => changeSubmitHandler(e)}>
        <TextInput
          label="name"
          value={name}
          onChange={(e) => changeNameHandler(e)}
        />
        <div className="error-text">{nameError}</div>
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
          Уже зарегистрированы?{" "}
          <Link
            className="auth-link"
            href=""
            onClick={() => setAuthType(Auth.Authoris)}
          >
            Войти
          </Link>
        </p>
        <div className="auth-btn-wrapper">
          <Button type="submit">регистрация</Button>
        </div>
      </form>
    </div>
  );
};
