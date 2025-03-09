import dotenv from "dotenv";
dotenv.config();

import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    schema:"./src/lib/db/schema.ts",
    out:"./drizzle",
    dialect:"postgresql",
    dbCredentials:{
        url:process.env.DATABASE_URI as string,
        ssl: true,
    }
})