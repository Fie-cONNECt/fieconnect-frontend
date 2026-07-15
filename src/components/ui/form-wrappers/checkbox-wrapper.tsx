"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import type { Control } from "react-hook-form";

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
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-border p-4 bg-muted/30">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={className}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm font-semibold text-foreground">
              {required && (
                <span className="text-destructive mr-1" aria-hidden>
                  *
                </span>
              )}
              {label}
            </FormLabel>
          </div>
          <FormMessage className="text-xs font-medium text-destructive" />
          {warning && (
            <span className="text-xs font-light text-muted-foreground">
              {warning}
            </span>
          )}
        </FormItem>
      )}
    />
  );
}
