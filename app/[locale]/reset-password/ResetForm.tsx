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
import { Input } from "@/components/ui/input";
import axios from "axios";
// import { toast } from "@/hooks/use-toast";
import { toast } from "sonner";
import Link from "next/link";

import { Label } from "@/components/ui/label";
/* import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" */
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import ShowPassStrength from "@/components/ShowPassStrength";
import { passwordStrength } from "check-password-strength";

import { useLocale, useTranslations } from 'next-intl' 


type strength = 0 | 1 | 2 | 3;


const ResetForm = () => {


    const router = useRouter();

  const params = useParams<any>();

  console.log(params.token);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);

    const [strength, setStrength] = useState<strength>(0);


  const [type, setType] = useState("password");
  const [validation, setValidation] = useState(false);

  const [loading, setLoading] = useState(false);

  const session = useSession();
  console.log(session);

  const handleValidation = (value: string) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");

    if (
      lower.test(value) &&
      upper.test(value) &&
      number.test(value) &&
      special.test(value)
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post("/api/verify-token", {
          token: params.token,
        });

        if (res.data.status === false) {
          setError(res.data.message);
          setVerified(true);
        }

        if (res.data.status === true) {
          setError("");
          setVerified(true);
          setUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyToken();
  }, [params.token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // toast({
      //   variant: "destructive",
      //   title: "Passwords do not match",
      // });
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    
        if (password.length < 6) {
          // toast({
          //   variant: "destructive",
          //   title: "Password cannot be less than 6 characters",
          // });
          toast.error('Password cannot be less than 6 characters');
          setLoading(false);
          return;
        } else if (password.length > 20) {
          // toast({
          //   variant: "destructive",
          //   title: "Password cannot be more than 20 characters",
          // });
          toast.error('Password cannot be more than 20 characters');
          setLoading(false);
          return;
        }



        const lower = new RegExp("(?=.*[a-z])");
            const upper = new RegExp("(?=.*[A-Z])");
            const number = new RegExp("(?=.*[0-9])");
            const special = new RegExp("(?=.*[!@#$%^&*])");
        
            if (!lower.test(password)) {
              // toast({
              //   variant: "destructive",
              //   title: "Password must contain at least one lowercase letter (asdfghjkl)",
              //   description: "",
                // });
                toast.error('Password must contain at least one lowercase letter (asdfghjkl)');
                setLoading(false);
                return;
            }
        
            if (!upper.test(password)) {
              // toast({
                // variant: "destructive",
                // title: "Password must contain at least one highercase letter (ASDFGHJKL)",
                // description: "",
                // });
                toast.error('Password must contain at least one highercase letter (ASDFGHJKL)');
                setLoading(false);
                return;
            }
        
            if (!number.test(password)) {
              // toast({
              //   variant: "destructive",
              //   title: "Password must contain at least one number (1234567890)",
              //   description: "",
              //   });
                toast.error('Password must contain at least one number (1234567890)');
                setLoading(false);
                return;
            }
        
            if (!special.test(password)) {
              // toast({
              //   variant: "destructive",
              //   title: "Password must contain at least one special letter (!@#$%^&*)",
              //   description: "",
              //   });
              toast.error('Password must contain at least one special letter (!@#$%^&*)');
                setLoading(false);
                return;
            }




    setLoading(true);

    try {
      const response = await axios.post("/api/reset-password", {
        token: params.token,
        password: password,
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
        router.push(`/${locale}/login`);
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

  const formStyles = `text-md`;
  const iconClass = `absolute right-4 top-2 text-gray-500 cursor-pointer`;


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
          <CardTitle className="text-2xl">{resetPage('Reset Password')}</CardTitle>
          <CardDescription className="text-gray-600"></CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col relative">
                <Input
                  type={type}
                  placeholder={resetPage('p-Password')}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleValidation(e.target.value);
                  }}
                  required
                  className="placeholder-gray-700 dark:placeholder-gray-300
                  dark:border-white"
                />

                {type === "password" && password ? (
                  <span
                    className={`${locale === "en" ? "icon-class" : "icon-class-ar"}`}
                    onClick={() => setType("text")}
                  >
                    <EyeIcon className="w-5 h-5" />
                  </span>
                ) : (
                  type === "text" &&
                  password && (
                    <span
                    className={`${locale === "en" ? "icon-class" : "icon-class-ar"}`}
                      onClick={() => setType("password")}
                    >
                      <EyeOffIcon className="w-5 h-5" />
                    </span>
                  )
                )}
              </div>

              {/* <div
                className={`${
                  validation || password === "" ? "hidden" : "flex"
                } text-sm text-red-500`}
              >
                You need at least one lowercase and uppercase letter, number and
                special character <br /> (A-Z, a-z, 0-9 and !@#$%^&*)
              </div> */}

              {password.trim() !== "" && (
                <div className="-mt-[6px]">
                  <ShowPassStrength strength={strength} />
                </div>
              )}

              <div className="flex flex-col space-y-1.5">
                <Input
                  type={type}
                  placeholder={resetPage('p-Confirm Password')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="placeholder-gray-700 dark:placeholder-gray-300
                  dark:border-white"
                />
              </div>

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

export default ResetForm
