import { State } from "@/redux/types";
import "./MyList.scss";
import { useSelector } from "react-redux";
import { CreateItem } from "./CreateItem";
import { ListContent } from "./ListContent";

export const MyList = () => {
  const isAuth = useSelector((state: State) => state.isAuth);

  return (
    <div className="my-list__wrapper">
      {isAuth ? (
        <>
          <CreateItem />
          <ListContent />
        </>
      ) : (
        <h2>для получения доступа к списку, необходимо войти в профиль</h2>
      )}
    </div>
  );
};
