import { User } from "../interfaces/User";
import { authHeader } from "./auth-header";
import axios  from "./config"
import { AxiosResponse } from "axios";

export const createUser = async (user: any): Promise<AxiosResponse> => {
    const userData: User = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      about_me:user.aboutMe
    };
    // Retorna la promesa resultante de axios.post
    return await axios.post("/auth/register", userData);
  };

export const deleteUsers = async(id:string):Promise<AxiosResponse>=> {
  return await axios.delete(`/users/${id}`);
}
export const getUsers = async():Promise<AxiosResponse>=> await axios.get('/users');

export const getUser = async( id: string):Promise<AxiosResponse>=>  {
  return await axios.get(`/users/${id}`);
}
export const updateUser = async( id: any, user:User):Promise<AxiosResponse>=> {
  const userTem : any={
    ...user
  }
  delete userTem.password,
  delete userTem.created_at

  return await axios.patch(`/users/${id}`,user);
}