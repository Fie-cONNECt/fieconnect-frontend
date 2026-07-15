"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Control } from "react-hook-form";

interface DatePickerWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  warning?: string;
}

export default function DatePickerWrapper({
  control,
  name,
  label,
  placeholder,
  className,
  disabled = false,
  required = false,
  warning,
}: DatePickerWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel>
            {required && <span className="text-red-500 mr-1">*</span>}
            {label}
          </FormLabel>
          <Popover>
            <PopoverTrigger
              className={cn(
                "inline-flex h-9 items-center justify-between rounded-md border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm font-normal text-zinc-100 hover:bg-zinc-800 transition-colors w-full cursor-pointer",
                !field.value && "text-zinc-500",
                className,
              )}
              disabled={disabled}
            >
              {field.value ? (
                format(new Date(field.value), "PPP")
              ) : (
                <span>{placeholder || "Pick a date"}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-zinc-950 border border-zinc-800 text-white"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                disabled={(date) => date < new Date("1900-01-01")}
              />
            </PopoverContent>
          </Popover>
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
