'use client';

import React from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { Control } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

interface NativeSelectWrapperProps {
  control: Control<any>;
  name: string;
  options: Option[];
  className?: string;
  disabled?: boolean;
}

export default function NativeSelectWrapper({
  control,
  name,
  options,
  className,
  disabled = false,
}: NativeSelectWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <select
              {...field}
              disabled={disabled}
              className={`w-full h-11 rounded-xl bg-background border border-border text-sm px-3 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 cursor-pointer ${className ?? ''}`}
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                  {opt.label}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage className="text-xs font-medium text-destructive" />
        </FormItem>
      )}
    />
  );
}
