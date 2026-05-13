import { cn } from "@/lib/utils";

interface BoltIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BoltIcon({ size = 16, color = "currentColor", className }: BoltIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("bolt-icon", className)}
      aria-hidden="true"
    >
      <path
        d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
