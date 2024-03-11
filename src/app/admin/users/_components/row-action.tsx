"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormLabel,
  FormDescription,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";
import ConfirmDialog from "@/components/dialogs/confirm-dialog";

const roleSchema = z.object({
  role: z.string().min(1, "Role is required"),
});
type RoleSchema = z.infer<typeof roleSchema>;

interface RowActionProps {
  userId: string;
  roles: string[];

  onRolesChange: (roles: string[]) => void;
  isBanned?: boolean;

  onBanUser?: () => void;
  onUnbanUser?: () => void;
  onDeleteUser?: () => void;
}

export function RowAction(props: RowActionProps) {
  const [roles, setRoles] = React.useState<string[]>(props.roles);

  const [roleEditOpen, setRoleEditOpen] = React.useState(false);
  const [banOpen, setBanOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [unbanOpen, setUnbanOpen] = React.useState(false);

  React.useEffect(() => {
    setRoles(props.roles);
  }, [props.roles]);

  const form = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: "",
    },
  });

  const handleSubmit = (schema: RoleSchema) => {
    setRoles((r) => {
      if (r.includes(schema.role)) return r;
      return [...r, schema.role];
    });

    form.reset();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(props.userId)}
          >
            Copy User Id
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setRoleEditOpen(true)}>
            Edit Roles
          </DropdownMenuItem>

          {props.isBanned ? (
            <DropdownMenuItem
              onClick={() => setUnbanOpen(true)}
              className="text-green-500"
            >
              Unban User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => setBanOpen(true)}
              className="text-red-500"
            >
              Ban User
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-red-500"
          >
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={roleEditOpen} onOpenChange={setRoleEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Roles</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Edit the roles assigned to this user
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <FormItem>
                <FormLabel>Assigned Roles</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <Badge
                        key={role}
                        className="group flex cursor-pointer items-center justify-between gap-1"
                        variant="outline"
                        onClick={() => {
                          setRoles(roles.filter((r) => r !== role));
                        }}
                      >
                        {role}

                        <div className="cursor-pointer hover:text-red-400 group-hover:text-red-400">
                          <XIcon size={14} />
                        </div>
                      </Badge>
                    ))}
                  </div>
                </FormControl>
              </FormItem>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Add role to the user</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button variant="secondary" type="submit">
                  Add Role
                </Button>

                <DialogClose asChild>
                  <Button
                    onClick={() => props.onRolesChange(roles)}
                    type="button"
                  >
                    Save Changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={banOpen}
        onOpenChange={setBanOpen}
        onConfirm={props.onBanUser}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={props.onDeleteUser}
      />

      <ConfirmDialog
        open={unbanOpen}
        onOpenChange={setUnbanOpen}
        onConfirm={props.onUnbanUser}
      />
    </>
  );
}
