"use server"

import { loginSchema } from "@/lib/zodSchemas"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation";

export async function Register(prevState: unknown , formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: loginSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    return redirect("/");
}