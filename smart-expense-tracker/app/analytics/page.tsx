// app/analytics/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function AnalyticsPage() {
  const router = useRouter();

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
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-sm text-gray-500">Visualize your spending patterns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center animate-float">
              <TrendingUp className="text-indigo-600" size={40} />
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center animate-float delay-100">
              <PieChart className="text-purple-600" size={40} />
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl flex items-center justify-center animate-float delay-200">
              <BarChart3 className="text-pink-600" size={40} />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Analytics Coming Soon! 📊
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're working on beautiful charts and insights to help you understand your spending better.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="text-indigo-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Category Breakdown</h3>
              <p className="text-sm text-gray-600">Visual pie charts of your expenses</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Spending Trends</h3>
              <p className="text-sm text-gray-600">Track your expenses over time</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-pink-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Comparison Charts</h3>
              <p className="text-sm text-gray-600">Compare months and categories</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}