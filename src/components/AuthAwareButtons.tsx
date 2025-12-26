"use client";
import { useState, useEffect } from 'react';
import { createSPASaaSClient } from '@/lib/supabase/client';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from "next/link";

export default function AuthAwareButtons({ variant = 'primary' }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // 检测当前语言
    const currentLocale = typeof window !== 'undefined' ? (window.location.pathname.startsWith('/zh') ? 'zh' : 'en') : 'en';

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const supabase = await createSPASaaSClient();
                const { data: { user } } = await supabase.getSupabaseClient().auth.getUser();
                setIsAuthenticated(!!user);
            } catch (error) {
                console.error('Error checking auth status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return null;
    }

    // Navigation buttons for the header
    if (variant === 'nav') {
        return isAuthenticated ? (
            <Link
                href={`/${currentLocale}/app`}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
                {currentLocale === 'zh' ? '仪表板' : 'Dashboard'}
            </Link>
        ) : (
            <>
                <Link href={`/${currentLocale}/auth/login`} className="text-gray-600 hover:text-gray-900">
                    {currentLocale === 'zh' ? '登录' : 'Login'}
                </Link>
                <Link
                    href={`/${currentLocale}/auth/register`}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    {currentLocale === 'zh' ? '注册' : 'Sign Up'}
                </Link>
            </>
        );
    }

    // Primary buttons for the hero section
    return isAuthenticated ? (
        <Link
                href={`/${currentLocale}/app`}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
            >
                {currentLocale === 'zh' ? '仪表板' : 'Dashboard'}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
    ) : (
        <>
            <Link
                href={`/${currentLocale}/auth/register`}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
            >
                {currentLocale === 'zh' ? '免费开始构建' : 'Start Building Free'}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
                href="#features"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
                {currentLocale === 'zh' ? '了解更多' : 'Learn More'}
                <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
        </>
    );
}