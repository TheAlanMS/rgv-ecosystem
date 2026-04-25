"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex min-h-11 items-center border-b-2 px-4 text-[13px] font-body transition-colors mb-[-1px] ${
        isActive
          ? "text-gold border-gold font-medium"
          : "text-text-muted border-transparent hover:text-text-secondary"
      }`}
    >
      {children}
    </Link>
  );
}
