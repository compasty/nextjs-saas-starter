import createMiddleware from 'next-intl/middleware';

// 创建国际化中间件
export default createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh'],
  
  // 默认语言
  defaultLocale: 'en'
});

export const config = {
  // 匹配所有包含语言前缀的路由
  matcher: ['/', '/(zh|en)/:path*']
};
