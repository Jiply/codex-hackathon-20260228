import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "font-ui flex h-9 w-full rounded-full border border-input/80 bg-background/75 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-[11px] file:font-medium placeholder:text-muted-foreground/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };

console.log("[codex] loaded: agents/src/components/ui/input.tsx");
