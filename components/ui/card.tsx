import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-[#111821] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        className,
      )}
      {...props}
    />
  );
}
