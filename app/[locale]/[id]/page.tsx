import React from 'react'
import App from '../AppApp'
import { getSession, getUser } from '@/actions/getUser';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

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
    <App email={session?.user?.email} /* user={sessionUser} */ session={session} />
  )
}

export default page