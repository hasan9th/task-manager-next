import { string } from "zod";

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}
export interface User extends SafeUser{
  passwordHash:string
}
export interface UserSafeRow {
  id: number;
  name: string;
  email: string;
  created_at: string;
}
export interface UserRow extends UserSafeRow{
  password_hash:string;

}
export function mapUserRowToSafeUser(row: UserSafeRow):SafeUser {
  return{
    id:row.id,
    name:row.name,
    email:row.email,
    createdAt:row.created_at
  }
}

export function mapUserRowToUser(row: UserRow):User {
  return{
    id:row.id,
    name:row.name,
    email:row.email,
    passwordHash:row.password_hash,
    createdAt:row.created_at
  }
}