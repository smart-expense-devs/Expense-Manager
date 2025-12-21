
import mongoose from 'mongoose';


const saltRound=10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.user || mongoose.model('user', UserSchema);