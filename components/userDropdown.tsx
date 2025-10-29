'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Navitems from "./Navitems";

import { signOut } from "@/lib/actions/auth.actions";

// ✅ Browser-safe MD5 since Node crypto cannot be used in client components.
import md5 from "blueimp-md5";

interface UserDropdownProps {
  user: { name: string; email: string };
  initialStocks: StockWithWatchlistStatus[];
}

const UserDropdown = ({ user, initialStocks }: UserDropdownProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  // ✅ Generate stable avatar URLs (email → gravatar → fallback)
  const getAvatarUrl = (email: string, name: string, size = 80) => {
    const hash = md5(email.trim().toLowerCase());
    const gravatar = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404&r=pg`; // only show if exists
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=FACC15&color=000000&size=${size}&bold=true`;

    return { gravatar, fallback };
  };

  const { gravatar, fallback } = getAvatarUrl(user.email, user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-400 hover:text-yellow-500"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={gravatar}
              onError={(e: any) => {
                e.currentTarget.src = fallback;
              }}
            />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 font-bold">
              {user.name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="text-gray-300 min-w-[220px]">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={gravatar}
                onError={(e: any) => {
                  e.currentTarget.src = fallback;
                }}
              />
              <AvatarFallback className="bg-yellow-500 text-yellow-900 font-bold">
                {user.name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-200">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-600" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-gray-100 font-medium cursor-pointer hover:text-yellow-500"
        >
          <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
          Logout
        </DropdownMenuItem>

        <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />

        {/* Mobile Navigation */}
        <nav className="sm:hidden">
          <Navitems initialStocks={initialStocks} />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
