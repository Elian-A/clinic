import type { Config } from 'drizzle-kit';

const config: Config = {
	schema: './src/lib/schema/*',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		host: "localhost",
		connectionString: "postgres://root:1234@localhost:5432/clinic"
	}
};

export default config;
