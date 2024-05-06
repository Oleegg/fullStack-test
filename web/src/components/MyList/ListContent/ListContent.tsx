import { useSelector } from "react-redux";
import "./ListContent.scss";
import { State } from "@/redux/types";
import { ItemBlock } from "./Item";

export const ListContent = () => {
  const list = useSelector((state: State) => state.user.list);

  return (
    <div className="list">
      {list.length ? (
        <>
          <h1>Список добрых дел</h1>
          {list.map((item, i) => (
            <ItemBlock i={i} key={i} item={item} />
          ))}
        </>
      ) : (
        <p>В списке пока отсутствуют дела</p>
      )}
    </div>
  );
};
