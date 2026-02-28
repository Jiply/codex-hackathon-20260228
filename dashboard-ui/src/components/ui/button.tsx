import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-ui inline-flex items-center justify-center whitespace-nowrap rounded-full border text-[10px] font-medium uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary/40 bg-primary/15 text-foreground hover:bg-primary/24",
        secondary: "border-secondary/80 bg-secondary/85 text-secondary-foreground hover:bg-secondary",
        outline: "border-border/80 bg-background/70 text-foreground hover:border-accent-foreground/25 hover:bg-accent/40",
        ghost: "border-transparent text-foreground/80 hover:border-border/80 hover:bg-accent/35",
        destructive: "border-rose-200 bg-rose-100/90 text-rose-700 hover:bg-rose-200/80",
      },
      size: {
        default: "h-9 px-4 py-1.5",
        sm: "h-8 px-3.5",
        lg: "h-10 px-5",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

console.log('[codex] loaded: dashboard-ui/src/components/ui/button.tsx');
