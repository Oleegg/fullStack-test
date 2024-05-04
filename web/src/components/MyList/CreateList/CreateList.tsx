import { TextInput } from "@/components/Inputs";
import "./CreateList.scss";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/Button";
import { useDispatch } from "react-redux";
import { addStateItem } from "@/redux/state";
import { createItem } from "@/api/requests";
import { Storage } from "@/components/Auth/types";

export const CreateList = () => {
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
        const res = await createItem(item, token);
        if (res.status === 200) {
          dispatch(addStateItem(res.data));
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
