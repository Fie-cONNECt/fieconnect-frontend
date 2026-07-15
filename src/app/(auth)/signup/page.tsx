"use client";

import SignUpForm from "@/components/forms/SignUpForm";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.push("/");
    }
  }, [router]);
  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up here to join fieConnect
        </p>
      </div>

      <SignUpForm />

      <div className="flex items-center justify-between mt-8 text-xs text-muted-foreground">
        <div>
          Have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
        <Link href="#" className="hover:text-foreground transition-colors">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}
