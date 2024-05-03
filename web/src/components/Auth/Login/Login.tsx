"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { TextInput } from "../../Inputs";
import "../Auth.scss";
import { Wrapper } from "../../Wrapper";
import { Button } from "../../Button";
import { authorization } from "@/api/requests";
import { toast } from "react-toastify";
import { emailValidation, passwordValidation, reqExp } from "../utils";

export const Login = () => {
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
          console.log(res);
        } catch (e: any) {
          toast.error(e.response?.data.message);
        }
      };
      registrationUser();
    }
  };

  return (
    <div className="auth-wrapper">
      <Wrapper>
        <h1 className="title">Авторизация</h1>
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
          <div className="auth-btn-wrapper">
            <Button type="submit">авторизация</Button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};
