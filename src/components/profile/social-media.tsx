"use client";

import socialMedia from "@/lib/social-media";
import { Card, CardContent, CardHeader } from "../ui/card";
import SocialMediaForm from "./social-media-form";
import { useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import DeleteConfirm from "../delete-confirm";
import removeAccount from "@/actions/removeAccount";
import { toast } from "sonner";

interface Props {
  accounts: { type: string; handle: string }[];
}

export default function SocialMedia({ accounts: initialAccounts }: Props) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [deleting, setDeleting] = useState(false);

  return (
    <Card>
      <CardHeader className="text-xl font-bold">
        Social Media Accounts
      </CardHeader>
      <CardContent>
        <div className="my-8 mt-6 flex flex-col gap-3">
          {accounts.map((val) => (
            <div
              key={val.type}
              className="flex justify-between rounded-sm border-2 px-4 py-4"
            >
              <div className="flex items-center gap-3">
                {socialMedia.find((sm) => sm.name === val.type).icon}
                <p className="capitalize">{val.type}</p>
              </div>
              <DeleteConfirm
                onConfirm={async () => {
                  const promise = removeAccount(val.type);
                  setDeleting(true);
                  toast.promise(promise, {
                    loading: "Removing...",
                    success: (d) => {
                      setAccounts(
                        accounts.filter((ac) => ac.type !== val.type),
                      );
                      return "Successfully removed account";
                    },
                    error: "Unable to remove account",
                    finally: () => {
                      setDeleting(false);
                    },
                  });
                }}
              >
                <Button variant="ghost" disabled={deleting}>
                  <XIcon />
                </Button>
              </DeleteConfirm>
            </div>
          ))}

          {accounts.length === 0 && (
            <p className="text-muted-foreground">No Social Media Accounts</p>
          )}
        </div>
        <SocialMediaForm
          onAdded={(t, a) => setAccounts([...accounts, { type: t, handle: a }])}
        />
      </CardContent>
    </Card>
  );
}
