import Header2 from "./Header2";
import Footer from "./Footer";

export default function AppLayout2({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header2 />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}