"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import socialMedia from "@/lib/social-media";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SelectValue } from "@radix-ui/react-select";

import addAccount from "@/actions/addAccount";
import { useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  type: z.string(),
  account: z.string(),
});

type Schema = z.infer<typeof schema>;

interface Props {
  onAdded?: (type: string, account: string) => void;
}

export default function SocialMediaForm(props: Props) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "",
      account: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (val: Schema) => {
    setLoading(true);

    const promise = addAccount(val.type, val.account);
    toast.promise(promise, {
      loading: "Adding account",
      success: "Successfully Added account",
      error: "Failed to add acount",
    });

    try {
      await promise;
      if (props.onAdded) props.onAdded(val.type, val.account);
    } catch (e) {}

    form.reset();
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-3 flex-col"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue
                      className="w-full"
                      placeholder="Account type"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {socialMedia.map((sm) => (
                      <SelectItem key={sm.name} value={sm.name}>
                        <div className="flex items-center gap-3">
                          {sm.icon}
                          <p className="capitalize">{sm.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Which type of account you want to add?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Link</FormLabel>
              <FormControl>
                <Input {...field} disabled={loading} />
              </FormControl>
              <FormDescription>Link of the account</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" disabled={loading}>
          Add Account
        </Button>
      </form>
    </Form>
  );
}
