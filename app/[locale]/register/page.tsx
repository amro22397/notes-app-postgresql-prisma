
import { getSession, getUser } from "@/actions/getUser";
import { RegisterForm } from "@/components/register-form"
import { redirect } from "next/navigation";
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default async function Page() {

  const session = await getUser();
  const jUser = JSON.parse(JSON.stringify(session))

      console.log(jUser);
    
    
        if (jUser?.user?.email) {
          redirect('/');
        }



  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}
