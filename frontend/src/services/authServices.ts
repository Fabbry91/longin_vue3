import { AxiosResponse } from "axios";
import axios from "./config"
import { LoginUser } from "../interfaces/LoginUser";

export const login = async (user: LoginUser): Promise<AxiosResponse> =>
  await axios.post("/auth/login", user).then((resp: any) => {
    if (resp.data.token) {
      localStorage.setItem('user', JSON.stringify(resp.data));
    }
    return resp.data;
  });

  export const logout=()=> {
    localStorage.removeItem('user');
  }