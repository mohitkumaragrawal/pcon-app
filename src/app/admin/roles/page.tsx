"use client";

import addRoleToUser from "@/actions/addRoleToUser";
import findUserByMail from "@/actions/findUserByMail";
import removeRoleFromUser from "@/actions/removeRoleFromUser";
import Container from "@/components/container";
import DeleteConfirm from "@/components/delete-confirm";
import GlitchHeading from "@/components/glitch-heading";
import ProfileCard from "@/components/profile/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import getProfileLink from "@/lib/get-profile-link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

type FormSchema = z.infer<typeof formSchema>;

const roleSchema = z.object({
  role: z.string(),
});

type RoleSchema = z.infer<typeof roleSchema>;

export default function RolesPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const roleForm = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: "",
    },
  });

  const [user, setUser] = useState<
    {
      SocialMediaHandle: {
        type: string;
        handle: string;
      }[];
      UserRoles: {
        role: string;
      }[];
    } & {
      id: string;
      name: string;
      email: string;
      emailVerified: Date;
      image: string;
      username: string;
      gender: string;
    }
  >(null);

  const [loading, setLoading] = useState(false);

  const fetchUser = async (mail: string) => {
    setLoading(true);

    try {
      const eUser = await findUserByMail(mail);
      if (!eUser) {
        throw new Error("User not found");
      }
      console.log(eUser);
      setUser(eUser);
    } catch (e) {
      toast.error("User not found");
    }

    setLoading(false);
  };

  const handleSubmit = (formSchema: FormSchema) => {
    fetchUser(formSchema.email);
  };

  return (
    <Container>
      <GlitchHeading className="text-5xl">Roles</GlitchHeading>

      <div className="my-8 px-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            style={{
              opacity: loading ? 0.8 : 1.0,
            }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row-reverse my-3">
              <Button variant="secondary" type="submit" disabled={loading}>
                Search
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {user && (
        <>
          <ProfileCard
            accounts={user?.SocialMediaHandle}
            email={user?.email}
            image={user?.image}
            name={user?.name}
            roles={user?.UserRoles.map((r) => r.role)}
            profileLink={getProfileLink(user?.id, user?.username)}
          />

          <Card className="my-3">
            <CardHeader className="font-bold text-xl">Add Role</CardHeader>
            <CardContent>
              <Form {...roleForm}>
                <form
                  onSubmit={roleForm.handleSubmit(async (data) => {
                    toast.promise(addRoleToUser(user?.id, data.role), {
                      loading: "Adding Role",
                      error: "Something went wrong!",
                      success: () => {
                        const newRoles = [
                          ...user.UserRoles,
                          { role: data.role },
                        ];
                        setUser((u) => ({ ...u, UserRoles: newRoles }));

                        return "Role added!";
                      },
                    });
                  })}
                >
                  <FormField
                    control={roleForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row-reverse my-3">
                    <Button variant="secondary">Add Role</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="my-3">
            <CardHeader className="font-bold text-xl">Roles</CardHeader>

            <CardContent>
              <div>
                {user?.UserRoles.map((r) => (
                  <div
                    className="py-4 px-4 flex border-2 justify-between items-center my-3 rounded"
                    key={r.role}
                  >
                    <p>{r.role}</p>
                    <DeleteConfirm
                      onConfirm={async () => {
                        toast.promise(removeRoleFromUser(user?.id, r.role), {
                          loading: "Removing role",
                          success: () => {
                            const newRoles = user?.UserRoles.filter(
                              (s) => s.role !== r.role
                            );
                            const newUser = { ...user, UserRoles: newRoles };
                            setUser(newUser);

                            return "Removed role";
                          },
                          error: "Failed to remove role",
                        });
                      }}
                    >
                      <Button variant="destructive">
                        <Trash />
                      </Button>
                    </DeleteConfirm>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
}
