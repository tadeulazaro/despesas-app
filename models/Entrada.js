const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Entrada = mongoose.model('Entrada', entradaSchema);

module.exports = Entrada;
