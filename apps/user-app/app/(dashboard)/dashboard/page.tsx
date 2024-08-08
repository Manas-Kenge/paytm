// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Card } from "@repo/ui/card";

async function getUser() {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.user?.id)
        }
    });
    return {
        name: user?.name || "",
        email: user?.email || ""
    }
}

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0
    }
}

export default async function () {
    const user = await getUser();
    const balance = await getBalance();

    return (
        <div className="grid h-auto w-full grid-cols-2 gap-6 bg-muted/40 p-4">
            <Card title="Your Account">
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <div className="text-sm font-medium text-muted-foreground">Username</div>
                        <div className="text-2xl font-semibold">{user.name}</div>
                    </div>
                    <div className="grid gap-2">
                        <div className="text-sm font-medium text-muted-foreground">Email Address</div>
                        <div className="text-2xl font-semibold">{user.email}</div>
                    </div>
                </div>
            </Card>
            <Card title="Available Balance">
                <div className="grid gap-6 py-4">
                <div className="text-4xl font-semibold">{balance.amount/100}</div>
                <div className="text-sm font-medium text-muted-foreground">As of June 30, 2023</div>
                </div>
            </Card>
        </div>
    )
}