"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ScrollText } from 'lucide-react';

interface LegalDocumentProps {
    filePath: string;
    title: string;
}

type DocumentState =
    | { status: 'loading'; content: string; error: null; filePath: string }
    | { status: 'loaded'; content: string; error: null; filePath: string }
    | { status: 'error'; content: string; error: string; filePath: string };

const LegalDocument: React.FC<LegalDocumentProps> = ({ filePath, title }) => {
    const [documentState, setDocumentState] = useState<DocumentState>({
        status: 'loading',
        content: '',
        error: null,
        filePath,
    });

    useEffect(() => {
        const controller = new AbortController();

        fetch(filePath, { signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load document');
                }
                return response.text();
            })
            .then(text => {
                setDocumentState({ status: 'loaded', content: text, error: null, filePath });
            })
            .catch(error => {
                if (error instanceof DOMException && error.name === 'AbortError') return;
                console.error('Error loading markdown:', error);
                setDocumentState({
                    status: 'error',
                    content: '',
                    error: 'Failed to load document. Please try again later.',
                    filePath,
                });
            });

        return () => controller.abort();
    }, [filePath]);

    const isLoading = documentState.status === 'loading' || documentState.filePath !== filePath;

    return (
        <Card className="min-h-[calc(100vh-9rem)] overflow-hidden rounded-2xl border-secondary-200 bg-white/95 shadow-sm shadow-secondary-200/70">
            <div className="border-b border-secondary-100 bg-gradient-to-br from-white via-white to-primary-50/50 px-6 py-8 sm:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 text-primary-600">
                        <ScrollText className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">
                        Legal Resource
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-secondary-500">
                        Review the terms, policies, and service information that apply to this product.
                    </p>
                </div>
            </div>
            <CardContent className="min-h-[360px] px-6 py-8 sm:px-10 lg:px-12">
                {isLoading ? (
                    <div className="flex min-h-[360px] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                    </div>
                ) : documentState.status === 'error' ? (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-8 text-center text-sm font-medium text-red-600">
                        {documentState.error}
                    </div>
                ) : (
                    // Legal markdown is plain content, so element-level styles keep it aligned with the app theme.
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => <h1 className="mb-5 text-2xl font-bold tracking-tight text-secondary-900">{children}</h1>,
                            h2: ({ children }) => <h2 className="mt-10 border-t border-secondary-100 pt-8 text-xl font-semibold tracking-tight text-secondary-900">{children}</h2>,
                            h3: ({ children }) => <h3 className="mt-7 text-base font-semibold text-secondary-900">{children}</h3>,
                            p: ({ children }) => <p className="mt-4 text-[15px] leading-7 text-secondary-700">{children}</p>,
                            ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-7 text-secondary-700 marker:text-primary-500">{children}</ul>,
                            ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-[15px] leading-7 text-secondary-700">{children}</ol>,
                            li: ({ children }) => <li className="pl-1 marker:font-semibold marker:text-primary-500">{children}</li>,
                            a: ({ children, href }) => (
                                <a
                                    href={href}
                                    className="font-medium text-primary-700 underline decoration-primary-200 underline-offset-4 transition-colors hover:text-primary-800"
                                >
                                    {children}
                                </a>
                            ),
                            strong: ({ children }) => <strong className="font-semibold text-secondary-900">{children}</strong>,
                        }}
                    >
                        {documentState.content}
                    </ReactMarkdown>
                )}
            </CardContent>
        </Card>
    );
};

export default LegalDocument;
