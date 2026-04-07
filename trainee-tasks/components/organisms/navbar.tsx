"use client";
// simple navbar
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const navbarConfig = [
  {
    label: "Task1",
    href: "/",
  },
  {
    label: "Task2",
    href: "/task-2",
  },
  {
    label: "Task3",
    href: "/task-3",
  },
  {
    label: "Task4",
    href: "/video-assesment",
  },
  {
    label: "Easy",
    href: "/easy",
  },
  {
    label: "Intermediate",
    href: "/intermediate",
  },
  {
    label: "Debug JS",
    href: "/debuggingJS",
  },
  {
    label: "Debug React",
    href: "/debuggingReact",
  },
];
function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      className="flex justify-start px-16 items-center w-full gap-6 h-12 border-b border-gray-300 
    shadow"
    >
      {navbarConfig.map((navItem) => {
        const isActive = navItem.href === pathname;
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
    </nav>
  );
}

export default Navbar;