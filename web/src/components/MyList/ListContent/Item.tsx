import "./ListContent.scss";
import Image from "next/image";
import { TextInput } from "@/components/Inputs";
import { ChangeEvent, useState } from "react";
import { TransparentButton } from "@/components/Button";
import { ClientPortal } from "@/components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/redux/types";
import { Storage } from "@/components/Auth/types";
import { changeUser } from "@/api/requests";
import { changeStateList } from "@/redux/state";

export const ItemBlock = ({ item, i }: { item: string; i: number }) => {
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const [text, setText] = useState(item);
  const [isShow, setIsShow] = useState(false);

  const openEdit = () => {
    setIsShow(true);
    setText(item);
  };

  const closeEdit = () => {
    setIsShow(false);
    setText("");
  };

  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };
  const isChangeTExt = item !== text;

  const deleteItemHandler = async () => {
    const token = localStorage.getItem(Storage.Token);
    if (token) {
      const newList = [...user.list.filter((_, j) => i !== j)];
      const res = await changeUser(user.id, { list: newList }, token);
      if (res.status === 200) {
        dispatch(changeStateList(newList));
      }
    }
  };

  const changeItemHandler = async () => {
    if (isChangeTExt) {
      const token = localStorage.getItem(Storage.Token);
      if (token) {
        const newList = user.list.map((el, j) => {
          if (i === j) {
            return text;
          }
          return el;
        });
        const res = await changeUser(user.id, { list: newList }, token);
        if (res.status === 200) {
          dispatch(changeStateList(newList));
          closeEdit();
        }
      }
    }
  };

  return (
    <div className="item">
      <ClientPortal visible={isShow} onClose={closeEdit}>
        <div className="edit__wrapper">
          <TextInput value={text} onChange={changeText} label="" />
          <div className="edit__btn">
            {isChangeTExt && (
              <TransparentButton
                onClick={changeItemHandler}
                style={{ marginLeft: "3px" }}
              >
                Сохранить
              </TransparentButton>
            )}
            <TransparentButton
              onClick={closeEdit}
              style={{ marginLeft: "3px" }}
            >
              отмена
            </TransparentButton>
          </div>
        </div>
      </ClientPortal>
      <div className="item__content">
        <span>{i + 1}</span>
        <span>{item}</span>
      </div>
      <div className="item__content">
        <TransparentButton onClick={openEdit}>изменить</TransparentButton>
        <div className="item__btn" onClick={deleteItemHandler}>
          <Image
            src="/images/svg/delete.svg"
            alt="delete"
            width={25}
            height={30}
          />
        </div>
      </div>
    </div>
  );
};
