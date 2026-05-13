import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase",
        "bg-[--color-navy] text-[--color-steel] border border-[--color-border]",
        className
      )}
    >
      {children}
    </span>
  );
}
