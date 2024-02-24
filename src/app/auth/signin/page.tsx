"use client";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useState } from "react";

interface Props {
  searchParams?: {
    callbackUrl?: string;
  };
}

export default function SignInPage(props: Props) {
  const [loading, setLoading] = useState(false);

  let callbackUrl = props.searchParams?.callbackUrl;
  if (!callbackUrl) {
    callbackUrl = process.env.NEXTAUTH_URL;
  }

  return (
    <>
      <div className="mx-auto max-w-xl px-4 pt-36">
        <Card className="min-w-64">
          <CardHeader className="px-4 py-4 text-3xl">Sign in</CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={() => {
                setLoading(true);
                signIn("google", { callbackUrl });
              }}
              variant="secondary"
              disabled={loading}
              className="mt-6 w-full"
            >
              <FcGoogle className="mr-2" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
