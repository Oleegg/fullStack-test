"use client";

import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "../Inputs";
import { Wrapper } from "../Wrapper";
import "./Profile.scss";
import { State, emptyUser } from "@/redux/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { nameValidation, nicknameValidation } from "../Auth/utils";
import { Button } from "../Button";
import { changeStateAuth, changeStateUser } from "@/redux/state";
import { changeUser, deleteUser } from "@/api/requests";
import { toast } from "react-toastify";
import { Storage } from "../Auth/types";
import { useRouter } from "next/navigation";

export const Profile = () => {
  const user = useSelector((state: State) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [nameError, setNameError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const { id } = user;

  const token = localStorage.getItem(Storage.Token);

  useEffect(() => {
    setName(user.name);
    setNickname(user.nickname);
  }, [user]);

  const changeEmailHandler = () => {};

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    nameValidation(value, setNameError);
    setName(value);
  };

  const changeNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    nicknameValidation(value, setNicknameError);
    setNickname(value);
  };

  const changeUserHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nameValidation(name, setNameError);
    nicknameValidation(nickname, setNicknameError);
    if (!nameError && !nicknameError) {
      const changeUserData = async () => {
        try {
          if (token) {
            const newUser = { ...user, name, nickname };
            const res = await changeUser(id, newUser, token);
            if (res.status === 200) {
              dispatch(changeStateUser({ name, nickname }));
            }
          }
        } catch (e: any) {
          console.error(e);
          toast.error(e.response?.data.message);
        }
      };
      changeUserData();
    }
  };

  const deleteProfile = async () => {
    try {
      if (token) {
        const res = (await deleteUser(id, token)) as any;
        if (!res) {
          dispatch(changeStateUser(emptyUser));
          dispatch(changeStateAuth(false));
          localStorage.removeItem(Storage.Token);
          console.log("Вы удалили все данные этого пользователя");
          router.push("/");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isEdit = user.name !== name || nickname !== user.nickname;

  return (
    <div className="profile-wrapper">
      <Wrapper>
        <div className="profile">
          <h1 className="profile__title">Личный кабинет</h1>

          <div className="profile__content">
            <form action="#" onSubmit={(e) => changeUserHandler(e)}>
              <TextInput
                label="почта"
                value={user.email}
                onChange={changeEmailHandler}
                disabled={true}
              />
              <TextInput
                label="имя"
                value={name}
                onChange={changeNameHandler}
              />
              <div className="error-text">{nameError}</div>
              <TextInput
                label="никнэйм"
                value={nickname}
                onChange={changeNicknameHandler}
              />
              <div className="error-text">{nicknameError}</div>
              <div className="profile__btn-wrapper">
                {isEdit ? (
                  <Button type="submit">Сохранить</Button>
                ) : (
                  <Button onClick={() => router.push("/")}>На главную</Button>
                )}
                <Button onClick={deleteProfile}>Удалить</Button>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
