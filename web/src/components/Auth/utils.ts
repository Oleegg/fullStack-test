import { Dispatch, SetStateAction } from "react";

export const reqExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const nameValidation = (
  value: string,
  setNameError: Dispatch<SetStateAction<string>>
) => {
  if (!value) {
    setNameError("Введите имя");
  } else {
    setNameError("");
  }
};

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

export const nicknameValidation = (
  value: string,
  setNicknameError: Dispatch<SetStateAction<string>>
) => {
  if (!value) {
    setNicknameError("Введите никнэйм");
  } else if (value[0] !== "@") {
    setNicknameError("Никнэйм в начале должен иметь @");
  } else {
    setNicknameError("");
  }
};

export const passwordValidation = (
  value: string,
  setPasswordError: Dispatch<SetStateAction<string>>,
  isEmpty?: boolean
) => {
  if (!value) {
    if (isEmpty) {
      setPasswordError("");
    } else {
      setPasswordError("Введите пароль");
    }
  } else if (value.length < 3) {
    setPasswordError("Пароль должен быть больше 3 символов");
  } else {
    setPasswordError("");
  }
};
