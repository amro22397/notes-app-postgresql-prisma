import { User } from "@/models/user";
import mongoose from "mongoose";
import { getServerSession } from "next-auth"

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"


export const config = {
  providers: [], // rest of your config
} satisfies NextAuthOptions



/* export async function getSession() {
    return await getServerSession(authOptions);
  } */


export function getSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
): any | null {
  return getServerSession(...args, config)
}





export async function getUser() {

  try {
    let session = await getSession();
    console.log(session);



    if (!session?.user?.email) {
      return null;
    }

    mongoose.connect(process.env.MONGO_URL as string);
    const currentUser = await User.findOne({ email: session?.user?.email })

    if (!currentUser) {

      const user = await User.create({
        name: session?.user.name,
        email: session?.user?.email,
        image: session?.user?.image,
        isVerified: true,
      })
      session.user = user;
      // session.user._id = user._id;
      // session.user.isVerified = true;
      // session.user.createdAt = user.createdAt;
      // session.user.updatedAt = user.updatedAt;

      return session;

    } else {

      const updatedUser = await User.findOneAndUpdate({ email: session?.user?.email }, {
        name: session?.user?.name,
        image: session?.user?.image,
      })

      console.log(updatedUser)
      session.user = updatedUser;
      // session.user._id = currentUser._id;
      // session.user.isVerified = true;
      // session.user.createdAt = currentUser.createdAt;
      // session.user.updatedAt = currentUser.updatedAt;
      
      return session;
    }

  } catch (error) {

    console.log(error)
  }
}
