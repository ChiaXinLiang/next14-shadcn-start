"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { createFeedbackEntry } from "./action";
import { useForm } from '@conform-to/react';
import { InsertFeedbackEntrySchema } from "@/db/schema/feedback-entries";


export default function FeedbackClient() {
    const [lastResult, action] = useFormState(createFeedbackEntry, undefined);
    const [form, fields] = useForm({
    //   Sync the result of last submission
      lastResult,
  
      // Reuse the validation logic on the client
      onValidate({ formData }) {
        return parseWithZod(formData, { schema: InsertFeedbackEntrySchema });
      },
  
      // Validate the form on blur event triggered
      shouldValidate: 'onBlur',
      shouldRevalidate: 'onInput',
    });
    return (                    
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <Label htmlFor={fields.message.name}>Message</Label>
        <Textarea 
            id={fields.message.name}
            key={fields.message.key}
            name={fields.message.name}
            placeholder="Leave a comment" 
            className="w-full"
            aria-invalid={!fields.message.valid}
            aria-describedby={fields.message.errorId}
        />
        {fields.message.errors && (
            <div id={fields.message.errorId} className="text-red-500 text-sm mt-1">
                {fields.message.errors}
            </div>
        )}
        <Button type="submit" className="mt-2">Create</Button>
    </form>)
}