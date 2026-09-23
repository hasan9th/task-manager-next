import { db, runtime } from "../prisma/db.js";
import { RegisterInput } from "../schema/authSchema.js";
import { mapUserRowToSafeUser, mapUserRowToUser, SafeUser, User, UserRow } from "../types/auth.js";

interface CreateUserInput {
  name: string;
  email: string;
  passwordHash: string;
}


export async function findUserByEmail(email: string): Promise<boolean> {
  const plan = db.sql.public.users
    .select("name")
    .where((f, fns) => fns.eq(f.email, email))
    .build();
  const response = await runtime.query(plan);
  return response.length > 0;
}
export async function findUserByEmailWithPassword(email:string):Promise<User|null> {
  const plan=db.sql.public.users.select( "id",
      "name",
      "email",
      "password_hash",
      "created_at",).where((f,fns)=>fns.eq(f.email,email)).build();
      const rows:UserRow[] =await runtime.query(plan);
      if (rows.length === 0) {
    return null;
  }
      return mapUserRowToUser(rows[0])||null
  
}
export async function createUser(data: CreateUserInput):Promise<SafeUser> {
  const plan = db.sql.public.users.insert([
    {
      name: data.name,
      email: data.email,
      password_hash: data.passwordHash,
    },
  ]).returning("id","email","name","created_at").build();
  const rows=await runtime.query(plan);

  if (!rows[0]) {
    throw new Error("Failed to create user");
  }
  return mapUserRowToSafeUser(rows[0]);
}
export async function getUserById(
  id: number,
): Promise<SafeUser | null> {
  const plan = db.sql.public.users
    .select(
      "id",
      "name",
      "email",
      "created_at",
    )
    .where((f, fns) => fns.eq(f.id, id))
    .build();

  const rows = await runtime.query(plan);

  if (!rows[0]) {
    return null;
  }

  return mapUserRowToSafeUser(rows[0]);
}