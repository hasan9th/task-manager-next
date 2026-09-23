

import { db } from "./db.js";

async function main() {
  const runtime = await db.connect();

  const plan = db.sql.public.users
    .select("id","name")
    .limit(3)
    .build();

  const rows = await db.runtime().query(plan);
  await runtime.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
