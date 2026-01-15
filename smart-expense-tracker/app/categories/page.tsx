// app/categories/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit2, Trash2, TrendingUp, Tag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import BottomNav from '../components/BottomNav';

interface CategoryData {
  name: string;
  icon: string;
  color: string;
  budget?: number;
}

const defaultCategories = [
  { name: 'Food', icon: '🍔', color: 'from-orange-400 to-red-500' },
  { name: 'Transport', icon: '🚗', color: 'from-blue-400 to-indigo-500' },
  { name: 'Entertainment', icon: '🎮', color: 'from-purple-400 to-pink-500' },
  { name: 'Shopping', icon: '🛍️', color: 'from-pink-400 to-rose-500' },
  { name: 'Bills', icon: '📄', color: 'from-yellow-400 to-orange-500' },
  { name: 'Healthcare', icon: '💊', color: 'from-green-400 to-emerald-500' },
  { name: 'Education', icon: '📚', color: 'from-indigo-400 to-purple-500' },
  { name: 'Others', icon: '📌', color: 'from-gray-400 to-slate-500' },
];

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryData[]>(defaultCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '📁',
    color: 'from-blue-400 to-indigo-500',
  });

  const colorOptions = [
    'from-orange-400 to-red-500',
    'from-blue-400 to-indigo-500',
    'from-purple-400 to-pink-500',
    'from-pink-400 to-rose-500',
    'from-yellow-400 to-orange-500',
    'from-green-400 to-emerald-500',
    'from-indigo-400 to-purple-500',
    'from-gray-400 to-slate-500',
    'from-cyan-400 to-blue-500',
    'from-teal-400 to-green-500',
  ];

  const iconOptions = ['🍔', '🚗', '🎮', '🛍️', '📄', '💊', '📚', '✈️', '🏠', '💰', '🎬', '☕', '🏋️', '🎨', '📱', '🎵'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.name === editingCategory.name ? formData : cat
      ));
      toast.success('Category updated! ✨');
    } else {
      setCategories([...categories, formData]);
      toast.success('Category added! 🎉');
    }

    setShowAddModal(false);
    setEditingCategory(null);
    resetForm();
  };

  const handleEdit = (category: CategoryData) => {
    setEditingCategory(category);
    setFormData(category);
    setShowAddModal(true);
  };

  const handleDelete = (categoryName: string) => {
    if (!confirm(`Delete ${categoryName} category?`)) return;
    
    setCategories(categories.filter(cat => cat.name !== categoryName));
    toast.success('Category deleted! 🗑️');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '📁',
      color: 'from-blue-400 to-indigo-500',
    });
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
                <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                <p className="text-sm text-gray-500">Manage your expense categories</p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingCategory(null);
                resetForm();
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Tag className="text-indigo-600" size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-sm text-gray-500">Total Categories</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-500">Active This Month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">Food</p>
            <p className="text-sm text-gray-500">Most Used</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">All Categories</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl border-2 border-gray-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Category Icon & Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-500">Expense Category</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.name)}
                    className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Groceries"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Choose Icon
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {iconOptions.map((icon, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`p-3 rounded-xl border-2 transition-all text-2xl ${
                        formData.icon === icon
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Choose Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`h-12 rounded-xl bg-gradient-to-br ${color} ${
                        formData.color === color
                          ? 'ring-4 ring-indigo-600 ring-offset-2'
                          : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs font-semibold text-gray-500 mb-2">Preview</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${formData.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                    {formData.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{formData.name || 'Category Name'}</p>
                    <p className="text-sm text-gray-500">Expense Category</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
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
                  {editingCategory ? 'Update' : 'Add'}
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