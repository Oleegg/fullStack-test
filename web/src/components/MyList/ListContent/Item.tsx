import "./ListContent.scss";
import Image from "next/image";
import { Item } from "@/redux/types";
import { Storage } from "@/components/Auth/types";
import { changeItem, deleteItem } from "@/api/requests";
import { changeStateItems, deleteStateItem } from "@/redux/state";
import { useDispatch } from "react-redux";
import { TextInput } from "@/components/Inputs";
import { ChangeEvent, useState } from "react";
import { TransparentButton } from "@/components/Button";
import { ClientPortal } from "@/components/Popup";

export const ItemBlock = ({ item, i }: { item: Item; i: number }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(item.todo);
  const [isShow, setIsShow] = useState(false);

  const openEdit = () => {
    setIsShow(true);
  };

  const closeEdit = () => {
    setIsShow(false);
  };

  const deleteItemHandler = async () => {
    const token = localStorage.getItem(Storage.Token);
    if (token) {
      const res = (await deleteItem(item.id, token)) as any;
      if (!res) {
        dispatch(deleteStateItem(item.id));
      }
    }
  };

  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };
  const isChangeTExt = item.todo !== text;

  const changeItemHandler = async () => {
    if (isChangeTExt) {
      const token = localStorage.getItem(Storage.Token);
      if (token) {
        const res = (await changeItem(item.id, text, token)) as any;
        if (res.status === 200) {
          dispatch(changeStateItems({ id: item.id, todo: text }));
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
        <span>{item.todo}</span>
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
