"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  InputWrapper,
  CheckboxWrapper,
  PasswordWrapper,
  NativeSelectWrapper,
} from "@/components/ui/form-wrappers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { requestGQL } from "@/lib/graphql-client";
import { REGISTER_MUTATION } from "@/graphql/operations";
import { toast } from "sonner";
import { persistAuthSession } from "@/lib/auth-session";
import { useRouter } from "next/navigation";
import { User, Home, Eye, EyeOff, Check } from "lucide-react";

const signUpSchema = z
  .object({
    userType: z.enum(["TENANT", "LANDLORD"]),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    countryCode: z.string().min(1, "Required"),
    phoneNumber: z.string().min(8, "Phone number must be at least 8 digits"),
    password: z
      .string()
      .min(9, "Password must be more than 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

const countryOptions = [
  { label: "+233 🇬🇭", value: "+233" },
  { label: "+1 🇺🇸", value: "+1" },
  { label: "+44 🇬🇧", value: "+44" },
  { label: "+234 🇳🇬", value: "+234" },
];

const authInputClass =
  "rounded-xl h-11 bg-background border-border text-foreground";

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userType: "TENANT",
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+233",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await requestGQL<any, any>(REGISTER_MUTATION as any, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        userType: data.userType,
        phone: `${data.countryCode} ${data.phoneNumber}`,
      });

      if (!response.register) {
        throw new Error("Registration failed");
      }

      const { token, user } = response.register;

      if (typeof window !== "undefined") {
        persistAuthSession(token, user);
      }

      toast.success("Registration successful! Welcome to FieConnect.");
      router.push("/app");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        {/* User Type Cards */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => form.setValue("userType", "TENANT")}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-ui cursor-pointer ${
              form.watch("userType") === "TENANT"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                form.watch("userType") === "TENANT"
                  ? "bg-primary/15"
                  : "bg-muted"
              }`}
            >
              <User size={24} />
            </div>
            <span className="text-sm font-semibold">I am a Tenant</span>
          </button>

          <button
            type="button"
            onClick={() => form.setValue("userType", "LANDLORD")}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-ui cursor-pointer ${
              form.watch("userType") === "LANDLORD"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                form.watch("userType") === "LANDLORD"
                  ? "bg-primary/15"
                  : "bg-muted"
              }`}
            >
              <Home size={24} />
            </div>
            <span className="text-sm font-semibold">I am a Landlord</span>
          </button>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputWrapper
              control={form.control as any}
              name="firstName"
              label="First Name"
              type="text"
              placeholder="John"
              className={authInputClass}
              required
            />
          </div>
          <div>
            <InputWrapper
              control={form.control as any}
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Doe"
              className={authInputClass}
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <InputWrapper
          control={form.control as any}
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          className={authInputClass}
          required
        />

        {/* Phone Number Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1">
            <span className="text-destructive" aria-hidden>
              *
            </span>{" "}
            Phone Number
          </label>
          <div className="grid grid-cols-[110px_1fr] gap-3">
            <NativeSelectWrapper
              control={form.control as any}
              name="countryCode"
              options={countryOptions}
              className={authInputClass}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      type="tel"
                      placeholder="24 123 4567"
                      className={`w-full ${authInputClass} text-sm px-4 focus:outline-hidden focus:ring-2 focus:ring-primary/50`}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium text-destructive" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Password & Confirm Password Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PasswordWrapper
            control={form.control as any}
            name="password"
            label="Password"
            placeholder="••••••••"
            className={authInputClass}
            required
            showStrength={true}
          />

          <PasswordWrapper
            control={form.control as any}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            className={authInputClass}
            required
          />
        </div>

        {/* Agree terms checkbox */}
        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-sm border border-border bg-background text-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
                />
              </FormControl>
              <div className="space-y-1 leading-none text-muted-foreground text-caption">
                <span>
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-foreground hover:underline font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-foreground hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>{" "}
                  of FieConnect.
                </span>
                <FormMessage className="text-xs font-medium text-destructive" />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 mt-2 shadow-md transition-colors cursor-pointer"
        >
          {form.formState.isSubmitting
            ? "Creating account..."
            : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
