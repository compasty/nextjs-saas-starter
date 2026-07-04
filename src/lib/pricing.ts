export interface PricingTier {
    name: string;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
    cta: string;
    href: string;
    period: string;
}

export const pricingTiers: PricingTier[] = [
    {
        name: 'Basic',
        price: 99,
        description: 'Perfect for getting started',
        features: ['14 day free trial', '30 PDF files'],
        cta: 'Get Started',
        href: '/auth/register',
        period: '/month',
    },
    {
        name: 'Growth',
        price: 199,
        description: 'Best for growing teams',
        features: ['14 day free trial', '1000 PDF files'],
        popular: true,
        cta: 'Upgrade to Growth',
        href: '/auth/register?plan=growth',
        period: '/month',
    },
    {
        name: 'Max',
        price: 299,
        description: 'For enterprise-grade needs',
        features: ['14 day free trial', 'Unlimited PDF files'],
        cta: 'Start with Max',
        href: '/auth/register?plan=max',
        period: '/month',
    },
];

export const commonPricingFeatures = [
    'SSL security',
    'Unlimited updates',
    'Premium support',
];

class PricingService {
    static getAllTiers(): PricingTier[] {
        return pricingTiers;
    }

    static getCommonFeatures(): string[] {
        return commonPricingFeatures;
    }

    static formatPrice(price: number): string {
        return `$${price}`;
    }

}

export default PricingService;
