import { create } from "zustand";

import { User } from "@/core/auth/interface/user";
import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";

export type AtuhStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
    status: AtuhStatus;
    token?: string;
    user?: User;

    login:(email:string, password:string) => Promise<boolean>;
    checkStatus:() => Promise<void>;
    logout:() => Promise<void>;
    changeStatus:(token?:string, user?:User) => boolean;
}

export const useAuthStore = create<AuthState>((set, get)=>({

    //properties
    status: 'checking',
    token: undefined,
    user: undefined,

    //actions
    
    changeStatus: (token?: string, user?:User) => {
        if(!token || !user){
            set({status: 'unauthenticated', token: undefined, user: undefined});
            return false;
        }
        set({
            status: 'authenticated',
            token: token,
            user: user,
        })
        
        return true;
       
    },
    
    login: async (email:string, password:string) => {

        const resp = await authLogin(email, password);
        return get().changeStatus(resp?.token, resp?.user);
    },    

    checkStatus: async () => {
        const resp = await authCheckStatus();
        get().changeStatus(resp?.token, resp?.user);
       
    },
    logout: async () => {

        set({status: 'unauthenticated', token: undefined, user: undefined});
        
    }

   
}))