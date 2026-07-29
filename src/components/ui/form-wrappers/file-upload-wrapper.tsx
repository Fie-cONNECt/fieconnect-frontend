'use client';

import React, { useRef, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UploadCloud, File, X } from 'lucide-react';
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
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept={accept}
                  multiple={multiple}
                  disabled={disabled}
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />

                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => !disabled && fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-ui ${
                    dragActive
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/40 bg-muted/30 hover:bg-muted/50'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className ?? ''}`}
                >
                  <div className="p-3 bg-card border border-border rounded-full mb-3 text-primary">
                    <UploadCloud size={24} aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-caption text-muted-foreground mt-1">
                    {accept ? `Accepted formats: ${accept}` : 'Any files supported'}
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border border-border bg-card rounded-lg text-xs"
                      >
                        <div className="flex items-center gap-2 text-foreground min-w-0">
                          <File size={16} className="text-primary shrink-0" />
                          <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                          <span className="text-muted-foreground shrink-0">
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
                            className="text-muted-foreground hover:text-foreground transition-ui"
                            aria-label={`Remove ${file.name}`}
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
            <FormMessage className="text-xs font-medium text-destructive" />
            {warning && <span className="text-caption">{warning}</span>}
          </FormItem>
        );
      }}
    />
  );
}
