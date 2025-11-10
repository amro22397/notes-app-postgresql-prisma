import { getUser } from "@/actions/getUser";
import MoveNoteId from "./MoveNoteId"
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";


const page = async () => {

    const user = await getUser();
  const jUser = JSON.parse(JSON.stringify(user) || '{}')
   const locale = await getLocale();

 console.log(jUser)

 
  if (!jUser?.user?.email) {
    redirect(`/${locale}/register`);
  }

  const sessionUser = await prisma.user.findUnique({
    where: { email: jUser?.user?.email }
  })


  return (
    <MoveNoteId email={jUser?.user?.email} user={sessionUser} />
  )
}

export default page