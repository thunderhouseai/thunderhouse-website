import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl bg-[--color-surface] border border-[--color-border] px-4 py-3",
          "text-[--color-text] placeholder:text-[--color-muted] text-sm",
          "focus:outline-none focus:border-[--color-steel] transition-colors duration-200",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-xl bg-[--color-surface] border border-[--color-border] px-4 py-3",
          "text-[--color-text] placeholder:text-[--color-muted] text-sm resize-none",
          "focus:outline-none focus:border-[--color-steel] transition-colors duration-200",
          error && "border-red-500",
          className
        )}
        rows={5}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
);

Textarea.displayName = "Textarea";
