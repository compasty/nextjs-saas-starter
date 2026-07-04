
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Scale } from 'lucide-react';
import Link from 'next/link';


export default function LegalPage() {


    return (
        <Card className="min-h-[calc(100vh-9rem)] overflow-hidden rounded-2xl border-secondary-200 bg-white/95 shadow-sm shadow-secondary-200/70">
            <CardContent className="flex min-h-[calc(100vh-9rem)] items-center justify-center p-8 sm:p-12">
                <div className="mx-auto max-w-xl text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 text-primary-600">
                        <Scale className="h-7 w-7" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">
                        Legal Center
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
                        Review our legal documents
                    </h1>
                    <p className="mt-4 text-sm leading-7 text-secondary-600">
                        Select a document from the navigation to read how we handle data, service terms, refunds, and cancellations.
                    </p>
                    <Link
                        href="/legal/privacy"
                        className="mt-8 inline-flex items-center rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
                    >
                        Start with Privacy Policy
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
