'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import type { Control } from 'react-hook-form';

interface SliderWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  warning?: string;
}

export default function SliderWrapper({
  control,
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled = false,
  required = false,
  warning,
}: SliderWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const val = typeof field.value === 'number' ? field.value : min;
        return (
          <FormItem className="w-full">
            <div className="flex justify-between items-center mb-2">
              <FormLabel>
                {required && <span className="text-red-500 mr-1">*</span>}
                {label}
              </FormLabel>
              <span className="text-xs text-zinc-400 font-semibold">{val}</span>
            </div>
            <FormControl>
              <Slider
                min={min}
                max={max}
                step={step}
                value={[val]}
                onValueChange={(valArray) => {
                  const nextVal = Array.isArray(valArray) ? valArray[0] : valArray;
                  field.onChange(nextVal);
                }}
                disabled={disabled}
                className={className}
              />
            </FormControl>
            <FormMessage />
            {warning && <span className="text-xs font-light text-muted-foreground">{warning}</span>}
          </FormItem>
        );
      }}
    />
  );
}
