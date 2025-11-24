import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppContextProvider from "@/context/AppContext";
import { Suspense } from "react";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "./provider";

import AppProvider from "@/components/AppContext";
// import EmailIsNotVerified from "@/components/EmailIsNotVerified";
import { getSession } from "@/actions/getUser";
// import { Button } from "@/components/ui/button";
// import { signOut } from "next-auth/react";
// import Header from "@/components/Header";

import { Toaster } from "@/components/ui/sonner";

import { Analytics } from "@vercel/analytics/next";

import styles from "./layout.module.css";
import { Loader2 } from "lucide-react";
import GoToNormalPage from "@/components/GoToNormalPage";
import Header from "@/components/Header";
// import prisma from "@/lib/prisma";
import EmailIsNotVerified from "@/components/EmailIsNotVerified";
// import EmailIsNotVerified from "@/components/EmailIsNotVerified";
// import prisma from "@/lib/prisma";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Notes App",
  description:
    "Notes App helps you to add notes while using your browser, save, delete and edit them and copy them when you want.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(user) || "{}");

  // console.log(jUser?.user?.email);

  // const sessionUser = await prisma.user.findUnique({
  //     where: { email: jUser?.user?.email }
  //   })

  // const sessionUser = await prisma.user.findUnique({
  //   where: { email: jUser?.user?.email }
  // })

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${poppins.variable}
       antialiased relative overflow-x-hidden
        ${locale === "ar" ? styles.arabic : styles.english}`}
      /// 
      >
        {/* {params.id} */}
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <AppContextProvider email={session?.user?.email}>
            <AppProvider session>
              <Providers>
                <NextIntlClientProvider messages={messages}>
                   <EmailIsNotVerified />
                  <GoToNormalPage />
                  {/* <EmailIsNotVerified session={sessionUser} /> */}
                  {children}
                  <Toaster />
                  <Header email={session?.user?.email} session={session} /* user={sessionUser} */ />

                  <Analytics />
                </NextIntlClientProvider>
              </Providers>
            </AppProvider>
          </AppContextProvider>
        </Suspense>
        <></>
      </body>
    </html>
  );
}
