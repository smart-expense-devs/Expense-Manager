// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { 
  Plus, LogOut, Edit2, Trash2, TrendingUp, TrendingDown,
  Wallet, PieChart as PieChartIcon, Calendar, Filter,
  ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag,
  Coffee, Car, Home, Heart, Book, MoreHorizontal, Sparkles,
  Download, Search, Bell, Settings, X
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import BottomNav from '../components/BottomNav';

interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Others'];

const categoryIcons: Record<string, any> = {
  Food: Coffee,
  Transport: Car,
  Entertainment: Sparkles,
  Shopping: ShoppingBag,
  Bills: Home,
  Healthcare: Heart,
  Education: Book,
  Others: MoreHorizontal,
};

const categoryGradients: Record<string, string> = {
  Food: 'from-orange-400 to-red-500',
  Transport: 'from-blue-400 to-indigo-500',
  Entertainment: 'from-purple-400 to-pink-500',
  Shopping: 'from-pink-400 to-rose-500',
  Bills: 'from-yellow-400 to-orange-500',
  Healthcare: 'from-green-400 to-emerald-500',
  Education: 'from-indigo-400 to-purple-500',
  Others: 'from-gray-400 to-slate-500',
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('thisMonth');

  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchExpenses();
    }
  }, [status, router]);

  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/expenses');
      const data = await res.json();
      if (res.ok) {
        setExpenses(data.expenses);
      }
    } catch (error) {
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingExpense
      ? `/api/expenses/${editingExpense._id}`
      : '/api/expenses';
    const method = editingExpense ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (res.ok) {
        toast.success(editingExpense ? 'Updated! ✨' : 'Added! 🎉');
        setShowAddModal(false);
        setEditingExpense(null);
        resetForm();
        fetchExpenses();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to save');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this expense?')) return;

    try {
      const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Deleted! 🗑️');
        fetchExpenses();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      amount: expense.amount.toString(),
      category: expense.category,
      description: expense.description,
      date: format(new Date(expense.date), 'yyyy-MM-dd'),
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      category: 'Food',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  const filteredExpenses = expenses
    .filter(exp => filterCategory === 'All' || exp.category === filterCategory)
    .filter(exp => exp.description.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const lastMonthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    const lastMonth = subMonths(new Date(), 1);
    return expDate >= startOfMonth(lastMonth) && expDate <= endOfMonth(lastMonth);
  });

  const lastMonthTotal = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const thisMonthTotal = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate >= startOfMonth(new Date()) && expDate <= endOfMonth(new Date());
  }).reduce((sum, exp) => sum + exp.amount, 0);

  const percentageChange = lastMonthTotal > 0 
    ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(1)
    : '0';

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (status === 'loading' || loading) {
    return (
     <div className="min-h-screen pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ExpenseFlow</h1>
                <p className="text-xs text-gray-500">Welcome back, {session?.user?.name?.split(' ')[0]}!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Balance */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={20} />
                <span className="text-sm font-medium opacity-90">Total Spent</span>
              </div>
              <p className="text-3xl font-bold mb-2">₹{totalAmount.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-sm">
                {Number(percentageChange) >= 0 ? (
                  <>
                    <TrendingUp size={16} />
                    <span>+{percentageChange}% from last month</span>
                  </>
                ) : (
                  <>
                    <TrendingDown size={16} />
                    <span>{percentageChange}% from last month</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                <ArrowDownRight size={16} />
                This Month
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">₹{thisMonthTotal.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Current month expenses</p>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="text-purple-600" size={24} />
              </div>
              <span className="text-indigo-600 text-sm font-semibold">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{filteredExpenses.length}</p>
            <p className="text-sm text-gray-500">Transactions recorded</p>
          </div>

          {/* Top Category */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <PieChartIcon className="text-orange-600" size={24} />
              </div>
              <span className="text-orange-600 text-sm font-semibold">Top</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {topCategories.length > 0 ? topCategories[0][0] : 'N/A'}
            </p>
            <p className="text-sm text-gray-500">
              ₹{topCategories.length > 0 ? topCategories[0][1].toLocaleString() : 0}
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Category Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat];
                const total = categoryTotals[cat] || 0;
                const percentage = totalAmount > 0 ? ((total / totalAmount) * 100).toFixed(0) : 0;
                
                return (
                  <div
                    key={cat}
                    className="group p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    onClick={() => setFilterCategory(cat)}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${categoryGradients[cat]} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={20} />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{cat}</p>
                    <p className="text-lg font-bold text-gray-900">₹{total.toLocaleString()}</p>
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${categoryGradients[cat]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setEditingExpense(null);
                  resetForm();
                  setShowAddModal(true);
                }}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                <span className="font-semibold">Add Expense</span>
              </button>
              
              <button 
                onClick={() => router.push('/budgets')}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <Wallet size={20} />
                <span className="font-semibold">Manage Budgets</span>
              </button>

              <button 
                onClick={() => router.push('/categories')}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <PieChartIcon size={20} />
                <span className="font-semibold">Manage Categories</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-4 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                <Download size={20} />
                <span className="font-semibold">Export Data</span>
              </button>
            </div>

            {/* Top Expenses */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Top Expenses</h4>
              <div className="space-y-2">
                {filteredExpenses.slice(0, 3).map((exp, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 truncate">{exp.description}</span>
                    <span className="font-semibold text-gray-900">₹{exp.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
              
              <div className="flex gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="All">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredExpenses.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-500 font-medium mb-2">No expenses found</p>
              <p className="text-gray-400 text-sm mb-4">Start tracking by adding your first expense</p>
              <button
                onClick={() => {
                  setEditingExpense(null);
                  resetForm();
                  setShowAddModal(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={18} />
                Add Expense
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredExpenses.map((expense) => {
                    const Icon = categoryIcons[expense.category];
                    return (
                      <tr key={expense._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {format(new Date(expense.date), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${categoryGradients[expense.category]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <Icon className="text-white" size={18} />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{expense.description}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-lg font-bold text-gray-900">₹{expense.amount.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleEdit(expense)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mr-2"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(expense._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fade-in">
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingExpense(null);
                resetForm();
              }}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingExpense ? 'Edit Expense' : 'Add New Expense'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const Icon = categoryIcons[cat];
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.category === cat
                            ? `border-indigo-600 bg-indigo-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={20} className={formData.category === cat ? 'text-indigo-600' : 'text-gray-600'} />
                        <p className="text-xs mt-1">{cat}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Lunch at restaurant"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingExpense(null);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  {editingExpense ? 'Update' : 'Add'}
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