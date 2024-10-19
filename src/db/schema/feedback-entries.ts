import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import users from "./users";

const feedbackEntries = pgTable("feedback_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const feedbackEntriesRelations = relations(
  feedbackEntries,
  ({ one }) => ({
    user: one(users, {
      fields: [feedbackEntries.userId],
      references: [users.id],
    }),
  })
);

export const InsertFeedbackEntrySchema = createInsertSchema(
  feedbackEntries
).omit({
  userId: true,
  createdAt: true,
});

export default feedbackEntries;