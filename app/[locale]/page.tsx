// import App from '@/app/[locale]/AppApp';

// import GlobalProvier from './ContextApi';
// import NotesBluePrint from '@/notesBluePrint';
// import { connectToMongoDB } from './libs/mongodb';
// import { useEffect, useState } from 'react';
import React from 'react';
// import { Cinzel } from 'next/font/google';
import { getSession } from '@/actions/getUser';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
// import Header from '@/components/Header';
// import EmailIsNotVerified from '@/components/EmailIsNotVerified';
// import prisma from '@/lib/prisma';
import AppAppLists from './AppAppLists';
// import GoToNormalPage from '@/components/GoToNormalPage';

const page = async () => {

  const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(user) || '{}')
   const locale = await getLocale();

 console.log(session)

 
  if (!session?.user?.email) {
    redirect(`/${locale}/register`);
  }

  // const sessionUser = await prisma.user.findUnique({
  //   where: { email: jUser?.user?.email }
  // })

  return (
    <div>
      {/* <GlobalProvier> */}
      
      {/* {JSON.stringify(sessionUser, null, 2)} */}
      {/* <EmailIsNotVerified session={sessionUser} /> */}

      {/* <GoToNormalPage /> */}

        {/* <App email={jUser?.user?.email} user={sessionUser} /> */}
        <AppAppLists email={session?.user?.email} session={session} /* user={sessionUser} */ />
        {/* <Header email={jUser?.user?.email} user={sessionUser} /> */}
        <></>
      {/* </GlobalProvier> */}
    </div>
  )
}

export default page
