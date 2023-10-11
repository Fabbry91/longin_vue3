import { User } from "./User";

// Definición de la forma en que se almacenan los datos de autenticación y usuario
export interface AuthState {
    status: {
        loggedIn: boolean; 
    };
    user: User | null; 
}