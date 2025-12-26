'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import AuthAwareButtons from '@/components/AuthAwareButtons';

export default function Header() {
    const productName = process.env.NEXT_PUBLIC_PRODUCTNAME;
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Header');

    // 语言切换函数
    const switchLanguage = (newLocale: string) => {
        // 获取当前路径并替换语言前缀
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(/^\/(en|zh)/, `/${newLocale}`) || `/${newLocale}`;
        router.push(newPath);
    };

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              {productName}
            </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href={`/${locale}#features`} className="text-gray-600 hover:text-gray-900">
                {t('home')}
              </Link>

              <Link href={`/${locale}/pricing`} className="text-gray-600 hover:text-gray-900">
                {t('pricing')}
              </Link>

              {/* 语言切换按钮 */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    locale === 'en' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {t('english')}
                </button>
                <button
                  onClick={() => switchLanguage('zh')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    locale === 'zh' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {t('chinese')}
                </button>
              </div>

              <AuthAwareButtons variant="nav" />
            </div>
          </div>
        </div>
      </nav>
    )
}