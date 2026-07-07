'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Sparkles, Check, Info, ChevronDownIcon } from 'lucide-react';

export default function ComponentsShowcase() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchState, setSwitchState] = useState(true);
  const [progressValue, setProgressValue] = useState(65);

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

          {/* Grid layout for showcase categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category: Primitives */}
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Primitives & Badges
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  Buttons, tags, tooltips, and alerts.
                </CardDescription>
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

            {/* Category: Form Elements */}
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Form & Control Elements
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  Inputs, switches, sliders, and checkboxes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-zinc-300">
                {/* Text Input & Area */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-input" className="text-zinc-300">
                      Label & Text Input
                    </Label>
                    <Input
                      id="demo-input"
                      placeholder="Type something here..."
                      className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-700 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-textarea" className="text-zinc-300">
                      Textarea
                    </Label>
                    <Textarea
                      id="demo-textarea"
                      placeholder="Longer text description..."
                      rows={3}
                      className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-700"
                    />
                  </div>
                </div>

                {/* Switch & Checkbox */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="demo-switch"
                      checked={switchState}
                      onCheckedChange={setSwitchState}
                    />
                    <Label htmlFor="demo-switch" className="text-zinc-300">
                      Switch: {switchState ? 'ON' : 'OFF'}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="demo-checkbox" defaultChecked />
                    <Label htmlFor="demo-checkbox" className="text-zinc-300">
                      Checkbox (Checked)
                    </Label>
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-zinc-400 font-medium">
                    <span>Slider Value</span>
                    <span>{sliderValue}%</span>
                  </div>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    value={sliderValue}
                    onValueChange={(val) => {
                      setSliderValue(Array.isArray(val) ? (val as number[]) : [val as number]);
                    }}
                    className="w-full"
                  />
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
                <CardDescription className="text-zinc-500">
                  Progress, Spinners, Skeletons, and Separators.
                </CardDescription>
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
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  Layout & Containers
                </CardTitle>
                <CardDescription className="text-zinc-500">Tabs and Accordions.</CardDescription>
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
