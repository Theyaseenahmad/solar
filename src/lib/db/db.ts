import dotenv from "dotenv";
dotenv.config();

import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryString = process.env.DATABASE_URI as string;
export const connection = postgres(queryString as string)

export const db = drizzle(connection)