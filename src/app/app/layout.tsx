// src/app/app/layout.tsx
// import AppLayout from '@/components/AppLayout';
import AppLayout2 from '@/components/AppLayout2';
import { GlobalProvider } from '@/lib/context/GlobalContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <GlobalProvider>
            {/* <AppLayout>{children}</AppLayout> */}
            <AppLayout2>{children}</AppLayout2>
        </GlobalProvider>
    );
}