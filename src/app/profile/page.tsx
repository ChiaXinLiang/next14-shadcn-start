import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import options from "@/config/auth";
//@ts-expect-error
import { getServerSession } from "next-auth";
import requireAuth from "@/utils/require-auth";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
  initials: string;
  role: string;
  bio: string;
}

const UserCard = ({ user }: { user: User }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </CardHeader>
    </Card>
  )
}

export default async function Profile() {
  await requireAuth();
  const session = await getServerSession(options)!;

  if (!session || !session.user) {
    return <div>Please sign in to view your profile.</div>;
  }

  const user: User = {
    name: session.user?.name || 'User',
    email: session.user?.email || 'No email available',
    avatarUrl: session.user?.image || '',
    initials: session.user?.name ? session.user?.name[0].toUpperCase() : 'U',
    role: 'Member',
    bio: 'No bio available.',
  };

  return <UserCard user={user} />;
}