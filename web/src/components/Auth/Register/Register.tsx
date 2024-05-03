"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { TextInput } from "../../Inputs";
import "../Auth.scss";
import { Wrapper } from "../../Wrapper";
import { Button } from "../../Button";
import { registration } from "@/api/requests";
import { toast } from "react-toastify";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };
  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const changeSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && password) {
      const registrationUser = async () => {
        try {
          const res = await registration({ name, email, password });
          console.log(res);
          toast.success("Поездка создана успешно");
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
        <h1 className="title">Регистрация</h1>
        <form className="form" onSubmit={(e) => changeSubmitHandler(e)}>
          <TextInput
            label="name"
            value={name}
            onChange={(e) => changeNameHandler(e)}
          />
          <div className="error-text"></div>
          <TextInput
            label="email"
            value={email}
            onChange={(e) => changeEmailHandler(e)}
          />
          <div className="error-text"></div>
          <TextInput
            label="password"
            value={password}
            onChange={(e) => changePasswordHandler(e)}
          />
          <div className="error-text"></div>
          <div className="auth-btn-wrapper">
            <Button type="submit">регистрация</Button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};
