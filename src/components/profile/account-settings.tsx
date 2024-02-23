"use client";

import { z } from "zod";
import { Card, CardContent, CardHeader } from "../ui/card";
import FieldEdit from "./field-edit";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import updateUsername from "@/actions/updateUsername";
import updateGender from "@/actions/updateGender";
import { Session } from "next-auth";

const schema = z.object({
  value: z
    .string()
    .min(1, "Field is required")
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Invalid value"),
});

function isEmpty(s: string): boolean {
  const str = s ?? "";
  if (str.length == 0) return true;
  return false;
}

export default function AccountSettings({ session }: { session: Session }) {
  return (
    <Card>
      <CardHeader className="font-bold text-xl">Account Settings</CardHeader>
      <CardContent className="mt-3">
        <FieldEdit
          defaultValue={session?.user?.username ?? ""}
          label="Username"
          schema={schema}
          description="Unique username, once updated it can't be changed later"
          render={(field) => <Input {...field} />}
          editable={isEmpty(session?.user?.username)}
          onSubmit={async (val) => {
            console.log("updating username");
            await updateUsername(val);
            window.location.reload();
          }}
        />
        <FieldEdit
          defaultValue={session?.user?.gender ?? ""}
          label="Gender"
          schema={schema}
          editable={isEmpty(session?.user?.gender)}
          description="Your gender, once updated it can't be changed later"
          render={(field) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue className="w-full" placeholder="Gender.." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          onSubmit={async (val) => {
            await updateGender(val);
            window.location.reload();
          }}
        />
      </CardContent>
    </Card>
  );
}
