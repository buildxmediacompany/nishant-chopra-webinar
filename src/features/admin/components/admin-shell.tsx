"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  MessageSquareQuote,
  Images,
  Gift,
  Sparkles,
  Users,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/webinars", label: "Webinars", icon: Video },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/testimonial-screenshots", label: "Review Screenshots", icon: Images },
  { href: "/admin/bonuses", label: "Bonuses", icon: Gift },
  { href: "/admin/features", label: "Why It Works", icon: Sparkles },
  { href: "/admin/audience", label: "Who It's For", icon: Users },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-stage">
      <aside className="hidden w-64 shrink-0 border-r border-stage-line bg-stage-raised px-4 py-6 sm:block">
        <p className="px-2 font-display text-lg font-semibold text-cream">Admin Panel</p>
        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-cream-dim transition-colors hover:bg-stage hover:text-cream",
                  active && "bg-marigold-dim text-marigold"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-stage-line px-6 py-4">
          <p className="text-sm text-cream-dim">
            Signed in as <span className="text-cream">{userName}</span>
          </p>
          <button
            onClick={async () => {
              await signOut();
              router.push("/admin/login");
              router.refresh();
            }}
            className="inline-flex items-center gap-1.5 text-sm text-cream-dim transition-colors hover:text-sindoor"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
