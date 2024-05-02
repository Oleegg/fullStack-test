import axios from "axios";
import getQueriesConfig from "./config";
import { AuthResponse, ChangeUser, IUserAuth, IUserRegister } from "./types";

const { clientQueryConfig } = getQueriesConfig({
  url: "http://localhost:3001/",
});

//--------------auth----------------------
export const registration = async (user: IUserRegister) => {
  const data = JSON.stringify({ ...user });
  return await clientQueryConfig.post("auth/register", data);
};

export const authorization = async (user: IUserAuth) => {
  const data = JSON.stringify({ ...user });
  return await clientQueryConfig.post(`auth/login`, data, {
    headers: {
      Authorization: "token",
    },
  });
};

export const getAuthUserData = async (token: string) => {
  try {
    return (await clientQueryConfig.get("auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    })) as AuthResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response?.data;
      }
      return error;
    }
    console.log("getAuthUserData", error);
  }
};

//--------------user----------------------
export const deleteUser = async (id: number, token: string) => {
  await clientQueryConfig.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUser = async (id: number, token: string) => {
  try {
    return await clientQueryConfig.get(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response?.data;
      }
      return error;
    }
    console.log("getUser", error);
  }
};

export const changeUser = async (
  id: number,
  user: ChangeUser,
  token: string
) => {
  const data = JSON.stringify({ ...user });

  return await clientQueryConfig.put(`/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
