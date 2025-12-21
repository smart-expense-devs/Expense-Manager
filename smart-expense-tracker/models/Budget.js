import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  monthlyLimit: {
    type: Number,
    required: true,
    default: 5000,
  },
  categoryLimits: {
    type: Map,
    of: Number,
    default: {},
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);