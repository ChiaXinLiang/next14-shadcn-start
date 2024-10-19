import options from "@/config/auth";
//@ts-expect-error
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function requireAuth() {
    const session = await getServerSession(options);
    if (!session?.user) {
        redirect("/");
    }
}