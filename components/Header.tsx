import Link from "next/link";
import Image from "next/image";
import NavItems from "./Navitems";
import UserDropdown from "./userDropdown";
import { searchStocks } from "@/lib/actions/ finnhub.actions";


const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.svg"
            alt="TradX logo"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
          <h1 className="text-lg font-bold tracking-tight">
            Simple <span className="text-primary">Invest</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>

        {/* User Menu */}
        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};

export default Header;
