import { useEffect, useState } from "react";
import "./Search.scss";
import Image from "next/image";

export const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [friend, setFriend] = useState("");

  function searchFriend() {
    if (friend) {
      console.log(friend);
    }
  }

  return (
    <div className={openSearch ? "search__wrapper open" : "search__wrapper"}>
      <p style={{ whiteSpace: "nowrap" }}>Поиск друзей</p>
      <div className="search">
        <div className="search__input-wrapper">
          <Image
            className="search__image"
            onClick={searchFriend}
            src="/images/svg/search.svg"
            alt="delete"
            width={25}
            height={30}
          />
          <input
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
            className="search__input"
            onFocus={() => setOpenSearch(true)}
            onBlur={() => setOpenSearch(false)}
          />
        </div>
      </div>
    </div>
  );
};
