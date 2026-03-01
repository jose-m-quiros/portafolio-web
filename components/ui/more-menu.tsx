"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useI18n } from './locale-provider';

export default function MoreMenu({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center px-2 py-1 rounded text-sm font-medium text-muted-foreground hover:text-primary smooth-transition"
        aria-expanded={open}
      >
        {t('nav.more')} <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-popover border border-border rounded-md shadow-md z-50">
          <div className="py-1">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="block px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/40 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
