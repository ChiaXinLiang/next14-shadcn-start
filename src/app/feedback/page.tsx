import { Card, CardContent } from "@/components/ui/card";
import GuestbookClient from "./page.client";
import db from "@/db";
import { FeedbackEntry } from "@/components/Feedback/FeedbackEntry";




export default async function Guestbook() {
    let entries: any[] = [];
    let error = null;

    try {
        entries = await db.query.feedbackEntries.findMany({

            orderBy(fields, operators) {
                return operators.desc(fields.createdAt);
            },
            with: {
                user: true,
            },
        });
        console.log("Fetched entries:", entries);
    } catch (err) {
        console.error("Error fetching guestbook entries:", err);
        error = err;
    }

    return (
        <div className="flex justify-center flex-col items-center">
            <Card className="w-full max-w-lg">
                <CardContent className="p-6">
                    <h1 className="text-center text-5xl mb-6">Feedback Board</h1>
                    <GuestbookClient />
                    {error ? (
                        <p className="text-red-500 mt-4">Error loading Feedback Board entries. Please try again later.</p>
                    ) : (
                        entries.map((entry) => (
                            <FeedbackEntry key={entry.id} entry={entry} />
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
