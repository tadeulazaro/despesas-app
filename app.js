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
