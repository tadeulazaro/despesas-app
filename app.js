// Seleção de elementos
const form = document.getElementById('expenseForm');
const expensesTable = document.getElementById('expensesTable').getElementsByTagName('tbody')[0];

// Função para adicionar uma despesa
function addExpense(description, amount) {
    const row = expensesTable.insertRow();
    const descriptionCell = row.insertCell(0);
    const amountCell = row.insertCell(1);
    
    descriptionCell.textContent = description;
    amountCell.textContent = `R$ ${amount.toFixed(2)}`;
}

// Evento de submit do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (description && amount) {
        addExpense(description, amount);
        form.reset();
    }
});
require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const transactionsRouter = require('./transactions'); // Importe o arquivo que contém as rotas

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Configurar a rota para transações
app.use('/api', transactionsRouter);

// Servir arquivos estáticos, como HTML, CSS e JS
app.use(express.static('public')); // Certifique-se de que a pasta 'public' está no mesmo nível de 'app.js'

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conexão com MongoDB bem-sucedida");
    // Iniciar o servidor na porta especificada no .env ou na porta 3000
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(error => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });


// Função para carregar as transações e atualizar os saldos
function loadTransactions() {
  fetch(`${API_URL}/transactions`)
    .then(response => response.json())
    .then(data => {
      const incomes = data.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.amount, 0);
      const expenses = data.filter(t => t.type === 'despesa').reduce((acc, t) => acc + t.amount, 0);

      const balance = incomes - expenses;

      // Atualizando os valores no frontend
      document.getElementById('total-incomes').textContent = `R$ ${incomes.toFixed(2)}`;
      document.getElementById('total-expenses').textContent = `R$ ${expenses.toFixed(2)}`;
      document.getElementById('balance').textContent = `R$ ${(balance).toFixed(2)}`;

      // Verifica se o saldo está negativo ou positivo e envia uma mensagem
      checkBalanceStatus(balance);

      // Atualiza o histórico de transações
      const list = document.getElementById('transactions-list');
      list.innerHTML = '';
      data.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.description} - R$ ${transaction.amount.toFixed(2)} (${transaction.type})`;
        list.appendChild(li);
      });
    });
}

// Função que verifica o saldo e exibe a mensagem de alerta
function checkBalanceStatus(balance) {
  const messageBox = document.getElementById('balance-message');
  
  if (balance < 0) {
    messageBox.textContent = "🚨 Alerta: Seu saldo está negativo! Precisa controlar suas despesas.";
    messageBox.style.color = "red";
  } else if (balance > 1000) { // Exemplo de limite positivo
    messageBox.textContent = "🎉 Parabéns! Seu saldo está positivo e saudável!";
    messageBox.style.color = "green";
  } else {
    messageBox.textContent = "";
  }
}






document.addEventListener('DOMContentLoaded', loadTransactions);
