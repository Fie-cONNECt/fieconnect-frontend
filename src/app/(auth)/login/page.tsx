"use client";

import LoginForm from "@/components/forms/loginForm";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

function LoginPageContent() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.push("/app");
    }
  }, [router]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access your dashboard
        </p>
      </div>

      <LoginForm />

      <div className="flex items-center justify-between mt-8 text-xs text-muted-foreground">
        <div>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
        <Link href="#" className="hover:text-foreground transition-colors">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-muted-foreground text-sm py-12">
          Loading...
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
