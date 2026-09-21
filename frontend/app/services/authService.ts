import { LoginData } from "../schema/authSchema";
import { LoginResponse, saveToken } from "../utils/auth";

export async function login(loginData: LoginData): Promise<LoginResponse|null> {
  try {
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
    const data: LoginResponse = await response.json();
    saveToken(data.token);
    return data;
  } catch (error) {
    console.log(error);
    return null
  }
}
