import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);