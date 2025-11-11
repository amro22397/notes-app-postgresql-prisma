"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import { Session } from "@/types/session";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = ({
  email,
  user,
}: {
  email: string | null | undefined;
  user: Session | null | undefined;
}) => {
  const locale = useLocale();

  const pathname = usePathname();

  console.log(user);
  console.log(email);

  return (
    <div className="flex md:flex-row flex-col
     justify-between items-center gap-2 my-3 mx-2">
      {/* {pathname} */}
      {user?.lockedPassword && (
        <Link
        href={`/${locale}/forgot-lock-password?redirectTo=${pathname}`}
        className="hover:underline active:scale-95 cursor-pointer">
          Forget your lock OTP ?
        </Link>
      )}

      <div className="flex flex-row justify-end items-center gap-2">
        <span className="">{email}</span>

        <Button
          onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
          className="bg-red-500 text-white cursor-pointer hover:bg-red-600 active:scale-95"
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Header;
