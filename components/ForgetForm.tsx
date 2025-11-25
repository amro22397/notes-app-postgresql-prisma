"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
// import { toast } from '@/hooks/use-toast'
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, LoaderCircle } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";
// import { Session } from "@/types/user";
// import { useRouter } from "next/navigation";

const ForgetForm = ({ redirectTo, /* session */ }: {
  redirectTo: string | undefined | null,
  // session: Session | null | undefined
}) => {
  const [email, setEmail] = useState("");
  const [emailIfyouDidnt, setEmailIfyouDidnt] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ifYouDidnt, setIfYouDidnt] = useState(false);

  const [ifYouDidntLoading, setIfYouDidntLoading] = useState(false);

      // const [sessionUser, setSessionUser] = useState<Session | null | undefined>(null);
  

  // const router = useRouter();
  console.log(redirectTo)

  const locale = useLocale();
  // const router = useRouter();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {
      const res = await axios.post("/api/forget-password", { email, locale });

      if (!res.data.success) {
        // toast({
        //   variant: "destructive",
        //   title: res.data.message
        // })
        toast.error(`${res.data.message}`);
        setLoading(false);
        return;
      }

      if (res.data.success) {
        try {
          const forgetEmailRes = await axios.post("/api/send-forget-email", {
            email: email,
            subject: locale === "en" ? "Reset Password" : "إعادة تعيين كلمة السر",
            locale: locale,
            // message: VerifyEmailTemplate(),
          });

          console.log(forgetEmailRes);

          setLoading(false);

          if (!forgetEmailRes.data.success) {
            toast.error(
              locale === "en" 
              ? `Sending reset email error: ${forgetEmailRes.data.message}`
              : `خلل في إرسال رسالة إعادة تعيين كلمة السر: ${forgetEmailRes.data.message}`
            );
            setLoading(false);
            return;
          }
        } catch (error: any) {
          console.log(
            locale === "en" 
              ? `Client error in sending reset email: ${error.message}`
              : `خلل من الواجهة الأمامية في إرسال رسالة إعادة تعيين كلمة السر: ${error.message}`
          );

          setLoading(false);

          // toast({
          //   title: `Error sending verification email: ${error.message}`,
          // })
          toast.error(
            locale === "en" 
              ? `Client error in sending reset email: ${error.message}`
              : `خلل من الواجهة الأمامية في إرسال رسالة إعادة تعيين كلمة السر: ${error.message}`
          );
          return;
        }
      }

      if (res.data.success) {
        // toast({
        //   className: "bg-green-500 text-white",
        //   title: res.data.message
        // })
        toast.success(`${res.data.message}`);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      // toast({
      //   variant: "destructive",
      //   title: `${error}`
      // })
      toast.error(`${error}`);
      setLoading(false);
    }

    setEmail("");
    setLoading(false);
    setIfYouDidnt(true);
  };

  const forgetPage = useTranslations("ForgetPage");

  const ResendForgetEmail = async () => {
    setIfYouDidntLoading(true);

    try {
      const res = await axios.post("/api/sendEmailForgetGmail", {
        email: emailIfyouDidnt,
        subject: locale === "en" ? "Reset Password" : "إعادة تعيين كلمة السر",
        locale: locale,
      });

      if (!res.data.success) {
        toast.error(`${res.data.message}`);
        setIfYouDidntLoading(false);
      }

      if (res.data.success) {
        toast.success(`${res.data.message}`);
        setIfYouDidntLoading(false);
      }
    } catch (error: any) {
      console.log(
        locale === "en"
        ? `Sending reset password email client error: ${error.message}`
        : `خلل من الواجهة الأمامية في إرسالة رسالة إعادة تعيين كلمة السر: ${error.message}`
      );
      toast.error(
        locale === "en"
        ? `Sending reset password email client error: ${error.message}`
        : `خلل من الواجهة الأمامية في إرسالة رسالة إعادة تعيين كلمة السر: ${error.message}`
      );
      setIfYouDidntLoading(false);
    }
  };




  // const getSessionUser = async () => {
    
  //   const res = await axios.get(`/api/get-session-user?email=${session?.user?.email}&locale=${locale}`, {
  //     params: {
  //       session: JSON.stringify(session),
  //     }
  //   });

  //   // setRes(res)

  //   setSessionUser(res.data.data);

  // }


  // useEffect(() => {
  //     getSessionUser();
  //   }, []);


  //   useEffect(() => {
  //     if (sessionUser && sessionUser?.user?.email) {

  //   if (redirectTo) {
  //     return router.push(`${redirectTo}`);
  //     // we must guarantee that "redirectTo" for example that it will start with (/)
  // //     // ex. redirectTo = "/en/any-page"
  //   }

  //   router.push(`/${locale}/`);
  // }
  //   }, [sessionUser]);

  //

  return (
    <Card
      className="flex flex-col justify-center items-start
    bg-zinc-200/55 shadow-md dark:bg-zinc-600 dark:shadow-md"
      // w-[350px] mx-auto
    >
      <CardHeader>
        <CardTitle className="text-2xl dark:text-white">
          {forgetPage("Forgot Password")}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-white">
          {forgetPage("Enter your email")}
          <br />
          {forgetPage("SendYouReset")}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row w-full items-center justify-between gap-2 "
        >
          <Input
            type="email"
            placeholder={forgetPage("Email")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailIfyouDidnt(e.target.value);
            }}
            required
            className="placeholder-gray-700 dark:placeholder-gray-100"
          />

          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-500/95 active:bg-green-500/90 text-white"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              forgetPage("Send")
            )}
          </Button>
        </form>

        {ifYouDidnt && (
          <div
            className={`mt-3 text-sm text-orange-600 dark:text-yellow-400
          w-full ${ifYouDidntLoading && "flex flex-row items-center justify-center"}`}
          >
            <span className="">{forgetPage("IfYouDidntRecieve")}</span>
            {ifYouDidntLoading ? (
              <LoaderCircle className="animate-spin" size={35} />
            ) : (
              <span
                className={`ml-1 text-indigo-600 dark:text-indigo-200
      hover:underline active:text-indigo-700 dark:active:text-indigo-300 cursor-pointer
      ${locale === "ar" && "mr-1"}`}
                onClick={ResendForgetEmail}
              >
                {forgetPage("click here")}
              </span>
            )}
          </div>
        )}

        {message && <p className="text-sm text-red-500 mt-4">{message}</p>}
      </CardContent>

      <CardFooter>
        <Link
          href={`/${locale}/login`}
          className="text-sm hover:underline active:text-gray-600"
        >
          {forgetPage("Back to sign in")}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgetForm;
