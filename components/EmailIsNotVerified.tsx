// 'use client'

// import { getSession, getUser } from "@/actions/getUser";
// import { User } from "@/models/user";
// import mongoose from "mongoose";
import React from "react";
// import IfYouDontRecieve from "./IfYouDontRecieve";

// import { useTranslations } from 'next-intl' 
// import { Session } from "@/types/session";
import EmailIsNotVerifiedComponent from "./EmailIsNotVerifiedComponent";
// import prisma from "@/lib/prisma";
import { getLocale } from "next-intl/server";
import { getSession } from "@/actions/getUser";
// import { getUser } from "@/actions/getUser";
// import { getSession } from "next-auth/react";


const EmailIsNotVerified = async () => {
  // const session = await getUser();
  // console.log(session?.user);

  // mongoose.connect(process.env.MONGO_URL as string);
  // const user = await User.findOne({ email: session?.user?.email });
  // console.log(user)

  const locale = await getLocale();
  console.log(locale)

  const session = await getSession();

//   const user = await getUser();
//  const jUser = JSON.parse(JSON.stringify(user) || '{}')

 if (!session?.user?.email) {
  return <></>
 }

  // const sessionUser = await prisma?.user?.findUnique({
  //   where: { email: jUser?.user?.email }
  // })

  return (
    <EmailIsNotVerifiedComponent session={session} />
  );
};

export default EmailIsNotVerified;
