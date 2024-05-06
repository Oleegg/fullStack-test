export type User = {
  id: number;
  name: string;
  email: string;
  nickname: string;
  friend: string[];
  list: string[];
};
interface Todo {
  todo: string;
}

export const emptyUser = {
  id: 0,
  name: "",
  email: "",
  nickname: "",
  friend: <string[]>[],
  list: <string[]>[],
};

export type State = {
  isAuth: boolean;
  user: User;
};
interface Action {
  type: string;
}

export interface ChangeAuth extends Action {
  payload: boolean;
}

export interface ChangeUser extends Action {
  payload: { name?: string; email?: string; nickname?: string };
}

export interface CreateUser extends Action {
  payload: User;
}
//------------list-----------

export interface AddStateList extends Action {
  payload: string;
}
export interface ChangeStateList extends Action {
  payload: string[];
}
//------------Friend-----------------

export interface AddStateFriend extends Action {
  payload: string;
}
