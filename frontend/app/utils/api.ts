import { getToken } from "./auth";

export async function apiFetch(input:RequestInfo|URL,init:RequestInit={}):Promise<Response>{
    const token=getToken();
    const headers=new Headers(init.headers)
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
    return await fetch(input, {...init,headers});
     
}