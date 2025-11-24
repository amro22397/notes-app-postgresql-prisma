"use client";

import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "sonner";
import NotVerifiedWithinOneDay from "./NotVerifiedWithinOneDay";

const IfYouDontRecieve = ({ email }: { email: string | null | undefined }) => {
  const emailIsNotVerified = useTranslations("EmailIsNotVerified");
  const locale = useLocale();
  console.log(email, locale);

  const [loading, setLoading] = useState(false);

  const sendEmailAgain = async () => {
    console.log(email, locale);

    // PostMark

    // try {
    //   await axios.post("/api/basic-email", {
    //     email,
    //     subject: 'Verfiy your Email',
    //     locale: locale,

    //   })
    // } catch (error: any) {
    //   //
    //   console.log(`ClientError: ${error.message}`);
    // }

    setLoading(true);

    try {
      const res = await axios.post("/api/sendEmailGmail", {
        email: email,
        subject: locale === "en" ? "Verfiy your Email" : "التأكد من صحة البريد الإلكتروني",
        locale: locale,
      });

      console.log(res);

      if (!res.data.success) {
        toast.error(`${res.data.message}`);
        setLoading(false);
      }

      if (res.data.success) {
        toast.success(`${res.data.message}`);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(
        locale === "en"
          ? `Sending verify email client error: ${error.message}`
          : `خلل من الواجهة الأمامية في إرسال رسالة تأكيد البريد الإلكتروني: ${error.message}`
      );
      toast.error(
        locale === "en"
          ? `Sending verify email client error: ${error.message}`
          : `خلل من الواجهة الأمامية في إرسال رسالة تأكيد البريد الإلكتروني: ${error.message}`
      );
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div
      className="bg-red-500 text-white w-full
    justify-center text-lg text-center flex flex-wrap"
    >
      {emailIsNotVerified("IfYouHaveNotRecieved")}
      {loading ? (
        <LoaderCircle
          className={`animate-spin ml-[6px] mr-1
        ${locale === "ar" && "mr-[6px] ml-1"}`}
        />
      ) : (
        <span
          className={`ml-[6px] text-indigo-200
          hover:underline active:text-indigo-300 cursor-pointer
          ${locale === "ar" && "mr-[6px]"}`}
          onClick={sendEmailAgain}
        >
          {emailIsNotVerified("click here")}.
        </span>
      )}
      <NotVerifiedWithinOneDay />
    </div>
  );
};

export default IfYouDontRecieve;
