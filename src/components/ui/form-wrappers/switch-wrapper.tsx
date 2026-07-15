"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import type { Control } from "react-hook-form";

interface SwitchWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  warning?: string;
}

export default function SwitchWrapper({
  control,
  name,
  label,
  className,
  disabled = false,
  required = false,
  warning,
}: SwitchWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-zinc-950/40 border-zinc-800">
          <div className="space-y-0.5">
            <FormLabel className="text-base">
              {required && <span className="text-red-500 mr-1">*</span>}
              {label}
            </FormLabel>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={className}
            />
          </FormControl>
          <FormMessage />
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
