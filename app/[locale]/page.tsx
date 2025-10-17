import App from '@/app/[locale]/AppApp';
// import GlobalProvier from './ContextApi';
// import NotesBluePrint from '@/notesBluePrint';
// import { connectToMongoDB } from './libs/mongodb';
// import { useEffect, useState } from 'react';
import React from 'react';
// import { Cinzel } from 'next/font/google';
import { getUser } from '@/actions/getUser';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import EmailIsNotVerified from '@/components/EmailIsNotVerified';
import prisma from '@/lib/prisma';

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
    <div>
      {/* <GlobalProvier> */}
      
      {/* {JSON.stringify(sessionUser, null, 2)} */}
      <EmailIsNotVerified session={sessionUser} />
        <App email={jUser?.user?.email} user={sessionUser}/>
        <Header email={jUser?.user?.email} user={sessionUser} />
        <></>
      {/* </GlobalProvier> */}
    </div>
  )
}

export default page
