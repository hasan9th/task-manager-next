import { LoginData } from "../schema/authSchema";
import { apiFetch } from "../utils/api";
import { AuthUser, LoginResponse, saveToken } from "../utils/auth";

export async function login(loginData: LoginData): Promise<LoginResponse|null> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      },
    );
    if (!response.ok) {
      throw new Error("Login failed");
      
    }
      if (response.status === 401) {
    return null;
  }
    const data: LoginResponse = await response.json();
    saveToken(data.token);
    return data;
  
}

export async function authMe():Promise<{user:AuthUser}> {
const response=await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`)
if(!response.ok){throw new Error("!!!")}
return await response.json()
} 