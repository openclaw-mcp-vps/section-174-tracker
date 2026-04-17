import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline";
};

const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-emerald-500 text-black hover:bg-emerald-400",
  secondary:
    "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
  outline:
    "border border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-900",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          styles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
