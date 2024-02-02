"use client";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

interface Props {
  searchParams?: {
    callbackUrl?: string;
  };
}

export default function SignInPage(props: Props) {
  let callbackUrl = props.searchParams?.callbackUrl;
  if (!callbackUrl) {
    callbackUrl = process.env.NEXTAUTH_URL;
  }

  return (
    <>
      <p>Sign In</p>
      <Button onClick={() => signIn("google", { callbackUrl })}>
        Google Signin
      </Button>
    </>
  );
}
