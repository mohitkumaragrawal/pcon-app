"use client";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

// import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
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
      <div className="max-w-xl mx-auto pt-36 px-4">
        <Card className="min-w-64">
          <CardHeader className="px-4 py-4 text-3xl">Sign in</CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={() => {
                setLoading(true);
                signIn("google", { callbackUrl });
              }}
              variant="default"

              // isLoading={loading}
              // startContent={!loading && <FcGoogle />}
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
