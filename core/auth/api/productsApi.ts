import axios from 'axios';
import { Platform } from 'react-native';

//TODO: CONECTAR MEDIANT ENV VARS, ANCROID E IOS

const STAGE = process.env.EXPO_PUBLIC_STAGE || 'dev';
export const API_URL = (STAGE === 'prod') 
? process.env.EXPO_PUBLIC_API_URL 
: (Platform.OS === 'ios' 
    ?  process.env.EXPO_PUBLIC_API_URL_IOS 
    : process.env.EXPO_PUBLIC_API_URL_ANDROID);


console.log({STAGE, [Platform.OS]:API_URL});

const productsApi= axios.create({
    baseURL: API_URL,
})

//TODO: INTERCEPTORS PARA AUTH Y REFRESH TOKEN

export {productsApi}