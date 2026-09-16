import {
  hashPassword,
  comparePassword,
} from "./password.js";

const password = "MySecret123";

const passwordHash = await hashPassword(password);

console.log("Original password:", password);
console.log("Generated hash:", passwordHash);

const correctPassword = await comparePassword(
  password,
  passwordHash
);

const incorrectPassword = await comparePassword(
  "WrongPassword",
  passwordHash
);

console.log("Correct password matches:", correctPassword);
console.log("Incorrect password matches:", incorrectPassword);