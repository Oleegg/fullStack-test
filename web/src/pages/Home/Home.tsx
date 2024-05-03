"use client";

import { Wrapper } from "@/components/Wrapper";
import "./Home.scss";
import { Header } from "@/components/Header";
import { Provider } from "react-redux";
import store from "@/app/store";
import { MyList } from "@/components/MyList";

export const Home = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Header />
        <MyList />
      </Wrapper>
    </Provider>
  );
};
