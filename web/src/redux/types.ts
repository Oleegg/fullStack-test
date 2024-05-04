export type User = { id: number; name: string; email: string };

export const emptyUser = { id: 0, name: "", email: "" };

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
  payload: { name?: string; email?: string };
}

export interface CreateUser extends Action {
  payload: User;
}
