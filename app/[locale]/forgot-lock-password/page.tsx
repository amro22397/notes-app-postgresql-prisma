import { getSession } from "@/actions/getUser";
// import ForgetForm from "@/components/ForgetForm";
import { redirect } from "next/navigation";
import React from "react";
import ForgetLockForm from "./ForgetLockForm";

const page = async () => {

    

  const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(session) || '{}')


  // console.log(jUser);


    // if (session?.user?.email) {
    //   redirect('/');
    // }
        

  return (
    <div className="flex min-h-svh w-full items-center justify-center md:px-0 px-1 md:p-10
    overflow-hidden">
          <div className="w-full max:sm:w-[95vw] max-w-sm">
          <ForgetLockForm email={session?.user?.email} />
          </div>
        </div>
  )
}

export default page
