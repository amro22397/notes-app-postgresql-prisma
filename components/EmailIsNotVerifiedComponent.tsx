"use client";

import React, { useEffect, useState } from "react";
import IfYouDontRecieve from "./IfYouDontRecieve";

import { useLocale, useTranslations } from "next-intl";
// import NotVerifiedWithinOneDay from './NotVerifiedWithinOneDay';
import { Session } from "@/types/user";
import axios from "axios";

const EmailIsNotVerifiedComponent = ({
  session,
}: {
  session: Session | null;
}) => {
  // console.log(session)

  const locale = useLocale();

  const [sessionUser, setSessionUser] = useState<Session | null | undefined>(
    null
  );

  const emailIsNotVerified = useTranslations("EmailIsNotVerified");

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

  return (
    <>
    {/* <pre className="">{JSON.stringify(sessionUser, null, 2)}</pre> */}

      {!sessionUser?.user?.isVerified && sessionUser !== null && sessionUser !== undefined && (
        <div className="flex flex-col justify-center items-center md:w-[700px] sm:w-[95vw] w-[100vw]
        ">
          <div
            className="bg-red-500 text-white w-full
    lg:flex justify-center text-lg hidden
    flex-col items-center gap-0 text-center
    "
    // sm:py-0 py-10
          >
            <span className="">
              {emailIsNotVerified("Your account")}
              <span className="mx-1 underline">
                {emailIsNotVerified("is not")}
              </span>{" "}
              {emailIsNotVerified("VerifiedYetPlease")}
            </span>

            <IfYouDontRecieve email={sessionUser?.user?.email} />

            {/* <NotVerifiedWithinOneDay /> */}
          </div>

          <div
            className="bg-red-500 text-white w-full
    lg:hidden justify-center text-lg py-1 flex flex-col items-center text-center"
          >
            <span className="">{emailIsNotVerified("YourAccountIsNot")}</span>

            <IfYouDontRecieve email={sessionUser?.user?.email} />

            {/* <NotVerifiedWithinOneDay /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default EmailIsNotVerifiedComponent;
