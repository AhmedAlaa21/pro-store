"use server";

import { signInFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    // provider = "credentials"
    return { success: true, message: "Signed in successfully" };
    await signIn("credentials", user);
  } catch (error) {
    if (isRedirectError(error)) throw error;

    //no clear message for security
    return { success: false, message: "Invalid email or password" };
  }
}

export async function signOutUser() {
  //kill cookie, token, etc..
  await signOut();
}
