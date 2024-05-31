const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://achrstphraton:pass123@cluster0.1jhdyjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
