import { Dispatch, SetStateAction, useState } from "react";
import "./Search.scss";
import Image from "next/image";
import { changeUser, searchFriend } from "@/api/requests";
import { Storage } from "../Auth/types";
import { Popup } from "../Popup";
import { Button, TransparentButton } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/redux/types";
import { changeStateFriend } from "@/redux/state";

export const Search = ({
  setIsFriend,
  isFriendList,
}: {
  setIsFriend: Dispatch<SetStateAction<boolean>>;
  isFriendList: boolean;
}) => {
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [friend, setFriend] = useState("");

  const searchFriendHandler = async () => {
    try {
      if (friend && friend[0] === "@" && friend !== user.nickname) {
        const token = localStorage.getItem(Storage.Token);
        if (token) {
          const newParams = new URLSearchParams();
          newParams.set("nick", friend);
          const res = await searchFriend(token, newParams.toString());
          console.log(res);
          if (res.status === 200) {
            setIsAddBtn(true);
          }
        }
      } else if (friend === user.nickname) {
        openError();
        setErrorText("Это ваш никнайм");
      } else if (friend[0] !== "@") {
        openError();
        setErrorText("Никнэйм в начале должен иметь @");
      }
    } catch (e: any) {
      if (e) {
        openError();
        setErrorText(e.response ? e.response.data.message : "Ошибка");
      }
    }
  };

  const addFriend = async () => {
    if (friend && isAddBtn) {
      const token = localStorage.getItem(Storage.Token);
      if (token) {
        const newFriendList = [...user.friend, friend];
        const res = await changeUser(user.id, { friend: newFriendList }, token);
        if (res.status === 200) {
          dispatch(changeStateFriend(newFriendList));
          setFriend("");
          setIsAddBtn(false);
        }
      }
    }
  };

  const openError = () => {
    setIsError(true);
    setIsAddBtn(false);
  };

  const closeError = () => {
    setIsError(false);
  };

  const openSearchInput = () => {
    setOpenSearch(true);
    setIsAddBtn(false);
  };
  const closeSearchInput = () => {
    setOpenSearch(false);
  };

  return (
    <div className="search__wrapper">
      {!isFriendList ? (
        <Button onClick={() => setIsFriend(true)}>
          Показать список друзей
        </Button>
      ) : (
        <Button onClick={() => setIsFriend(false)}>
          Показать мой список дел
        </Button>
      )}
      <Popup visible={isError} onClose={closeError}>
        <p>{errorText}</p>
      </Popup>
      <div
        className={
          openSearch
            ? "search__content open"
            : isAddBtn
            ? "search__content btn"
            : "search__content"
        }
      >
        {isAddBtn && (
          <TransparentButton onClick={addFriend}>
            Добавить в друзья
          </TransparentButton>
        )}
        <p style={{ whiteSpace: "nowrap" }}>Поиск друзей</p>
        <div className="search">
          <div className="search__input-wrapper">
            <Image
              className="search__image"
              onClick={searchFriendHandler}
              src="/images/svg/search.svg"
              alt="delete"
              width={25}
              height={30}
            />
            <input
              value={friend}
              onChange={(e) => setFriend(e.target.value)}
              className="search__input"
              onFocus={openSearchInput}
              onBlur={closeSearchInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
