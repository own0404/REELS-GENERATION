import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  pickupLocation: varchar("pickup_location", { length: 500 }),
  dropLocation: varchar("drop_location", { length: 500 }),
  goodsType: varchar("goods_type", { length: 100 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message"),
  formType: varchar("form_type", { length: 50 }).notNull().default("quote"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
