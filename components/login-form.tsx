"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
// import { CircularProgress } from "@mui/material"
// import { UserAuth } from "@/context/AuthContext"
// import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
// import { Session } from "@/types/user";
// import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  redirectTo,
  // session,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  redirectTo: string | undefined | null;
  // session: Session | null | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [type, setType] = useState("password");

  // const [sessionUser, setSessionUser] = useState<Session | null | undefined>(
  //   null
  // );

  

  // const router = useRouter()

  // console.log(sessionUser, router)

  // const { user, googleSignIn, logOut } = UserAuth();
  // console.log(user);

  // const router = useRouter();

  const locale = useLocale();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignWithGoogle = async (e: any) => {
    e.preventDefault();

    setLoadingGoogle(true);

    // await signIn("google", { callbackUrl: `/${locale}/` });
    await signIn("google", {
      callbackUrl: redirectTo ? `${redirectTo}` : `/${locale}/`,
    });

    setLoadingGoogle(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.post("/api/login", { ...formData, locale });

    console.log(res);

    if (!res.data.success) {
      toast.error(`${res.data.message}`);
      setLoading(false);
      return;
    }

    if (res.data.success) {
      // await signIn("credentials", { ...formData, callbackUrl: `/${locale}/` });
      await signIn("credentials", {
        ...formData,
        callbackUrl: redirectTo ? `${redirectTo}` : `/${locale}/`,
      });

      setLoading(false);
    }
  };

  /*    useEffect(() => {
            const checkAuthentication = async () => {
              await new Promise((resolve) => setTimeout(resolve, 50));
              setLoading(false);
            };
            checkAuthentication();
          }, [user]); */

  console.log(formData);

  const formStyles = `text-md`;
  // const iconClass = `absolute right-4 top-2 text-gray-500 cursor-pointer`;

  // const session = useSession();
  // console.log(session);

  const loginPage = useTranslations("LoginPage");



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


    // useEffect(() => {
      
    //   if (sessionUser && sessionUser?.user?.email) {

    //     if (redirectTo) {
    //       return router.push(`${redirectTo}`)
    //       // we must guarantee that for example that it will start with (/)
    //       // ex. redirectTo = "/en/any-page"
    //     }

    //     router.push(`/${locale}/`);
    //   }

    // }, [sessionUser]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card
        className="bg-zinc-200/55 shadow-md
      dark:bg-zinc-600 dark:shadow-md"
      >
        <CardHeader>
          <CardTitle className="text-2xl">{loginPage("Login")}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-200">
            {loginPage("ُEnterYourEmailAddress")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className={`${formStyles}`}>
                  {loginPage("Email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="dark:placeholder-white"
                  dir="ltr"
                  defaultValue={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className={`${formStyles}`}>
                    {loginPage("Password")}
                  </Label>
                  <Link
                    href={`/${locale}/forgot-password?${redirectTo ? `redirectTo=${redirectTo}` : ""}`}
                    className="mx-2 inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {loginPage("Forgot your password?")}
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={type}
                    defaultValue={formData.password}
                    dir="ltr"
                    onChange={handleChange}
                    required
                  />

                  {type === "password" && formData.password ? (
                    <span
                      className={`${locale === "en" ? "icon-class" : "icon-class"}`}
                      onClick={() => setType("text")}
                    >
                      <EyeIcon className="w-5 h-5" />
                    </span>
                  ) : (
                    type === "text" &&
                    formData.password && (
                      <span
                        className={`${locale === "en" ? "icon-class" : "icon-class"}`}
                        onClick={() => setType("password")}
                      >
                        <EyeOffIcon className="w-5 h-5" />
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-500/95 active:bg-green-500/90 text-white "
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    loginPage("LoginButton")
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full dark:text-black dark:bg-white dark:border-none"
                  onClick={handleSignWithGoogle}
                  type="button"
                >
                  {loadingGoogle ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Image
                        src={"/Google_Icons-09-512.webp"}
                        width={24}
                        height={24}
                        alt="Google logo"
                      />
                      {loginPage("Continue With Google")}
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-0 text-center text-sm">
                {loginPage("Don't have an account?")}
                <Link
                  // href={`/${locale}/register`}
                  href={`/${locale}/register${redirectTo ? `?redirectTo=${redirectTo}` : ""}`}
                  className="hover:underline active:text-gray-800 underline-offset-4 mx-1"
                >
                  {loginPage("Register")}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
