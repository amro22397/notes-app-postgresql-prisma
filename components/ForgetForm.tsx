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

const ForgetForm = () => {
  const [email, setEmail] = useState("");
  const [emailIfyouDidnt, setEmailIfyouDidnt] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ifYouDidnt, setIfYouDidnt] = useState(false);

  const [ifYouDidntLoading, setIfYouDidntLoading] = useState(false);

  // const router = useRouter();

  const locale = useLocale();

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
            subject: "Reset Password",
            locale: locale,
            // message: VerifyEmailTemplate(),
          });

          console.log(forgetEmailRes);

          setLoading(false);

          if (!forgetEmailRes.data.success) {
            toast.error(
              `Sending forget email error: ${forgetEmailRes.data.message}`
            );
            setLoading(false);
            return;
          }
        } catch (error: any) {
          console.log(`Error sending forget email: ${error.message}`);

          setLoading(false);

          // toast({
          //   title: `Error sending verification email: ${error.message}`,
          // })
          toast.error(`Error sending verification email: ${error.message}`);
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
        subject: "Reset Password",
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
      console.log(`Sending reset password email client error: ${error.message}`);
      toast.error(`Sending reset password email client error: ${error.message}`)
      setIfYouDidntLoading(false);
    }
  };

  //

  return (
    <Card
      className="flex flex-col justify-center items-start w-[400px] mx-auto
    bg-zinc-200/55 shadow-md dark:bg-zinc-600 dark:shadow-md"
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
          <div className={`mt-3 text-sm text-orange-600 dark:text-yellow-400
          w-full ${ifYouDidntLoading && 'flex flex-row items-center justify-center'}`}>
            {forgetPage("IfYouDidntRecieve")}
            {ifYouDidntLoading ? <LoaderCircle className='animate-spin' size={35} /> : (
            <span
              className={`ml-1 text-indigo-600 dark:text-indigo-200
      hover:underline active:text-indigo-700 dark:active:text-indigo-300 cursor-pointer
      ${locale === "ar" && "mr-1"}`}
              onClick={ResendForgetEmail}
            >
              {forgetPage("click here")}
            </span>
            )
          }
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
