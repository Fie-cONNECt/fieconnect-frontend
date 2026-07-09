'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InputWrapper, CheckboxWrapper } from '@/components/ui/form-wrappers';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { requestGQL } from '@/lib/graphql-client';
import { REGISTER_MUTATION } from '@/graphql/operations';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User, Home, Eye, EyeOff, Check } from 'lucide-react';

const signUpSchema = z
  .object({
    userType: z.enum(['TENANT', 'LANDLORD']),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    countryCode: z.string().min(1, 'Required'),
    phoneNumber: z.string().min(8, 'Phone number must be at least 8 digits'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and privacy policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userType: 'TENANT',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+233',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
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
        throw new Error('Registration failed');
      }

      toast.success('Account created successfully! Please log in.');
      router.push('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        {/* User Type Cards */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => form.setValue('userType', 'TENANT')}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              form.watch('userType') === 'TENANT'
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                form.watch('userType') === 'TENANT' ? 'bg-primary/10' : 'bg-zinc-900'
              }`}
            >
              <User size={24} />
            </div>
            <span className="text-sm font-semibold">I am a Tenant</span>
          </button>

          <button
            type="button"
            onClick={() => form.setValue('userType', 'LANDLORD')}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              form.watch('userType') === 'LANDLORD'
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                form.watch('userType') === 'LANDLORD' ? 'bg-primary/10' : 'bg-zinc-900'
              }`}
            >
              <Home size={24} />
            </div>
            <span className="text-sm font-semibold">I am a Landlord</span>
          </button>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <InputWrapper
            control={form.control as any}
            name="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            className="rounded-xl bg-zinc-950/40 border-zinc-800 focus-visible:ring-2 focus-visible:ring-primary/50 text-white"
            required
          />
          <InputWrapper
            control={form.control as any}
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            className="rounded-xl bg-zinc-950/40 border-zinc-800 focus-visible:ring-2 focus-visible:ring-primary/50 text-white"
            required
          />
        </div>

        {/* Email Field */}
        <InputWrapper
          control={form.control as any}
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          className="rounded-xl bg-zinc-950/40 border-zinc-800 focus-visible:ring-2 focus-visible:ring-primary/50 text-white"
          required
        />

        {/* Phone Number Field */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-300 flex items-center gap-1">
            <span className="text-red-500">*</span> Phone Number
          </label>
          <div className="grid grid-cols-[110px_1fr] gap-3">
            {/* Country code selector */}
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full h-10 rounded-xl bg-zinc-950/40 border border-zinc-800 text-sm px-3 text-white focus:outline-hidden focus:ring-2 focus:ring-primary/50 cursor-pointer"
                    >
                      <option value="+233">+233 🇬🇭</option>
                      <option value="+1">+1 🇺🇸</option>
                      <option value="+44">+44 🇬🇧</option>
                      <option value="+234">+234 🇳🇬</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone digits input */}
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
                      className="w-full h-10 rounded-xl bg-zinc-950/40 border border-zinc-800 text-sm px-4 text-white focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Password & Confirm Password Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password with Show/Hide toggle */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>
                  <span className="text-red-500 mr-1">*</span> Password
                </FormLabel>
                <div className="relative">
                  <input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full h-10 rounded-xl bg-zinc-950/40 border border-zinc-800 text-sm pl-4 pr-10 text-white focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500 mr-1">*</span> Confirm Password
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-10 rounded-xl bg-zinc-950/40 border border-zinc-800 text-sm px-4 text-white focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
                  className="mt-1 h-4 w-4 rounded-sm border border-zinc-850 bg-zinc-950 text-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
                />
              </FormControl>
              <div className="space-y-1 leading-none text-zinc-400 text-xs">
                <span>
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-zinc-200 hover:underline hover:text-white font-medium"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="text-zinc-200 hover:underline hover:text-white font-medium"
                  >
                    Privacy Policy
                  </a>{' '}
                  of FieConnect.
                </span>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 mt-2 shadow-md transition-colors cursor-pointer"
        >
          {form.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </Form>
  );
}
