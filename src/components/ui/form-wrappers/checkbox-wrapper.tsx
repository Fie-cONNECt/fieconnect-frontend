'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import type { Control } from 'react-hook-form';

interface CheckboxWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  warning?: string;
}

export default function CheckboxWrapper({
  control,
  name,
  label,
  className,
  disabled = false,
  required = false,
  warning,
}: CheckboxWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-zinc-950/40 border-zinc-800">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
                className={className}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {required && <span className="text-red-500 mr-1">*</span>}
                {label}
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
          <span className="font-light">{warning}</span>
        </>
      )}
    />
  );
}
