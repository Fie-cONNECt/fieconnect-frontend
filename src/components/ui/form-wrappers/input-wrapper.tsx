"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control } from "react-hook-form";

interface InputWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  type: string;
  className?: string;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  warning?: string;
}

export default function InputWrapper({
  control,
  name,
  label,
  type,
  className,
  placeholder,
  disabled = false,
  required = false,
  readonly = false,
  warning,
}: InputWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-2">
          <FormLabel
            className={
              type === "hidden"
                ? "hidden"
                : "text-sm font-semibold text-foreground"
            }
          >
            {required && (
              <span className="text-destructive mr-1" aria-hidden>
                *
              </span>
            )}
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={
                type === "number"
                  ? ""
                  : placeholder || `Enter ${label.toLowerCase()}`
              }
              className={className}
              disabled={disabled}
              readOnly={readonly}
              aria-required={required}
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
