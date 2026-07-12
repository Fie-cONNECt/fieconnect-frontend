'use client';

import React, { useRef, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UploadCloud, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Control } from 'react-hook-form';

interface FileUploadWrapperProps {
  control: Control<any>;
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  warning?: string;
}

export default function FileUploadWrapper({
  control,
  name,
  label,
  accept,
  multiple = false,
  className,
  disabled = false,
  required = false,
  warning,
}: FileUploadWrapperProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value;
        const files: File[] = Array.isArray(value) ? value : value ? [value] : [];

        const handleFiles = (fileList: FileList | null) => {
          if (!fileList || fileList.length === 0) return;
          const newFiles = Array.from(fileList);
          if (multiple) {
            field.onChange([...files, ...newFiles]);
          } else {
            field.onChange(newFiles[0]);
          }
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
          }
        };

        const handleRemoveFile = (indexToRemove: number) => {
          if (multiple) {
            const updated = files.filter((_, idx) => idx !== indexToRemove);
            field.onChange(updated.length > 0 ? updated : null);
          } else {
            field.onChange(null);
          }
        };

        return (
          <>
            <FormItem className="w-full">
              <FormLabel>
                {required && <span className="text-red-500 mr-1">*</span>}
                {label}
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  {/* Invisible input element */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                  />

                  {/* Drop zone container */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => !disabled && fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      dragActive
                        ? 'border-indigo-500 bg-indigo-950/20 shadow-lg'
                        : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-950/60'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                  >
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full mb-3 text-zinc-400">
                      <UploadCloud size={24} />
                    </div>
                    <p className="text-sm font-semibold text-zinc-200">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {accept ? `Accepted formats: ${accept}` : 'Any files supported'}
                    </p>
                  </div>

                  {/* File preview list */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border border-zinc-800 bg-zinc-900/60 rounded-lg text-xs"
                        >
                          <div className="flex items-center gap-2 text-zinc-300">
                            <File size={16} className="text-indigo-400" />
                            <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                            <span className="text-zinc-500">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          {!disabled && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(idx);
                              }}
                              className="text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
            <span className="font-light">{warning}</span>
          </>
        );
      }}
    />
  );
}
