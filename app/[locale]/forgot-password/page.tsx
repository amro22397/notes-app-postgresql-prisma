import { getSession } from "@/actions/getUser";
import ForgetForm from "@/components/ForgetForm";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

    

  // const session = await getUser();
  // const jUser = JSON.parse(JSON.stringify(session) || '{}')

  const locale = await getLocale();

  const session = await getSession();

  const redirectTo = searchParams.redirectTo as string;


  // console.log(jUser);


    if (session?.user?.email) {

    if (redirectTo) {
      return redirect(`${redirectTo}`);
      // we must guarantee that "redirectTo" for example that it will start with (/)
      // ex. redirectTo = "/en/any-page"
    }

    redirect(`/${locale}/`);
  }
        

  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center md:px-0 px-1 md:p-10
    overflow-hidden">
          <div className="w-full max:sm:w-[95vw] max-w-sm">
          <ForgetForm redirectTo={redirectTo} /* session={session} */ />
          </div>
        </div>
  )
}

export default page
