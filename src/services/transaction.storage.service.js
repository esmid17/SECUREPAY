const usersDb = [
  { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.0 },
  { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.5 }
];

const transactionsHistory = [];

class TransactionStorageService {
  getUserByAccount(accountId) {
    return usersDb.find((user) => user.accountAlpha === accountId) || null;
  }

  getUserById(userId) {
    return usersDb.find((user) => user.id === userId) || null;
  }

  getUserByEmail(email) {
    return usersDb.find((user) => user.email === email) || null;
  }

  updateBalances(sender, receiver, amount) {
    sender.balance -= amount;
    receiver.balance += amount;
  }

  persistTransaction(transaction) {
    transactionsHistory.push(transaction);
    return transaction;
  }

  createTransactionRecord(fromAccountId, toAccountId, amount) {
    return {
      transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      from: fromAccountId,
      to: toAccountId,
      amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
  }

  getAccountBalance(accountId) {
    const account = usersDb.find((u) => u.accountAlpha === accountId);

    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }

    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }
}

module.exports = new TransactionStorageService();
