"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createSPASaaSClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { usePathname, useRouter } from 'next/navigation';

export default function Header2() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const pathname = usePathname();
    const router = useRouter();
    
    // 检测当前语言
    const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en';
    
    // 语言切换函数
    const switchLanguage = (newLocale: string) => {
        // 获取当前路径并替换语言前缀
        const newPath = pathname.replace(/^\/(en|zh)/, `/${newLocale}`) || `/${newLocale}`;
        router.push(newPath);
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const supabase = await createSPASaaSClient()
                const { data: { user } } = await supabase.getSupabaseClient().auth.getUser()
                setUser(user)
                setLoading(false)
            } catch (error) {
                console.error('Error getting user:', error)
                setLoading(false)
            }
        }
        getUser()
    }, [])

    const handleLogout = async () => {
        try {
            const client = await createSPASaaSClient();
            await client.logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    // 根据当前语言生成导航项
    const navItems = currentLocale === 'zh' ? [
        { href: "/", label: "首页" },
        ...(user ? [{ href: "/app", label: "仪表板" }] : []),
        { href: "/pricing", label: "价格" },
    ] : [
        { href: "/", label: "Home" },
        ...(user ? [{ href: "/app", label: "Dashboard" }] : []),
        { href: "/pricing", label: "Pricing" },
    ];

    const getInitials = (email: string) => {
        return email
            .split("@")[0]
            .slice(0, 2)
            .toUpperCase()
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex flex-1 justify-start">
                        <span className="text-xl font-bold">{process.env.NEXT_PUBLIC_PRODUCTNAME}</span>
                    </Link>
                    <nav className="flex items-center justify-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    {/* 语言切换按钮 */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant={currentLocale === 'en' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => switchLanguage('en')}
                            className="h-8 px-3 text-sm"
                        >
                            English
                        </Button>
                        <Button
                            variant={currentLocale === 'zh' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => switchLanguage('zh')}
                            className="h-8 px-3 text-sm"
                        >
                            中文
                        </Button>
                    </div>
                    {loading ? (
                        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.user_metadata?.avatar_url} />
                                        <AvatarFallback>
                                            {getInitials(user.email || "")}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user.user_metadata?.full_name || "User"}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/app/user-settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link href="/auth/login">Log in</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/auth/signup">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
