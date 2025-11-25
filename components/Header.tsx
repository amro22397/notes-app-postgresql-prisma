"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Session } from "@/types/user";

const Header = ({
  email,
  // user,
  session
}: {
  email: string | null | undefined;
  // user: Session | null | undefined;
  session: Session | null | undefined
}) => {
  const locale = useLocale();

  const pathname = usePathname();

    const [sessionUser, setSessionUser] = useState<Session | null | undefined>(null);


    const getSessionUser = async () => {
    
    const res = await axios.get(`/api/get-session-user?email=${session?.user?.email}&locale=${locale}`, {
      params: {
        session: JSON.stringify(session),
      }
    });

    // setRes(res)

    setSessionUser(res.data.data);

  }


  useEffect(() => {
      getSessionUser();
    }, []);


  console.log(sessionUser);
  console.log(email);

  return (
    <div className="flex md:flex-row flex-col
     justify-between items-center gap-2 my-3 mx-2">
      {/* <pre className="text-center">{JSON.stringify(sessionUser, null, 2)}</pre> */}
      {/* {pathname} */}
      
      {sessionUser?.user?.lockedPassword && (
        <Link
        href={`/${locale}/forgot-lock-password?redirectTo=${pathname}`}
        className="hover:underline active:scale-95 cursor-pointer">
          Forget your lock OTP ?
        </Link>
      )}

      {sessionUser?.user?.email && (
        <div className="flex flex-row justify-end items-center gap-2">
        <span className="">{email}</span>

        <Button
          onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
          className="bg-red-500 text-white cursor-pointer hover:bg-red-600 active:scale-95"
        >
          Log out
        </Button>
      </div>
      )}
    </div>
  );
};

export default Header;
