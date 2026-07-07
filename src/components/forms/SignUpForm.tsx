'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InputWrapper } from '@/components/ui/form-wrappers';
import { Button } from '@/components/ui/button';
import { requestGQL } from '@/lib/graphql-client';
import { REGISTER_MUTATION } from '@/graphql/operations';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';

const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await requestGQL(REGISTER_MUTATION, {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="grid grid-cols-2 gap-4">
          <InputWrapper
            control={form.control as any}
            name="firstName"
            label="First name"
            type="text"
            placeholder="Amélie"
            className="rounded-full bg-background border-border text-foreground"
            required
          />
          <InputWrapper
            control={form.control as any}
            name="lastName"
            label="Last name"
            type="text"
            placeholder="Laurent"
            className="rounded-full bg-background border-border text-foreground"
            required
          />
        </div>

        <InputWrapper
          control={form.control as any}
          name="username"
          label="Username"
          type="text"
          placeholder="amelielaurent"
          className="rounded-full bg-background border-border text-foreground"
          required
        />

        <InputWrapper
          control={form.control as any}
          name="email"
          label="Email"
          type="email"
          placeholder="amelielaurent7622@gmail.com"
          className="rounded-full bg-background border-border text-foreground"
          required
        />

        <InputWrapper
          control={form.control as any}
          name="password"
          label="Password"
          type="password"
          placeholder="•••••••••••••••••"
          className="rounded-full bg-background border-border text-foreground"
          required
        />

        <InputWrapper
          control={form.control as any}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="•••••••••••••••••"
          className="rounded-full bg-background border-border text-foreground"
          required
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 mt-2 shadow-md transition-colors"
        >
          {form.formState.isSubmitting ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
}
