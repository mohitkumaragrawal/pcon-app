"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EditIcon } from "lucide-react";

import { z } from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Spinner } from "@nextui-org/react";

type ZodSchemaType = z.ZodObject<
  {
    value: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    value?: string;
  },
  {
    value?: string;
  }
>;

interface FieldEditProps {
  label: string;
  description: string;
  defaultValue: string;
  editable?: boolean;
  schema: ZodSchemaType;
  render: (
    field: ControllerRenderProps<
      {
        value?: string;
      },
      "value"
    >
  ) => React.ReactNode;
  onSubmit: (value: string) => Promise<void>;
}

type Schema = z.infer<ZodSchemaType>;

export default function FieldEdit(props: FieldEditProps) {
  const [value, setValue] = useState(props.defaultValue);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  const form = useForm<Schema>({
    resolver: zodResolver(props.schema),
    defaultValues: {
      value: props.defaultValue,
    },
  });

  const handleSubmit = async (data: Schema) => {
    setLoading(true);

    const promise = props.onSubmit(data.value);

    try {
      await promise;
    } catch (e) {
      toast.error(e?.message ?? "Something went wrong!");
    }

    form.reset();

    setLoading(false);
    setEditing(false);
  };

  if (editing) {
    return (
      <Form {...form}>
        <form
          className={cn(
            "px-3 py-3 bg-slate-800/30 rounded-lg my-3 border-2 relative",
            loading ? "opacity-50" : ""
          )}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {loading && (
            <Spinner className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />
          )}
          <FormField
            name="value"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>{props.label}</FormLabel>
                <FormControl>{props.render(field)}</FormControl>
                <FormDescription>{props.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="secondary"
            className="ml-auto block"
            type="submit"
            disabled={loading}
          >
            Save
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <div className="my-3 flex justify-between items-center">
      <div className="flex-1">
        <p className="font-bold text-lg">{props.label}</p>
        {value == "" ? (
          <p className="text-muted-foreground">None</p>
        ) : (
          <p className="text-muted-foreground">{value}</p>
        )}
      </div>
      <div>
        {props.editable && (
          <Button variant="outline" onClick={() => setEditing(props.editable)}>
            <EditIcon />
          </Button>
        )}
      </div>
    </div>
  );
}
