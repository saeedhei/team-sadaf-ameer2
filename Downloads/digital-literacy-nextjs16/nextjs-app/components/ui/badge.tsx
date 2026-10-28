import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-colors duration-200 [&>svg]:size-3 gap-1',
  {
    variants: {
      variant: {
        neutral:
          'bg-white text-natural-text-main border-natural-border dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800',
        primary: 'bg-natural-brand-light text-natural-brand border-natural-border',
        success:
          'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/25 dark:text-emerald-300 dark:border-emerald-900/50',
        warning: 'bg-natural-beige text-[#F27D26] border-natural-border',
        locked:
          'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
