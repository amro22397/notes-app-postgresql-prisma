import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { email, jUser } = await req.json();


    try {
        

        const currentUser = await prisma.user.findUnique({
      where: { email: email }
    })


    if (!currentUser) {
    
          // await User.create({
          //   name: session?.user.name,
          //   email: session?.user?.email,
          //   image: session?.user?.image,
          //   isVerified: true,
          // })
    
          const user = await prisma.user.create({
            data: {
              name: jUser?.user.name,
              email: jUser?.user?.email,
              image: jUser?.user?.image,
              isVerified: true,
            }
          })
    
          console.log(user)
          // session.user = user;
          // session.user._id = user._id;
          // session.user.isVerified = true;
          // session.user.createdAt = user.createdAt;
          // session.user.updatedAt = user.updatedAt;

          return NextResponse.json({
            success: true
          })
    
        } else {
    
          // const updatedUser = await User.findOneAndUpdate({ email: session?.user?.email }, {
          //   name: session?.user?.name,
          //   image: session?.user?.image,
          // })
    
          const updatedUser = await prisma.user.update({
            where: { email: email },
            data: {
              name: jUser?.user?.name,
              image: jUser?.user?.image,
            }
          })
    
          console.log(updatedUser)
          // session.user = updatedUser;
          // session.user._id = currentUser._id;
          // session.user.isVerified = true;
          // session.user.createdAt = currentUser.createdAt;
          // session.user.updatedAt = currentUser.updatedAt;

          return NextResponse.json({
            success: true
          })
        }


    } catch (error) {
        
        console.log(`Server Error editing user with session: ${error} `)

        throw new Error(`Server Error editing user with session: ${error}`)
    }
}