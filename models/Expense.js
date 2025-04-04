const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
    //default: Date.now // Adiciona a data atual
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
