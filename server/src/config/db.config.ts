import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { PrismaClient } from "@prisma/client";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "postgresql://ss1ngh:shorten@localhost:5432/ss1ngh?schema=public";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool as any);

export const prisma = new PrismaClient({ adapter });
