"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, FileText, ShieldAlert, RefreshCw } from 'lucide-react';

const legalDocuments = [
    {
        id: 'privacy',
        title: 'Privacy Policy',
        icon: ShieldAlert,
        description: 'How we handle and protect your data'
    },
    {
        id: 'terms',
        title: 'Terms of Service',
        icon: FileText,
        description: 'Rules and guidelines for using our service'
    },
    {
        id: 'refund',
        title: 'Refund Policy',
        icon: RefreshCw,
        description: 'Our policy on refunds and cancellations'
    }
];

export default function LegalLayout({ children } : { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-50/60 via-white to-secondary-50">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center rounded-full border border-secondary-200 bg-white/80 px-4 py-2 text-sm font-medium text-secondary-600 shadow-sm backdrop-blur transition-colors hover:border-primary-200 hover:text-primary-700"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </button>
                </div>

                <div className="grid items-stretch gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="flex">
                        <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-secondary-200 bg-white/90 shadow-sm shadow-secondary-200/70 backdrop-blur lg:min-h-[calc(100vh-9rem)]">
                            <div className="border-b border-secondary-100 bg-gradient-to-br from-white to-primary-50/40 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">Resources</p>
                                <h2 className="mt-2 text-lg font-semibold text-secondary-900">Legal Documents</h2>
                                <p className="mt-1 text-sm leading-6 text-secondary-500">Important information about our services</p>
                            </div>
                            <nav className="grid gap-2 p-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:flex-col lg:p-4">
                                {legalDocuments.map((doc) => {
                                    const href = `/legal/${doc.id}`;
                                    const isActive = pathname === href;

                                    return (
                                        <Link
                                            key={doc.id}
                                            href={href}
                                            className={`group rounded-xl border p-3 transition-all ${
                                                isActive
                                                    ? 'border-primary-200 bg-primary-50 text-primary-700 shadow-sm'
                                                    : 'border-transparent text-secondary-600 hover:border-secondary-200 hover:bg-secondary-50'
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className={`mt-0.5 rounded-lg border p-2 ${
                                                    isActive
                                                        ? 'border-primary-200 bg-white text-primary-600'
                                                        : 'border-secondary-200 bg-white text-secondary-400 group-hover:text-primary-600'
                                                }`}>
                                                    <doc.icon className="h-4 w-4" />
                                                </span>
                                                <div>
                                                    <div className="text-sm font-semibold">{doc.title}</div>
                                                    <div className="mt-1 text-xs leading-5 text-secondary-500">{doc.description}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
