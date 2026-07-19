'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Form } from '@/components/ui/form';
import {
  InputWrapper,
  TextareaWrapper,
  SwitchWrapper,
  CheckboxWrapper,
  SliderWrapper,
  SelectWrapper,
  DatePickerWrapper,
  FileUploadWrapper,
} from '@/components/ui/form-wrappers';
import { ArrowLeft, Sparkles, Info, ChevronDownIcon, FileCode } from 'lucide-react';

export default function ComponentsShowcase() {
  const [progressValue, setProgressValue] = useState(65);

  const form = useForm({
    defaultValues: {
      username: 'downspice',
      bio: 'Software engineer and fullstack developer',
      notifications: true,
      agreeTerms: true,
      difficulty: 50,
      role: 'developer',
      birthdate: '2026-07-07T09:00:00.000Z',
      avatar: null as File | null,
    },
  });

  const formValues = form.watch();

  const getSerializableValues = (values: typeof formValues) => {
    return {
      ...values,
      avatar:
        values.avatar instanceof File
          ? `${values.avatar.name} (${(values.avatar.size / 1024).toFixed(1)} KB)`
          : null,
    };
  };

  const onSubmit = (data: any) => {
    alert(JSON.stringify(getSerializableValues(data), null, 2));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-black text-white px-4 py-12 sm:px-6 lg:px-8">
        {/* Background ambient glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] left-[30%] h-[500px] w-[500px] rounded-full bg-indigo-900/10 blur-[120px]" />
          <div className="absolute -bottom-[20%] right-[20%] h-[500px] w-[500px] rounded-full bg-purple-900/10 blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors mb-3"
              >
                <ArrowLeft size={14} />
                Back to Auth Demo
              </Link>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
                <Sparkles className="text-indigo-400" />
                fieConnect Component Library
              </h1>
              <p className="mt-2 text-zinc-400 text-sm">
                Interactive preview of the fully-configured shadcn/ui primitives.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setProgressValue(Math.floor(Math.random() * 100))}
                className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              >
                Randomize Progress
              </Button>
            </div>
          </div>

          {/* Form Wrappers Showcase Section */}
          <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
            <CardHeader className="border-b border-zinc-800/50 pb-6">
              <CardTitle className="text-zinc-100 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live Form Wrappers Showcase
              </CardTitle>
              <p className="text-sm text-zinc-400 mt-1">
                Demonstrating all custom wrappers in a unified React Hook Form context.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {/* Left Column: Input controls */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputWrapper
                        control={form.control as any}
                        name="username"
                        label="Username"
                        type="text"
                        required
                        placeholder="Enter nickname"
                      />
                      <SelectWrapper
                        control={form.control as any}
                        name="role"
                        label="Primary Role"
                        required
                        options={[
                          { label: 'Developer', value: 'developer' },
                          { label: 'Designer', value: 'designer' },
                          { label: 'Product Manager', value: 'pm' },
                          { label: 'QA Engineer', value: 'qa' },
                        ]}
                      />
                    </div>

                    <DatePickerWrapper
                      control={form.control as any}
                      name="birthdate"
                      label="Birth Date"
                      required
                    />

                    <TextareaWrapper
                      control={form.control as any}
                      name="bio"
                      label="Biography Summary"
                      rows={2}
                      warning="Keep it brief and professional."
                    />

                    <SliderWrapper
                      control={form.control as any}
                      name="difficulty"
                      label="Skill Experience Level"
                      min={0}
                      max={100}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SwitchWrapper
                        control={form.control as any}
                        name="notifications"
                        label="Enable Email Alerts"
                      />
                      <CheckboxWrapper
                        control={form.control as any}
                        name="agreeTerms"
                        label="I accept terms and guidelines"
                        required
                      />
                    </div>

                    <FileUploadWrapper
                      control={form.control as any}
                      name="avatar"
                      label="User Profile Attachment"
                      accept=".jpg,.jpeg,.png,.pdf"
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white"
                    >
                      Submit Form Data
                    </Button>
                  </div>

                  {/* Right Column: Live values observer */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      <FileCode size={16} className="text-indigo-400" />
                      <span>Observer: Live State Values</span>
                    </div>
                    <pre className="flex-1 overflow-auto bg-black p-4 rounded-lg font-mono text-[11px] text-indigo-300 border border-zinc-900 leading-normal max-h-[480px]">
                      {JSON.stringify(getSerializableValues(formValues), null, 2)}
                    </pre>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Grid layout for showcase categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category: Primitives */}
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Primitives & Badges
                </CardTitle>
                <p className="text-xs text-zinc-500">Buttons, tags, tooltips, and alerts.</p>
              </CardHeader>
              <CardContent className="space-y-6 text-zinc-300">
                {/* Buttons Row */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Button Variants
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline" className="border-zinc-800">
                      Outline
                    </Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>

                {/* Badges Row */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Badges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline" className="border-zinc-800 text-zinc-300">
                      Outline
                    </Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                {/* Tooltips */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Interactive Tooltip
                  </h3>
                  <Tooltip>
                    <TooltipTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer">
                      Hover me
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-950 border border-zinc-800 text-white text-xs py-1.5 px-3 rounded-lg shadow-lg">
                      <p>This is a shadcn tooltip!</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Alert */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Alert
                  </h3>
                  <Alert className="bg-zinc-950/40 border-zinc-800 text-zinc-300">
                    <Info className="h-4 w-4 text-indigo-400" />
                    <AlertTitle className="text-indigo-400 font-semibold">
                      Information Alert
                    </AlertTitle>
                    <AlertDescription className="text-zinc-400 text-xs">
                      All tailwind utilities and CSS variables are loaded properly in the system.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Category: Status / Feedback */}
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-500" />
                  Status & Feedback
                </CardTitle>
                <p className="text-xs text-zinc-500">
                  Progress, Spinners, Skeletons, and Separators.
                </p>
              </CardHeader>
              <CardContent className="space-y-6 text-zinc-300">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Progress Loading</span>
                    <span>{progressValue}%</span>
                  </div>
                  <Progress value={progressValue} className="h-2 bg-zinc-950" />
                </div>

                {/* Spinners */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Spinners
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Spinner />
                      <span>Loading standard...</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                {/* Skeleton */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Skeletons
                  </h3>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-zinc-800" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[250px] bg-zinc-800" />
                      <Skeleton className="h-4 w-[200px] bg-zinc-800" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category: Layout & Navigation */}
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md md:col-span-2">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  Layout, Containers & Details
                </CardTitle>
                <p className="text-xs text-zinc-500">Tabs, Separators, and Accordions.</p>
              </CardHeader>
              <CardContent className="space-y-6 text-zinc-300">
                {/* Tabs */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Tabs
                  </h3>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="bg-zinc-950 border border-zinc-800 p-1 rounded-lg">
                      <TabsTrigger
                        value="account"
                        className="text-xs py-1 px-3 rounded-md transition-all data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
                      >
                        Account
                      </TabsTrigger>
                      <TabsTrigger
                        value="password"
                        className="text-xs py-1 px-3 rounded-md transition-all data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
                      >
                        Settings
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="pt-2 text-xs text-zinc-400">
                      Manage your profile information and active JWT tokens.
                    </TabsContent>
                    <TabsContent value="password" className="pt-2 text-xs text-zinc-400">
                      Configure MongoDB schemas and GraphQL endpoints.
                    </TabsContent>
                  </Tabs>
                </div>

                <Separator className="bg-zinc-800" />

                {/* Accordion */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Accordion
                  </h3>
                  <div className="space-y-4">
                    <details className="group border-b border-zinc-800 pb-3" open>
                      <summary className="flex justify-between items-center text-sm font-medium hover:text-indigo-400 py-3 text-zinc-200 cursor-pointer list-none">
                        <span>Is this showcase responsive?</span>
                        <ChevronDownIcon
                          size={16}
                          className="text-zinc-500 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <p className="text-xs text-zinc-400 pb-3 leading-relaxed">
                        Yes, all components are built using Tailwind responsive layouts and
                        mobile-first guidelines.
                      </p>
                    </details>
                    <details className="group border-b border-zinc-800 pb-3">
                      <summary className="flex justify-between items-center text-sm font-medium hover:text-indigo-400 py-3 text-zinc-200 cursor-pointer list-none">
                        <span>How is styling configured?</span>
                        <ChevronDownIcon
                          size={16}
                          className="text-zinc-500 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <p className="text-xs text-zinc-400 pb-3 leading-relaxed">
                        We use standard CSS variables mapped to Tailwind variables, allowing easy
                        dark/light mode setup.
                      </p>
                    </details>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
