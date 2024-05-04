export type User = { id: number; name: string; email: string };
export type Item = { id: number; todo: string };
export const emptyUser = { id: 0, name: "", email: "" };

export type State = {
  isAuth: boolean;
  user: User;
  list: Item[];
};
interface Action {
  type: string;
}

export interface ChangeAuth extends Action {
  payload: boolean;
}

export interface ChangeUser extends Action {
  payload: { name?: string; email?: string };
}

export interface CreateUser extends Action {
  payload: User;
}
//------list----------

export interface StateItem extends Action {
  payload: Item;
}

export interface StateItems extends Action {
  payload: Item[];
}
export interface DeleteStateItem extends Action {
  payload: number;
}
