import { productsApi } from "../api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}

const returnUserToken= (data: AuthResponse): {
    user: User;
    token: string;
} => {
    // const { id, email, fullName, isActive, roles, token } = data;
    const { token , ...user} = data;
    // const user: User={
    //     id,
    //     email,
    //     fullName,
    //     isActive,
    //     roles,
    // }
    return{
        user,
        token,
    }
};

// In auth-actions.ts
export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();
  try {
    const response = await productsApi.post<AuthResponse>('/auth/login', { email, password });
    
    return returnUserToken(response.data);
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export const authCheckStatus = async()=>{
    try {

        const {data} = await productsApi.get<AuthResponse>('/auth/check-status');
        return returnUserToken(data);
        
    } catch (error) {
        return null;
        
    }
}
