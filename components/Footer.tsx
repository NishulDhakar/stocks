"use client";

import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";

const SOCIAL_LINKS = [
  {
    name: "Twitter",
    href: "https://twitter.com/nishuldhakar",
    icon: BsTwitterX,
    color: "hover:text-sky-500",
  },
  {
    name: "GitHub",
    href: "https://github.com/nishuldhakar",
    icon: FiGithub,
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/nishuldhakar",
    icon: FaLinkedinIn,
    color: "hover:text-blue-600",
  },
  {
    name: "Telegram",
    href: "https://t.me/nishuldev",
    icon: SiTelegram,
    color: "hover:text-blue-400",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-auto border-t border-white/5 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-xl font-bold tracking-tighter text-gradient-gold">
              Simple Invest
            </h2>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Premium analytics for the modern investor.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground transition-all duration-300 transform hover:scale-110 ${social.color}`}
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Nishul Dhakar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
