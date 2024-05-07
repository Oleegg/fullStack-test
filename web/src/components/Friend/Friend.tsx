import { useDispatch, useSelector } from "react-redux";
import { Storage } from "../Auth/types";
import "./Friend.scss";
import { State } from "@/redux/types";
import { useState } from "react";
import { searchFriend } from "@/api/requests";
import { Button } from "../Button";

export const Friend = () => {
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const [friendList, setFriendList] = useState<string[]>([]);
  const [isShowList, setIsShowList] = useState(false);

  const showFriendList = async (fName: string) => {
    const token = localStorage.getItem(Storage.Token);
    if (token) {
      const newParams = new URLSearchParams();
      newParams.set("nick", fName);
      const res = await searchFriend(token, newParams.toString());
      console.log(res);
      if (res.status === 200) {
        setFriendList(res.data);
      }
    }

    setIsShowList(true);
  };

  return (
    <div>
      {user.friend.length ? (
        isShowList ? (
          friendList.length ? (
            <div className="friend__deed-list">
              {friendList.map((item, i) => (
                <p className="friend__item" key={i}>
                  {i + 1} {item}
                </p>
              ))}
              <Button onClick={() => setIsShowList(false)}>
                вернутся к списку друзей
              </Button>
            </div>
          ) : (
            <h2>У этого друга нет списка добрых дел</h2>
          )
        ) : (
          <div className="friend">
            <h3>Список друзей</h3>
            {user.friend.map((f, i) => (
              <p
                key={i}
                onClick={() => showFriendList(f)}
                className="friend__name"
              >
                {f}
              </p>
            ))}
          </div>
        )
      ) : (
        <h2>У вас пока нет друзей</h2>
      )}
    </div>
  );
};
