// app/components/BottomNav.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Tag,
  Wallet,
  TrendingUp,
  Settings,
} from 'lucide-react';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      gradient: 'from-indigo-600 to-purple-600',
    },
    {
      name: 'Categories',
      icon: Tag,
      path: '/categories',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      name: 'Budgets',
      icon: Wallet,
      path: '/budgets',
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      name: 'Analytics',
      icon: TrendingUp,
      path: '/analytics',
      gradient: 'from-orange-600 to-red-600',
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
      gradient: 'from-gray-600 to-slate-600',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            // ✅ works for nested routes also
            const isActive = pathname.startsWith(item.path);

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all group"
              >
                {/* Active top indicator */}
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />
                )}

                {/* Icon */}
                <div
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg scale-110`
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:scale-105'
                  }`}
                >
                  <Icon size={20} />
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-semibold transition-colors ${
                    isActive
                      ? 'text-gray-900'
                      : 'text-gray-500 group-hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
