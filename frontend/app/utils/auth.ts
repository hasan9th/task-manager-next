'use client'
import { authMe } from "../services/authService";

export interface AuthUser{
    id:number;
    name:string;
    email:string;
    createAt:string;
}
export interface LoginResponse{
    user:AuthUser;
    token:string;
}

const TOKEN_KEY = "taskflow_access_token";

export async function getMe(){
  const data:{ user: AuthUser }=await authMe()
   return data;
}
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}