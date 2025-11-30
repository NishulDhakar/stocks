
import NavItems from "./Navitems";
import UserDropdown from "./userDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

import GithubButton from "./GithubButton";

interface TopBarProps {
    user: User;
}

export default async function TopBar({ user }: TopBarProps) {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-xl px-8">
            {/* Navigation */}
            <nav className="hidden sm:block">
                <NavItems initialStocks={initialStocks} />
            </nav>

            {/* Right Side - Notifications & User */}
            <div className="flex items-center gap-6">
                <GithubButton />

                {/* User Menu */}
                <UserDropdown user={user} initialStocks={initialStocks} />
            </div>
        </header>
    );
}
