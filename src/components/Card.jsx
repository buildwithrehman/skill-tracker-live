import React from 'react';
import { cn } from '../utils/cn';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-[var(--card)] text-[var(--card-foreground)] rounded-xl border border-[var(--border)] shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-6 flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
};
