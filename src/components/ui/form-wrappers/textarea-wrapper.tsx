'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { Control } from 'react-hook-form';

interface TextareaWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  rows?: number;
  warning?: string;
}

export default function TextareaWrapper({
  control,
  name,
  label,
  className,
  placeholder,
  disabled = false,
  required = false,
  readonly = false,
  rows = 3,
  warning,
}: TextareaWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-2">
          <FormLabel className="text-sm font-semibold text-foreground">
            {required && (
              <span className="text-destructive mr-1" aria-hidden>
                *
              </span>
            )}
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              className={className}
              disabled={disabled}
              readOnly={readonly}
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs font-medium text-destructive" />
          {warning && <span className="text-caption">{warning}</span>}
        </FormItem>
      )}
    />
  );
}
