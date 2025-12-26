import { redirect } from 'next/navigation';

// 根页面重定向到默认语言路径
export default function RootPage() {
  redirect('/en');
}
