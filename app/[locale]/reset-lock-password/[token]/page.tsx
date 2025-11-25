
import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import Link from "next/link";

// import { Label } from "@/components/ui/label";
/* import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" */
// import { redirect, useParams, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
// import ShowPassStrength from "@/components/ShowPassStrength";
// import { passwordStrength } from "check-password-strength";
// import ResetForm from "../ResetForm";
import { getSession, getUser } from "@/actions/getUser";
import ResetLockPasswordForm from "../ResetLockPasswordForm";


// type strength = 0 | 1 | 2 | 3;

const page = async () => {

  const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(session) || '{}')
  
//   if (jUser?.user?.email) {
//     redirect('/');
//   }
  
  /* useEffect(() => {
      if (session.status === "authenticated") {
        router.push('/');
      }
    }, [session.status, router]); */

  return (
    <div className="w-full min-h-svh flex justify-center items-center md:px-0 px-1 md:p-10
    overflow-hidden">
      <div className="w-full max:sm:w-[95vw] max-w-sm">
        <ResetLockPasswordForm />
      </div>
    </div>
  );
};

export default page;
