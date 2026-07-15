"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputWrapper } from "@/components/ui/form-wrappers";
import { Button } from "@/components/ui/button";
import { requestGQL } from "@/lib/graphql-client";
import { LOGIN_MUTATION } from "@/graphql/operations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await requestGQL(LOGIN_MUTATION, {
        email: data.email,
        password: data.password,
      });

      if (!response.login) {
        throw new Error("Login failed");
      }

      const { token, user } = response.login;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Login successful!");
      router.push("/app");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.message || "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <InputWrapper
          control={form.control as any}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          className="rounded-xl h-11 bg-background border-border text-foreground"
          required
        />

        <InputWrapper
          control={form.control as any}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          className="rounded-xl h-11 bg-background border-border text-foreground"
          required
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 mt-2 shadow-md transition-ui"
        >
          {form.formState.isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
