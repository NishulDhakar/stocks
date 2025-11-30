import { Github, Star } from "lucide-react";
import Link from "next/link";

export default function GithubButton() {
    return (
        <Link
            href="https://github.com/NishulDhakar/Simple-Invest"
            target="_blank"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            <Github className="h-4 w-4 text-foreground/80 group-hover:text-foreground transition-colors" />

            <span className="text-sm font-medium bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:to-foreground transition-all">
                Star on GitHub
            </span>

            <div className="flex items-center gap-1.5 pl-3 border-l border-white/10 ml-1">
                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-yellow-500/90">Star</span>
            </div>
        </Link>
    );
}
