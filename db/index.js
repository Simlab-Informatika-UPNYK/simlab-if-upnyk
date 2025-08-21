import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as relations from "./relations";

// Configure connection pool to prevent "too many clients" error
const client = postgres(process.env.DATABASE_URL, {
  max: parseInt(process.env.DB_POOL_MAX || '20'), // Maximum number of connections in the pool
  idle_timeout: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30'), // Close idle connections after N seconds
  connect_timeout: parseInt(process.env.DB_POOL_CONNECT_TIMEOUT || '10'), // Connection timeout after N seconds
  // Additional pool options for better management
  max_lifetime: parseInt(process.env.DB_POOL_MAX_LIFETIME || '3600'), // Maximum lifetime of a connection in seconds
  prepare: process.env.DB_POOL_PREPARE === 'true' ? true : false, // Disable prepared statements for better pool performance
});
export const db = drizzle(client, { 
  schema: { 
    ...schema, 
    ...relations 
  } 
});
