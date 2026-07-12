'use client';

import React, { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Control } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  warning?: string;
  showStrength?: boolean;
}

export default function PasswordWrapper({
  control,
  name,
  label,
  className,
  placeholder = '••••••••',
  disabled = false,
  required = false,
  readonly = false,
  warning,
  showStrength = false,
}: PasswordWrapperProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getStrength = (val: string) => {
    if (!val) return 0;
    let score = 0;
    if (val.length >= 9) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;
    return score;
  };

  const getStrengthMeta = (score: number) => {
    switch (score) {
      case 1:
        return { text: 'Weak', color: 'bg-red-500' };
      case 2:
        return { text: 'Medium', color: 'bg-orange-500' };
      case 3:
        return { text: 'Good', color: 'bg-yellow-500' };
      case 4:
        return { text: 'Strong', color: 'bg-emerald-500' };
      default:
        return { text: 'None', color: 'bg-zinc-800' };
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const val = field.value || '';
        const strength = getStrength(val);
        const meta = getStrengthMeta(strength);

        return (
          <>
            <FormItem className="w-full relative">
              <FormLabel>
                {required && <span className="text-red-500 mr-1">*</span>}
                {label}
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={`pr-10 ${className}`}
                    disabled={disabled}
                    readOnly={readonly}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {showStrength && val && (
                <div className="mt-2 space-y-1.5 animate-in fade-in duration-300">
                  <div className="flex gap-1.5 h-1">
                    {[1, 2, 3, 4].map((index) => {
                      const active = strength >= index;
                      return (
                        <div
                          key={index}
                          className={`flex-1 h-full rounded-full transition-all duration-300 ${
                            active ? meta.color : 'bg-zinc-800'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-400 font-medium px-0.5">
                    <span>Strength: {meta.text}</span>
                    <div className="flex gap-2">
                      <span className={val.length >= 9 ? 'text-emerald-400' : 'text-zinc-500'}>
                        9+ Chars
                      </span>
                      <span className={/[A-Z]/.test(val) ? 'text-emerald-400' : 'text-zinc-500'}>
                        Caps
                      </span>
                      <span className={/[0-9]/.test(val) ? 'text-emerald-400' : 'text-zinc-500'}>
                        Number
                      </span>
                      <span
                        className={/[^A-Za-z0-9]/.test(val) ? 'text-emerald-400' : 'text-zinc-500'}
                      >
                        Special
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <FormMessage />
            </FormItem>
            {warning && <span className="text-xs text-muted-foreground mt-1 block">{warning}</span>}
          </>
        );
      }}
    />
  );
}
