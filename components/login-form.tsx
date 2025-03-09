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
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
// import { CircularProgress } from "@mui/material"
// import { UserAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader, Loader2 } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [type, setType] = useState("password");

  // const { user, googleSignIn, logOut } = UserAuth();
  // console.log(user);

  const router = useRouter();

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

    await signIn("google", { callbackUrl: `/${locale}/` });
    setLoadingGoogle(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", { ...formData, callbackUrl: `/${locale}/` });

    setLoading(false);
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
  const iconClass = `absolute right-4 top-2 text-gray-500 cursor-pointer`;

  const session = useSession();
  console.log(session);

  const loginPage = useTranslations("LoginPage");
  const locale = useLocale();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-zinc-200/55 shadow-md
      dark:bg-zinc-600 dark:shadow-md">
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
                    href={`/${locale}/forgot-password`}
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
                  {loading ? <Loader2 className="animate-spin" /> : loginPage("LoginButton")}
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
                  href={`/${locale}/register`}
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
