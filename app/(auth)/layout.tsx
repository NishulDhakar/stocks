import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/batter-auth/auth";
import { GlassCard } from "@/components/ui/GlassCard";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() })

    if (session?.user) redirect('/')

    return (
        <main className="flex min-h-screen bg-background text-foreground overflow-hidden">
            {/* Left Section - Form */}
            <section className="w-full lg:w-[45%] flex flex-col justify-between p-8 lg:p-12 relative z-10">
                <Link href="/" className="flex items-center gap-2 mb-12">
                    <h1 className="text-2xl font-bold tracking-tighter text-gradient-gold">
                        Simple Invest
                    </h1>
                </Link>

                <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                    {children}
                </div>

                <div className="mt-8 text-sm text-muted-foreground text-center">
                    &copy; {new Date().getFullYear()} Wealth Inc. All rights reserved.
                </div>
            </section>

            {/* Right Section - Visuals */}
            <section className="hidden lg:flex w-[55%] bg-muted/5 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0" />

                <div className="relative z-10 p-12 max-w-2xl">
                    <GlassCard className="mb-8 border-primary/10 bg-card/40 backdrop-blur-md">
                        <blockquote className="text-2xl font-medium text-foreground leading-relaxed mb-6">
                            "The interface is simply stunning. It brings a level of clarity and sophistication to my portfolio that I haven't found anywhere else."
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-bold text-xl">
                                E
                            </div>
                            <div>
                                <cite className="not-italic font-semibold text-foreground block">Ethan Reynolds</cite>
                                <span className="text-sm text-muted-foreground">Private Investor</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl opacity-50" />
            </section>
        </main>
    )
}
export default Layout