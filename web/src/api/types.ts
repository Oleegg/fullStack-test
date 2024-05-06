export interface IUserAuth {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  nickname: string;
  password: string;
}

export type ChangeUser = {
  name?: string;
  nickname?: string;
  password?: string;
  list?: string[];
  friend?: string[];
};

export type AuthResponse = {
  id: number;
  name: string;
  email: string;
  nickname: string;
  token: string;
};
//----------list--------------
export type ChangeUserList = {
  list: string;
};
