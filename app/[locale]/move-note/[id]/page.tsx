import { getSession, getUser } from "@/actions/getUser";
import MoveNoteId from "./MoveNoteId"
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";


const page = async () => {

    const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(user) || '{}')
   const locale = await getLocale();

//  console.log(jUser)

 
  if (!session?.user?.email) {
    redirect(`/${locale}/register`);
  }

  // const sessionUser = await prisma.user.findUnique({
  //   where: { email: jUser?.user?.email }
  // })


  return (
    <MoveNoteId email={session?.user?.email} session={session} /* user={sessionUser} */ />
  )
}

export default page