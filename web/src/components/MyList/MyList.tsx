import { State } from "@/redux/types";
import "./MyList.scss";
import { useSelector } from "react-redux";
import { CreateList } from "./CreateList/CreateList";
import { ListContent } from "./ListContent/ListContent";

export const MyList = () => {
  const isAuth = useSelector((state: State) => state.isAuth);
  return (
    <div className="my-list__wrapper">
      {isAuth ? (
        <>
          <CreateList />
          <ListContent />
        </>
      ) : (
        <h2>для получения доступа к списку, необходимо войти в профиль</h2>
      )}
    </div>
  );
};
