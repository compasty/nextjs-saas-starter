// src/app/app/layout.tsx
import AppLayout from '@/components/AppLayout';
import AppLayout2 from '@/components/AppLayout2';
import { GlobalProvider } from '@/lib/context/GlobalContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    const layout = process.env.NEXT_PUBLIC_LAYOUT;
    return (
        <GlobalProvider>
            { layout === 'Layout2' ? <AppLayout2>{children}</AppLayout2> : <AppLayout>{children}</AppLayout> }
        </GlobalProvider>
    );
}