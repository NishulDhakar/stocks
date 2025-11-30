import { Sidebar } from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { auth } from "@/lib/batter-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) redirect('/sign-in');

    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image || undefined,
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex">
            <Sidebar />
            <div className="flex-1 flex flex-col lg:pl-64 min-h-screen transition-all duration-300">
                <TopBar user={user} />
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="flex-1 p-6 lg:p-8">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
    );
};

export default Layout;