import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import {
  Case,
  OnRampTransactions,
} from "../../../components/OnRampTransactions";

async function p2pTransferDetails() {
    const session = await getServerSession(authOptions);
  
    const txns = await prisma.p2pTransfer.findMany({
      where: {
        fromUserId: Number(session?.user?.id),
      },
    });
  
    return txns.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      case: "Debit" as Case,
    }));
  }
  
  export default async function () {
    const transactions = await p2pTransferDetails();
    return (
      <div>
        <div className="text-4xl text-amber-500 pt-8 mb-8 font-bold">Transactions</div>
        <div className="flex items-center">
          <OnRampTransactions transactions={transactions}></OnRampTransactions>
        </div>
      </div>
        );
    }