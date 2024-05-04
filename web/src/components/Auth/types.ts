import { Dispatch, SetStateAction } from "react";
import { Auth } from "../Header/types";

export enum Storage {
  Token = "token",
}

export type AuthProps = {
  onClose: () => void;
  setAuthType: Dispatch<SetStateAction<Auth.Authoris | Auth.Register>>;
};
