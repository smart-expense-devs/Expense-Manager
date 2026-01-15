// app/settings/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
  ArrowLeft, User, Bell, Lock, Moon, Globe, 
  HelpCircle, LogOut, ChevronRight, Shield 
} from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function SettingsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile', description: 'Manage your account details' },
        { icon: Lock, label: 'Password', description: 'Change your password' },
        { icon: Shield, label: 'Privacy', description: 'Privacy and security settings' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', description: 'Manage notification settings' },
        { icon: Moon, label: 'Appearance', description: 'Theme and display options' },
        { icon: Globe, label: 'Language', description: 'Change app language' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', description: 'Get help with the app' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500">Manage your app preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-2xl font-bold">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{session?.user?.name}</h2>
              <p className="text-white/80">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <item.icon className="text-indigo-600" size={20} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={20} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full mt-8 flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>

        {/* App Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>ExpenseFlow v1.0.0</p>
          <p className="mt-1">Made with ❤️ for better financial management</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}