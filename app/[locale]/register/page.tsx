import { getSession, getUser } from "@/actions/getUser";
import { RegisterForm } from "@/components/register-form";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(session) || "{}");

  const locale = await getLocale();

  // console.log(jUser);

  const redirectTo = searchParams.redirectTo as string;

  if (session?.user?.email) {

    if (redirectTo) {
      return redirect(`${redirectTo}`);
      // we must guarantee that for example that it will start with (/)
      // ex. redirectTo = "/en/any-page"
    }

    redirect(`/${locale}/`);
  }

  // ss

  return (
    <div className="flex min-h-svh w-full items-center justify-center md:px-0 px-2 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm /* redirectTo={redirectTo} */ />
      </div>
    </div>
  );
}
