import App from '@/app/[locale]/AppApp';
// import GlobalProvier from './ContextApi';
// import NotesBluePrint from '@/notesBluePrint';
// import { connectToMongoDB } from './libs/mongodb';
import { useEffect, useState } from 'react';
import React from 'react';
import { Cinzel } from 'next/font/google';
import { getUser } from '@/actions/getUser';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import EmailIsNotVerified from '@/components/EmailIsNotVerified';

const page = async () => {

  const user = await getUser();
  const jUser = JSON.parse(JSON.stringify(user) || '{}')
   const locale = await getLocale();

 console.log(jUser)

 
  if (!jUser?.user?.email) {
    redirect(`/${locale}/register`);
  }

  return (
    <div>
      {/* <GlobalProvier> */}
      
      <EmailIsNotVerified session={jUser} />
        <App email={jUser?.user?.email} user={jUser}/>
        <Header email={jUser?.user?.email} user={jUser} />
        <></>
      {/* </GlobalProvier> */}
    </div>
  )
}

export default page
