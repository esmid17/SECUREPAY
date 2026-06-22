class TransactionValidationService {
  validateAccounts(sender, receiver) {
    if (!sender) {
      throw new Error('Error de validación: La cuenta origen no existe en la base de datos.');
    }

    if (!receiver) {
      throw new Error('Error de validación: La cuenta destino no existe en la base de datos.');
    }
  }

  validateAmount(amount) {
    if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
      throw new Error('Error de validación: El monto a transferir debe ser un número mayor a cero.');
    }
  }

  validateSufficientBalance(sender, amount) {
    if (sender.balance < amount) {
      throw new Error(`Saldo insuficiente: La cuenta '${sender.accountAlpha}' tiene $${sender.balance.toFixed(2)}, requiere $${amount.toFixed(2)}.`);
    }
  }
}

module.exports = TransactionValidationService;
