// app/budgets/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingDown, TrendingUp, Wallet, Calendar, Plus, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import BottomNav from '../components/BottomNav';

interface Budget {
  category: string;
  limit: number;
  spent: number;
  icon: string;
  color: string;
}

export default function BudgetsPage() {
  const router = useRouter();
  const [currentMonth] = useState(format(new Date(), 'MMMM, yyyy'));
  const [showSetBudgetModal, setShowSetBudgetModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  
  const [budgets, setBudgets] = useState<Budget[]>([
    { category: 'Baby', limit: 500, spent: 80, icon: '🍼', color: 'from-orange-400 to-red-500' },
    { category: 'Education', limit: 500, spent: 0, icon: '📚', color: 'from-indigo-400 to-purple-500' },
    { category: 'Beauty', limit: 0, spent: 50, icon: '💄', color: 'from-pink-400 to-rose-500' },
    { category: 'Bills', limit: 0, spent: 0, icon: '📄', color: 'from-yellow-400 to-orange-500' },
    { category: 'Car', limit: 0, spent: 0, icon: '🚗', color: 'from-blue-400 to-indigo-500' },
  ]);

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudget - totalSpent;

  const handleSetBudget = (category: string) => {
    setSelectedCategory(category);
    const existing = budgets.find(b => b.category === category);
    setBudgetAmount(existing?.limit.toString() || '');
    setShowSetBudgetModal(true);
  };

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(budgetAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setBudgets(budgets.map(b => 
      b.category === selectedCategory 
        ? { ...b, limit: amount }
        : b
    ));

    toast.success('Budget updated! 💰');
    setShowSetBudgetModal(false);
    setBudgetAmount('');
  };

  const getProgressColor = (spent: number, limit: number) => {
    if (limit === 0) return 'bg-gray-300';
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressPercentage = (spent: number, limit: number) => {
    if (limit === 0) return 0;
    return Math.min((spent / limit) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
                <p className="text-sm text-gray-500">Manage your monthly budgets</p>
              </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center gap-4 bg-white rounded-xl px-6 py-3 border border-gray-200">
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <span className="text-2xl">←</span>
              </button>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{currentMonth}</p>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <span className="text-2xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <Wallet size={24} />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Budget</p>
                <p className="text-3xl font-bold">₹{totalBudget.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-3xl font-bold text-red-600">₹{totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-3xl font-bold text-green-600">₹{remaining.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Budgeted Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Budgeted Categories: {currentMonth}
          </h3>

          <div className="space-y-4">
            {budgets.filter(b => b.limit > 0).map((budget, index) => {
              const remaining = budget.limit - budget.spent;
              const percentage = getProgressPercentage(budget.spent, budget.limit);

              return (
                <div key={index} className="p-6 rounded-xl border-2 border-gray-100 hover:border-indigo-200 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${budget.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                        {budget.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{budget.category}</h4>
                        <div className="flex gap-4 text-sm mt-1">
                          <span className="text-gray-600">
                            Limit: <span className="font-semibold text-gray-900">₹{budget.limit.toFixed(2)}</span>
                          </span>
                          <span className="text-red-600">
                            Spent: <span className="font-semibold">₹{budget.spent.toFixed(2)}</span>
                          </span>
                          <span className="text-green-600">
                            Remaining: <span className="font-semibold">₹{remaining.toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{format(new Date(), 'MMM, yyyy')}</p>
                        <p className="text-2xl font-bold text-green-600">₹{budget.limit.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => handleSetBudget(budget.category)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(budget.spent, budget.limit)} transition-all duration-500 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>0%</span>
                      <span className="font-semibold">{percentage.toFixed(0)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Not Budgeted This Month */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Not Budgeted This Month</h3>

          <div className="space-y-3">
            {budgets.filter(b => b.limit === 0).map((budget, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${budget.color} rounded-xl flex items-center justify-center text-xl shadow`}>
                    {budget.icon}
                  </div>
                  <span className="font-semibold text-gray-900">{budget.category}</span>
                </div>

                <button
                  onClick={() => handleSetBudget(budget.category)}
                  className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all font-semibold"
                >
                  SET BUDGET
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Set Budget Modal */}
      {showSetBudgetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Budget</h2>
            <p className="text-gray-600 mb-6">Set monthly budget for {selectedCategory}</p>

            <form onSubmit={handleSaveBudget} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  placeholder="0.00"
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                <Calendar className="text-blue-600" size={20} />
                <span className="text-sm text-blue-900">
                  This budget will apply to <span className="font-bold">{currentMonth}</span>
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowSetBudgetModal(false);
                    setBudgetAmount('');
                  }}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Save Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}