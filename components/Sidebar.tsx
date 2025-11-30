"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    LineChart,
    Newspaper,
    Settings,
    Star,
    LogOut
} from "lucide-react";
import { authClient } from "@/lib/batter-auth/auth-client";
import { useRouter } from "next/navigation";

const navItems = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Watchlist",
        href: "/watchlist",
        icon: Star,
    },
    {
        label: "Markets",
        href: "/markets",
        icon: LineChart,
    },
    {
        label: "News",
        href: "/news",
        icon: Newspaper,
    },

];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/sign-in");
    };

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-background/50 backdrop-blur-xl hidden lg:flex flex-col">
            <div className="flex h-20 items-center px-8">
                <h1 className="text-2xl font-bold tracking-tighter text-gradient-gold">
                    Simple Invest
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                            <span>{item.label}</span>
                        </Link>


                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
