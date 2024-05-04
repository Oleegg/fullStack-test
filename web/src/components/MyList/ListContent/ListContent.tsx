import { useSelector } from "react-redux";
import "./ListContent.scss";
import { State } from "@/redux/types";
import { ItemBlock } from "./Item";

export const ListContent = () => {
  const list = useSelector((state: State) => state.list);

  console.log(list);

  return (
    <div className="list">
      <h1>{list.length ? "Список добрых дел" : " "}</h1>

      {list.length ? (
        list.map((item, i) => <ItemBlock i={i} key={item.id} item={item} />)
      ) : (
        <p>В списке пока отсутствуют дела</p>
      )}
    </div>
  );
};
