"use client";
import { getSession, signIn, useSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
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
        <Card className="bg-slate-800/30 backdrop-blur-lg min-w-96">
          <CardHeader className="px-4 py-4 text-3xl">Sign in</CardHeader>
          <Divider />
          <CardBody className="flex justify-center">
            <Button
              onClick={() => {
                setLoading(true);
                signIn("google", { callbackUrl });
              }}
              className="bg-slate-800"
              isLoading={loading}
              startContent={!loading && <FcGoogle />}
            >
              Sign in with Google
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
