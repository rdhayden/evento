import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import prisma from './db';
import { notFound } from 'next/navigation';
import { EventoEvent } from '@prisma/client';
import { unstable_cache } from 'next/cache';

/*
 clsx is a utility for constructing className strings conditionally
 e.g.
 className={clsx('hover:text-white relative transition', {
                'text-white': activePathname === route.path,
                'text-white/50': activePathname !== route.path,
              })}

 tailwind-merge (twMerge) is a utility for merging Tailwind CSS class names
 and handling conflicts
 e.g.
 className={twMerge(
        'text-3xl lg:text-6xl font-bold tracking-tight',
        className
      )}
 In this example if className contains any conflicting Tailwind classes
 they will override the default styles.

 The cn function combines both utilities to allow for conditional className
 generation that also handles Tailwind class conflicts.
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
