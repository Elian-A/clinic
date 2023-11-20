import { pgTable, serial, integer, timestamp, bigserial, text, varchar, boolean, unique, date } from "drizzle-orm/pg-core"

export const balanceTable = pgTable("balance", {
	id: serial("id").primaryKey().notNull(),
	ingress: integer("ingress").notNull(),
	egress: integer("egress").notNull(),
	total: integer("total").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const serviceDetailTable = pgTable("service_detail", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	serviceId: integer("service_id").notNull().references(() => serviceTable.id).references(() => serviceTable.id),
	serviceType: integer("service_type").notNull(),
	professionalId: integer("professional_id").notNull().references(() => professionalTable.id).references(() => professionalTable.id),
	info: text("info"),
	price: integer("price").notNull(),
	cost: integer("cost").notNull(),
	debt: integer("debt").default(0).notNull(),
	filePath: varchar("file_path", { length: 510 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const debtTable = pgTable("debt", {
	id: serial("id").primaryKey().notNull(),
	debtorId: integer("debtor_id").notNull().references(() => professionalTable.id).references(() => professionalTable.id).references(() => patientTable.id),
	info: text("info").notNull(),
	amount: integer("amount").notNull(),
	paid: boolean("paid").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const serviceTable = pgTable("service", {
	id: serial("id").primaryKey().notNull(),
	patientId: integer("patient_id").notNull().references(() => patientTable.id),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const professionalTable = pgTable("professional", {
	id: serial("id").primaryKey().notNull(),
	firstName: varchar("first_name", { length: 50 }).notNull(),
	lastName: varchar("last_name", { length: 50 }).notNull(),
	email: varchar("email").notNull(),
	hashPassword: varchar("hash_password").notNull(),
	sessionToken: varchar("session_token", { length: 256 }).notNull(),
	specialty: varchar("specialty", { length: 100 }).notNull(),
	rpn: integer("rpn").notNull(),
	telephone: varchar("telephone", { length: 20 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default('2023-11-12 05:48:52.35594'),
},
	(table) => {
		return {
			professionalEmailKey: unique("professional_email_key").on(table.email),
		}
	});

export const patientTable = pgTable("patient", {
	id: serial("id").primaryKey().notNull(),
	firstName: varchar("first_name", { length: 50 }).notNull(),
	lastName: varchar("last_name", { length: 50 }).notNull(),
	address: varchar("address", { length: 100 }).notNull(),
	dni: integer("dni").notNull(),
	telephone: varchar("telephone", { length: 20 }),
	birthDate: date("birth_date", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
	(table) => {
		return {
			patientDniKey: unique("patient_dni_key").on(table.dni),
		}
	});
