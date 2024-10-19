import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FeedbackEntryProps {
  entry: {
    id: string;
    message: string;
    createdAt: string;
    user: {
      name: string;
      image: string;
    };
  };
}

export function FeedbackEntry({ entry }: FeedbackEntryProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage src={entry.user.image} alt={entry.user.name} />
          <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{entry.user.name}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(entry.createdAt).toLocaleString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{entry.message}</p>
      </CardContent>
    </Card>
  );
}