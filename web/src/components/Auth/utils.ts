import { Dispatch, SetStateAction } from "react";

export const reqExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const emailValidation = (
  value: string,
  setEmailError: Dispatch<SetStateAction<string>>
) => {
  if (!value) {
    setEmailError("Введите адрес электронной почты");
  } else if (!reqExp.test(value)) {
    setEmailError("Введите корректный адрес электронной почты");
  } else {
    setEmailError("");
  }
};
export const passwordValidation = (
  value: string,
  setPasswordError: Dispatch<SetStateAction<string>>
) => {
  if (!value) {
    setPasswordError("Введите пароль");
  } else if (value.length < 3) {
    setPasswordError("Пароль должен быть больше 3 символов");
  } else {
    setPasswordError("");
  }
};
