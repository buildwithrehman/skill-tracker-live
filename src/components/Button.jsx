import React from 'react';
import { cn } from '../utils/cn';

export const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90",
      outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
      ghost: "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
      danger: "bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
