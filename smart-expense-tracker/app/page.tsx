// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Zap, PieChart, Bell, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ExpenseFlow
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-6 py-2.5 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ users</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Smart Finance
              </span>
              <br />
              <span className="text-gray-900">Made Simple</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Track expenses, manage budgets, and achieve your financial goals with AI-powered insights. Your money, your control.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/register" 
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 font-semibold">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">256-bit</div>
                <div className="text-sm text-gray-600">Encryption</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Animated Dashboard Preview */}
          <div 
            className="relative"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-xl bg-opacity-90">
              {/* Mini Dashboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-500">Monthly Overview</div>
                  <div className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <TrendingUp size={14} />
                    +12.5%
                  </div>
                </div>
                
                <div className="text-4xl font-bold text-gray-900">₹45,280</div>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-2xl">
                    <div className="text-indigo-600 mb-2">
                      <PieChart size={20} />
                    </div>
                    <div className="text-xs text-gray-600">Food</div>
                    <div className="text-lg font-bold text-gray-900">₹12K</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
                    <div className="text-purple-600 mb-2">
                      <Shield size={20} />
                    </div>
                    <div className="text-xs text-gray-600">Bills</div>
                    <div className="text-lg font-bold text-gray-900">₹8K</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-2xl">
                    <div className="text-pink-600 mb-2">
                      <Zap size={20} />
                    </div>
                    <div className="text-xs text-gray-600">Shopping</div>
                    <div className="text-lg font-bold text-gray-900">₹15K</div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3 pt-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Budget Used</span>
                      <span className="font-semibold text-gray-900">75%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Savings Goal</span>
                      <span className="font-semibold text-gray-900">60%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
              <Bell className="text-indigo-600" size={24} />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-2xl shadow-xl p-4 animate-float animation-delay-2000">
              <div className="text-xs font-medium">Budget Alert</div>
              <div className="text-lg font-bold">-15%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-gray-600">Powerful features to manage your finances</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp />,
              title: 'Smart Analytics',
              description: 'AI-powered insights into your spending patterns and habits',
              gradient: 'from-indigo-500 to-purple-500'
            },
            {
              icon: <Shield />,
              title: 'Bank-Level Security',
              description: '256-bit encryption keeps your financial data safe and secure',
              gradient: 'from-purple-500 to-pink-500'
            },
            {
              icon: <Bell />,
              title: 'Real-time Alerts',
              description: 'Get notified when you exceed budget limits or unusual spending',
              gradient: 'from-pink-500 to-rose-500'
            },
            {
              icon: <PieChart />,
              title: 'Budget Planning',
              description: 'Set and track budgets across multiple categories effortlessly',
              gradient: 'from-blue-500 to-indigo-500'
            },
            {
              icon: <Zap />,
              title: 'Auto Categorization',
              description: 'Expenses automatically sorted into the right categories',
              gradient: 'from-green-500 to-emerald-500'
            },
            {
              icon: <Sparkles />,
              title: 'Financial Goals',
              description: 'Set and achieve your savings goals with smart recommendations',
              gradient: 'from-orange-500 to-red-500'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are taking control of their finances with ExpenseFlow
            </p>
            <Link 
              href="/register" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>© 2026 ExpenseFlow. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}