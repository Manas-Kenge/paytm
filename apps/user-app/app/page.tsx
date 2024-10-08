import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";
import Hero from "../components/Hero";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } 
  /*
  else {
    redirect('/api/auth/signin')
  }*/
    return (
         <div>
            <Hero />
         </div>
      )
}