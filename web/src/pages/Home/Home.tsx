import { Wrapper } from "@/components/Wrapper";
import "./Home.scss";
import { Header } from "@/components/Header";
import { MyList } from "@/components/MyList";

export const Home = () => {
  return (
    <Wrapper>
      <MyList />
    </Wrapper>
  );
};
