import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "font-ui inline-flex items-center rounded-full border px-2.5 py-[3px] text-[9px] font-medium uppercase tracking-[0.2em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/35 bg-primary/15 text-primary",
        secondary: "border-secondary/70 bg-secondary/70 text-secondary-foreground",
        destructive: "border-rose-200 bg-rose-100/85 text-rose-700",
        outline: "border-border/90 bg-background/55 text-foreground/85",
        success: "border-emerald-200/85 bg-emerald-50 text-emerald-700",
        warning: "border-amber-200/85 bg-amber-50 text-amber-700",
        info: "border-sky-200/85 bg-sky-50 text-sky-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps): JSX.Element {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

console.log('[codex] loaded: dashboard-ui/src/components/ui/badge.tsx');
