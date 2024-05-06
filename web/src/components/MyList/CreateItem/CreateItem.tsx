import { TextInput } from "@/components/Inputs";
import "./CreateItem.scss";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { Storage } from "@/components/Auth/types";
import { changeUser } from "@/api/requests";
import { changeStateList } from "@/redux/state";
import { State } from "@/redux/types";

export const CreateItem = () => {
  const user = useSelector((state: State) => state.user);
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  const changeItem = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItem(value);
  };

  const addItem = async () => {
    if (item) {
      const token = localStorage.getItem(Storage.Token);
      if (token) {
        const newList = [...user.list, item];
        const res = await changeUser(user.id, { list: newList }, token);
        console.log(res);
        if (res.status === 200) {
          dispatch(changeStateList(newList));
          setItem("");
        }
      }
    }
  };

  return (
    <div>
      <TextInput
        value={item}
        label="Добавить дело"
        onChange={(e) => changeItem(e)}
      />
      <Button onClick={addItem}>Добавить</Button>
    </div>
  );
};
