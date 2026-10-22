"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PencilUnderline } from "./sketches";

export function NavLinks({ items }: { items: { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <ul className="-ml-1.5 flex flex-wrap sm:-mr-2 sm:ml-0 sm:gap-x-3">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <li key={item.href} className="relative">
            {/* padding gives a comfortable tap target without changing the visual rhythm */}
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="plain smallcaps block px-1.5 py-2 text-[1rem] sm:px-2 sm:text-[1.1rem] text-pencil-ink hover:text-graphite aria-[current=page]:text-graphite"
            >
              {item.label}
            </Link>
            {active && <PencilUnderline className="pointer-events-none absolute bottom-0.5 left-1.5 h-2 w-[calc(100%-0.75rem)] sm:left-2 sm:w-[calc(100%-1rem)]" />}
          </li>
        );
      })}
    </ul>
  );
}
