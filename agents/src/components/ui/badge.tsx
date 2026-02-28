import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "font-ui inline-flex items-center rounded-sm border px-2.5 py-[3px] text-[9px] font-medium uppercase tracking-[0.2em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/45 bg-primary/16 text-primary",
        secondary: "border-secondary/85 bg-secondary/75 text-secondary-foreground",
        destructive: "border-destructive/45 bg-destructive/16 text-destructive",
        outline: "border-border/90 bg-background/55 text-foreground/85",
        success: "border-primary/50 bg-secondary/65 text-primary",
        warning: "border-accent-foreground/40 bg-accent/60 text-accent-foreground",
        info: "border-border/80 bg-background/78 text-foreground/85",
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

console.log("[codex] loaded: agents/src/components/ui/badge.tsx");
