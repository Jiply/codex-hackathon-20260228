import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const SidebarContext = React.createContext<{ collapsed: boolean } | null>(null);

function useSidebar(): { collapsed: boolean } {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider.");
  }
  return context;
}

function SidebarProvider({
  children,
  collapsed = false,
  className,
}: React.HTMLAttributes<HTMLDivElement> & { collapsed?: boolean }): JSX.Element {
  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <div className={cn("group/sidebar-wrapper flex h-full w-full overflow-hidden", className)}>{children}</div>
    </SidebarContext.Provider>
  );
}

const sidebarVariants = cva(
  "group/sidebar flex h-full shrink-0 flex-col border-r border-border/80 bg-background/75 backdrop-blur-sm transition-[width] duration-200",
  {
    variants: {
      collapsed: {
        true: "w-[82px]",
        false: "w-[310px]",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

function Sidebar({
  children,
  className,
}: React.HTMLAttributes<HTMLElement> & VariantProps<typeof sidebarVariants>): JSX.Element {
  const { collapsed } = useSidebar();
  return (
    <aside data-state={collapsed ? "collapsed" : "expanded"} className={cn(sidebarVariants({ collapsed }), className)}>
      {children}
    </aside>
  );
}

function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn("border-b border-border/70 px-4 py-3", className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn("flex min-h-0 flex-1 flex-col gap-4 overflow-auto px-3 py-3", className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn("border-t border-border/70 px-4 py-3", className)} {...props} />;
}

function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn("flex min-w-0 flex-1 flex-col overflow-hidden", className)} {...props} />;
}

function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <section className={cn("space-y-2", className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn(
        "px-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground group-data-[state=collapsed]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}

function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>): JSX.Element {
  return <ul className={cn("space-y-1", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>): JSX.Element {
  return <li className={cn("list-none", className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 rounded-sm border border-transparent px-2 py-2 text-left text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors",
  {
    variants: {
      active: {
        true: "border-border/80 bg-background/75 text-foreground",
        false: "hover:border-border/60 hover:bg-background/55 hover:text-foreground/85",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

function SidebarMenuButton({
  className,
  active,
  asChild = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    asChild?: boolean;
  }): JSX.Element {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(sidebarMenuButtonVariants({ active }), className)} {...props} />;
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
};
