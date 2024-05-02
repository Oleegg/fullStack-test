export type State = {
  auth: { isAuth: boolean };
};

export type ChangeAction = {
  payload: boolean;
  type: string;
};
