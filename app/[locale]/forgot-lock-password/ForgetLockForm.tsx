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
import axios from "axios";
// import { toast } from '@/hooks/use-toast'
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, LoaderCircle } from "lucide-react";
// import { useRouter } from "next/navigation";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

const ForgetLockForm = ({ email }: { email?: string | null | undefined }) => {
  console.log(email);

  // const [email, setEmail] = useState("");
  // const [emailIfyouDidnt, setEmailIfyouDidnt] = useState("");

  const searchParams = useSearchParams() as any;

  const redirectTo = searchParams.get('redirectTo');

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [ifYouDidnt, setIfYouDidnt] = useState(false);

  const [ifYouDidntLoading, setIfYouDidntLoading] = useState(false);

  // const router = useRouter();

  const locale = useLocale();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post("/api/forget-lock-password", {
        email,
        locale,
      });

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
          const forgetEmailRes = await axios.post(
            `/api/send-forget-lock-email${redirectTo ? `?redirectTo=${redirectTo}` : ''}`,
            {
              email: email,
              subject: "Reset Lock OTP",
              locale: locale,
              // message: VerifyEmailTemplate(),
            }
          );

          console.log(forgetEmailRes);

          setLoading(false);
        } catch (error: any) {
          console.log(`Error sending OTP reset email: ${error.message}`);

          setLoading(false);

          // toast({
          //   title: `Error sending verification email: ${error.message}`,
          // })
          toast.error(`Error sending OTP reset email: ${error.message}`);
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
    } catch (error: any) {
      console.log(error);
      // toast({
      //   variant: "destructive",
      //   title: `${error}`
      // })
      toast.error(`ClientError: ${error.message}`);
      setLoading(false);
    }

    //   setEmail("");
    setLoading(false);
    setIfYouDidnt(true);
  };

  //   const forgetPage = useTranslations('ForgetPage');

  console.log(email);

  const ResendForgetOTPEmail = async () => {
    setIfYouDidntLoading(true);

    try {
      const res = await axios.post(`/api/sendEmailForgetOTPGmail${redirectTo ? `?redirectTo=${redirectTo}` : ''}` , {
        email: email,
        subject: "Reset OTP Lock",
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
        `Sending reset Lock OTP email client error: ${error.message}`
      );
      toast.error(
        `Sending reset Lock OTP email client error: ${error.message}`
      );
      setIfYouDidntLoading(false);
    }
  };

  return (
    <Card
      className="flex flex-col justify-center items-start
    bg-zinc-200/55 shadow-md dark:bg-zinc-600 dark:shadow-md"
    // w-[400px] mx-auto
    >
      {/* {redirectTo} */}
      <CardHeader>
        <CardTitle className="text-2xl dark:text-white">
          Forget Lock OTP
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-white">
          Click on (Reset My OTP) , and we will send you an email with a link to reset the lock OTP
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row w-full items-center justify-between gap-2 "
        >
          {/* <Input type="email" placeholder='Email'
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
      className='placeholder-gray-700 dark:placeholder-gray-100' /> */}

          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-500/95 active:bg-green-500/90 text-white
            cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Reset My OTP"}
          </Button>
        </form>

        {ifYouDidnt && (
          <div
            className={`mt-3 text-sm text-orange-600 dark:text-yellow-400
                  w-full ${ifYouDidntLoading && "flex flex-row items-center justify-center"}`}
          >
            If you didn&apos;t recieve reset Lock OTP email, check your spam folder or
            {ifYouDidntLoading ? (
              <LoaderCircle className="animate-spin" size={35} />
            ) : (
              <span
                className="ml-1 text-indigo-600 dark:text-indigo-200
              hover:underline active:text-indigo-700 dark:active:text-indigo-300 cursor-pointer"
                onClick={ResendForgetOTPEmail}
              >
                click here
              </span>
            )}
          </div>
        )}

        {message && <p className="text-sm text-red-500 mt-4">{message}</p>}
      </CardContent>

      <CardFooter>
        <Link
          href={`${redirectTo ? redirectTo : `/${locale}/`}`}
          className="text-sm hover:underline active:text-gray-600"
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgetLockForm;
