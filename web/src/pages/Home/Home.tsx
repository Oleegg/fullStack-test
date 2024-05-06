import { Wrapper } from "@/components/Wrapper";
import "./Home.scss";
import { MyList } from "@/components/MyList";
import { Search } from "@/components/Search";
import { useState } from "react";
import { Friend } from "@/components/Friend";

export const Home = () => {
  const [isFriend, setIsFriend] = useState(false);
  return (
    <Wrapper>
      <Search setIsFriend={setIsFriend} isFriendList={isFriend} />
      {isFriend ? <Friend /> : <MyList />}
    </Wrapper>
  );
};
