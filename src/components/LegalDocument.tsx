"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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
        <Card className="w-full max-w-4xl mx-auto my-8">
            <CardHeader>
                <h1 className="text-2xl font-bold text-center">{title}</h1>
            </CardHeader>
            <CardContent className="prose prose-blue max-w-none min-h-[200px]">
                {isLoading ? (
                    <div className="flex items-center justify-center h-[200px]">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : documentState.status === 'error' ? (
                    <div className="text-center text-red-600 py-8">
                        {documentState.error}
                    </div>
                ) : (
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>,
                            ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            p: ({ children }) => <p className="mb-4">{children}</p>,
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
