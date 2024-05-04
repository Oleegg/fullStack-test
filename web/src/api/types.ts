export interface IUserAuth {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

export type ChangeUser = {
  email?: string;
  name?: string;
  password?: string;
};

export type AuthResponse = {
  id: number;
  name: string;
  email: string;
  token: string;
};
//----------list--------------
