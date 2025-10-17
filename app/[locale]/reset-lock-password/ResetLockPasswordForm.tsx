"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import axios from "axios";
// import { toast } from "@/hooks/use-toast";
import { toast } from "sonner";
import Link from "next/link";

// import { Label } from "@/components/ui/label";
/* import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" */
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
// import ShowPassStrength from "@/components/ShowPassStrength";
import { passwordStrength } from "check-password-strength";

import { useLocale, useTranslations } from 'next-intl' 

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp";


type strength = 0 | 1 | 2 | 3;


const ResetLockPasswordForm = () => {

    const router = useRouter();

  const params = useParams<any>();

  console.log(params.token);
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);

    const [strength, setStrength] = useState<strength>(0);


  // const [type, setType] = useState("password");
  const [validation, setValidation] = useState(false);

    const [lockPasswordOTPvalue, setLockPasswordOTPvalue] = useState("");
  

  const [loading, setLoading] = useState(false);

  const session = useSession();
  console.log(session);

  // const handleValidation = (value: string) => {
  //   const lower = new RegExp("(?=.*[a-z])");
  //   const upper = new RegExp("(?=.*[A-Z])");
  //   const number = new RegExp("(?=.*[0-9])");
  //   const special = new RegExp("(?=.*[!@#$%^&*])");

  //   if (
  //     lower.test(value) &&
  //     upper.test(value) &&
  //     number.test(value) &&
  //     special.test(value)
  //   ) {
  //     setValidation(true);
  //   } else {
  //     setValidation(false);
  //   }
  // };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post("/api/verify-otp-token", {
          token: params.token,
        });

        if (res.data.status === false) {
          setError(res.data.message);
          setVerified(true);
        }

        if (res.data.status === true) {
          setError("");
          setVerified(true);
          setUser(res?.data?.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyToken();
  }, [params.token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    



    setLoading(true);

    try {
      const response = await axios.post("/api/reset-lock-otp", {
        token: params.token,
        lockedPassword: lockPasswordOTPvalue,
      });

      if (!response.data.success) {
        // toast({
        //   variant: "destructive",
        //   title: ,
        // });
        toast.error(`${response.data.message}`);
      }

      if (response.data.success) {
        // toast({
        //   className: "bg-green-500 text-white",
        //   title: response.data.message,
        // });
        toast.success(`${response.data.message}`);
        router.push(`/${locale}/`);
      }
    } catch (error) {
      console.log(error);
      // toast({
      //   title: `${error}`,
      // });
      toast.error(`${error}`);
    }

    setLoading(false);
    setPassword("");
    setConfirmPassword("");
  };

  console.log(password, confirmPassword);

  // const formStyles = `text-md`;
  // const iconClass = `absolute right-4 top-2 text-gray-500 cursor-pointer`;


  useEffect(() => {
      setStrength(passwordStrength(password).id as strength);
    });


  /* useEffect(() => {
      if (session.status === "authenticated") {
        router.push('/');
      }
    }, [session.status, router]); */


    const resetPage = useTranslations('ResetPage');
    const locale = useLocale();


  return (
    <Card className="flex flex-col justify-center items-start w-[400px] mx-auto
    bg-zinc-200/55 shadow-md dark:bg-zinc-600 dark:shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Lock OTP</CardTitle>
          <CardDescription className="text-gray-600"></CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">


            <InputOTP maxLength={6} onChange={(e) => {
                setLockPasswordOTPvalue(e);
                console.log(lockPasswordOTPvalue)
              }}>
                <InputOTPGroup className="bg-gray-200/90 rounded-md">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="bg-gray-200/90 rounded-md">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5}
                  // onval={() => {
                  //   setIsLockPasswordCard(false);
                  //   handleChangleLockPassword();
                  // }} 
                  />
                </InputOTPGroup>
              </InputOTP>


              <div className="flex flex-row justify-between w-full px-1 mt-2">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-500/95 active:bg-green-500/90 text-white"
                  disabled={error.length > 0}
                >
                  {loading ? <Loader2 className="animate-spin" /> : resetPage('Submit')}
                </Button>

                <Link
                  href={`/${locale}/login`}
                  className="text-sm hover:underline active:text-gray-600 mt-[11.5px]"
                >
                  {resetPage('Back to sign in')}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center w-full">
          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        </CardFooter>
      </Card>
  )
}

export default ResetLockPasswordForm
