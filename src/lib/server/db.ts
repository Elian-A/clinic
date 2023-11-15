import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres('postgres://root:1234@localhost:5432/clinic', { max: 1 });
//await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' });

const queryClient = postgres('postgres://root:1234@localhost:5432/clinic');
export const db = drizzle(queryClient, { schema });
