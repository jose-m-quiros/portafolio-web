"use client";

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useI18n } from './locale-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

export default function MoreMenu({ items }: { items: { href: string; label: string }[] }) {
  const { t } = useI18n();

  if (!items || items.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center px-2 py-1 rounded text-sm font-medium text-muted-foreground hover:text-primary data-[state=open]:bg-secondary/60 data-[state=open]:text-primary smooth-transition"
          aria-label={t('nav.more')}
        >
          {t('nav.more')} <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-44 border-border bg-background/100 shadow-lg"
      >
        {items.map((it) => (
          <DropdownMenuItem key={it.href} asChild className="cursor-pointer">
            <Link href={it.href} className="w-full text-sm">
              {it.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
