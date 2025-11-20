// frontend/app/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/admin/orders", label: "Admin" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-50">
      <Link
        href="/"
        className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
      >
        Streamjar BNPL
      </Link>

      <div className="flex gap-6">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                "text-sm transition-colors pb-1 border-b-2 " +
                (isActive
                  ? "text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50 font-medium"
                  : "text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 hover:border-zinc-300 dark:hover:text-zinc-100")
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
