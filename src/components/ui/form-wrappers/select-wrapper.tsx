"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Control } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SelectWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  warning?: string;
}

export default function SelectWrapper({
  control,
  name,
  label,
  options,
  placeholder,
  className,
  disabled = false,
  required = false,
  warning,
}: SelectWrapperProps) {
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
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className={className} disabled={disabled}>
                <SelectValue
                  placeholder={placeholder || `Select ${label.toLowerCase()}`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs font-medium text-destructive" />
          {warning && <span className="text-caption">{warning}</span>}
        </FormItem>
      )}
    />
  );
}
