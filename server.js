const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Expense = require('./models/Expense');
const Entrada = require('./models/Entrada'); // Adicionando o modelo de Entrada
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta /public

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error(err));

// Rota para adicionar uma nova despesa
app.post('/despesas', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rota para listar todas as despesas
app.get('/despesas', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para adicionar uma nova entrada de dinheiro (salário, freelancer, etc.)
app.post('/entrada', async (req, res) => {
  try {
    const entrada = new Entrada(req.body); // Criando um novo documento de Entrada
    await entrada.save(); // Salvando no banco de dados
    res.status(201).send(entrada); // Retornando a entrada salva
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rota para listar todas as entradas
app.get('/entrada', async (req, res) => {
  try {
    const entradas = await Entrada.find(); // Buscando todas as entradas no banco
    res.status(200).send(entradas); // Retornando as entradas
  } catch (error) {
    res.status(500).send(error);
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
