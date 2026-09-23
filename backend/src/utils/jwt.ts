import jwt, { SignOptions } from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";

export interface AccessTokenPayload {
  userId: number;
  email: string;
}

export function generateAccessToken(payload: AccessTokenPayload): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, getJwtSecret(), options);
}
export function verifyAccessToken(
  token:string
):AccessTokenPayload{
  return jwt.verify(token,getJwtSecret()) as AccessTokenPayload
}