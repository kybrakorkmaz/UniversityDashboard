import {pgTable, text, timestamp, boolean, pgEnum} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {classes, enrollments} from "./app";

export const roleEnum = pgEnum('role', ['student', 'teacher', 'admin']);

const timestamps = {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
}

export const user = pgTable("user", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	...timestamps,
	role: roleEnum("role").default("student").notNull(),
	imageCldPubId: text('image_cld_pub_id'),
});

export const userRelations = relations(user, ({many}) => ({
	classes: many(classes),
	enrollments: many(enrollments)
}))

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	...timestamps,
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(()=> user.id),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(()=> user.id),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	...timestamps,
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	...timestamps,
});
