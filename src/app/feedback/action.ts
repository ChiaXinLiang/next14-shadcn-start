"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
//@ts-expect-error
import { getServerSession } from "next-auth";

import options from "@/config/auth";
import db from "@/db";
import feedbackEntries, {
  InsertFeedbackEntrySchema,
} from "@/db/schema/feedback-entries";
import requireAuth from "@/utils/require-auth";

export async function createFeedbackEntry(
  prevState: unknown,
  formData: FormData
) {
  await requireAuth();
  const submission = parseWithZod(formData, {
    schema: InsertFeedbackEntrySchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const session = (await getServerSession(options))!;

  await db.insert(feedbackEntries).values({
    userId: session.user.id,
    message: submission.value.message,
  });

  revalidatePath("/feedback");
  redirect("/feedback");
}