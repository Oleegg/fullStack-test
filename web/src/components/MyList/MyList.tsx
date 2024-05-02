import { State } from "@/redux/types";
import "./MyList.scss";
import { useSelector } from "react-redux";

export const MyList = () => {
  const isAuth = useSelector((state: State) => state.auth.isAuth);
  return (
    <div className="my-list__wrapper">
      {isAuth ? (
        <h1>Список добрых дел</h1>
      ) : (
        <h2>для получения доступа к списку, необходимо войти в профиль</h2>
      )}
    </div>
  );
};
