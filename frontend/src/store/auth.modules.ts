import { login, logout } from '../services/authServices';
import { User } from "../interfaces/User";
import { createUser } from '../services/userServices';
import { AuthState } from '../interfaces/AuthStates';


const userJSON = localStorage.getItem('user');
const user: User | null = userJSON ? JSON.parse(userJSON) : null;


const initialState: AuthState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

// Exporta el módulo de autenticación para su uso en Vuex
export const auth = {
  namespaced: true, // Indica que el módulo es independiente y puede ser utilizado en otros módulos
  state: initialState,
  actions: {
    // Autenticación del usuario
    async login({ commit }: any, user: User) {
      try {
        const loggedInUser = await login(user);
        // Ejecuta la mutación para actualizar el estado
        commit('loginSuccess', loggedInUser);
        return loggedInUser;
      } catch (error) {
        //Autenticación fallida
        commit('loginFailure'); 
        throw error;
      }
    },
    
    logout({ commit }: any) {
      logout(); 
      commit('logout');
    },
   
    async register({ commit }: any, user: User) {
      try {
        const registerUser = await createUser(user);
        // Registro exitoso
        commit('registerSuccess',registerUser);       
        return registerUser;
      } catch (error) {
        commit('registerFailure');
        throw error;
      }
    },
  },
  mutations: {
    // Autenticación exitosa
    loginSuccess(state: AuthState, user: User) {
      state.status.loggedIn = true;
      state.user = user;
    },
    // Autenticación fallida
    loginFailure(state: AuthState) {
      state.status.loggedIn = false;
      state.user = null;
    },
    // Mutación para cerrar sesión
    logout(state: AuthState) {
      state.status.loggedIn = false;
      state.user = null;
    },
    // Mutación registro exitoso
    registerSuccess(state: AuthState) {
      state.status.loggedIn = false;
    },
    // Mutación registro fallido
    registerFailure(state: AuthState) {
      state.status.loggedIn = false;
    },
  },
};