import LegalDocument from '@/components/LegalDocument';
import { notFound } from 'next/navigation';

const legalDocuments = {
    'privacy': {
        title: 'Privacy Notice',
        path: '/terms/privacy-notice.md'
    },
    'terms': {
        title: 'Terms of Service',
        path: '/terms/terms-of-service.md'
    },
    'refund': {
        title: 'Refund Policy',
        path: '/terms/refund-policy.md'
    }
} as const;

type LegalDocument = keyof typeof legalDocuments;

function isLegalDocument(document: string): document is LegalDocument {
    return document in legalDocuments;
}

interface LegalPageProps {
    document: string;
}

interface LegalPageParams {
    params: Promise<LegalPageProps>
}

export default async function LegalPage({ params }: LegalPageParams) {
    const { document } = await params;

    if (!isLegalDocument(document)) {
        notFound();
    }

    const { title, path } = legalDocuments[document];

    return (
        <LegalDocument
            title={title}
            filePath={path}
        />
    );
}
