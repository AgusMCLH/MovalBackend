import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // expires: 60 * 60 * 4,
    expires: 60 * 60 * 3,
  },
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
