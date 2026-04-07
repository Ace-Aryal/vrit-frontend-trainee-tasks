"use client";
// simple navbar
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const navbarConfig = [
  {
    label: "Task 1",
    href: "/task-1",
  },
  {
    label: "Task 2",
    href: "/task-2",
  },
  {
    label: "Users Posts",
    href: "/users",
  },
  {
    label: "My Posts",
    href: "/my-posts",
  },
];
function Navbar() {
  const pathname = usePathname();
  return (
    <header
      className="flex justify-between md:justify-start px-2 sm:px-16 items-center w-full gap-3 sm:gap-6 h-12 border-b border-gray-300 sticky bg-white top-0 z-50
    shadow"
    >
      {navbarConfig.map((navItem) => {
        const isActive =
          navItem.href === pathname ||
          (pathname.includes(navItem.href) && pathname !== "/");
        return (
          <Link
            key={navItem.href}
            className={cn("font-medium rounded-lg px-2 py-1", {
              "bg-blue-100 text-blue-600": isActive,
            })}
            href={navItem.href}
          >
            {navItem.label}
          </Link>
        );
      })}
    </header>
  );
}

export default Navbar;
