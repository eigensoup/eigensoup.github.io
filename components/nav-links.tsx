"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PencilUnderline } from "./sketches";

export function NavLinks({ items }: { items: { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex gap-x-5 sm:gap-x-7">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="plain smallcaps text-[1.1rem] text-pencil-ink hover:text-graphite aria-[current=page]:text-graphite"
            >
              {item.label}
            </Link>
            {active && <PencilUnderline className="pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full" />}
          </li>
        );
      })}
    </ul>
  );
}
