const TransactionValidationService = require('./transaction.validation.service');
const transactionStorageService = require('./transaction.storage.service');
const transactionNotificationService = require('./transaction.notification.service');

class TransactionService {
  constructor(validationService, storageService, notificationService) {
    this.validationService = validationService;
    this.storageService = storageService;
    this.notificationService = notificationService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    const sender = this.storageService.getUserByAccount(fromAccountId);
    const receiver = this.storageService.getUserByAccount(toAccountId);

    this.validationService.validateAccounts(sender, receiver);
    this.validationService.validateAmount(amount);
    this.validationService.validateSufficientBalance(sender, amount);

    this.storageService.updateBalances(sender, receiver, amount);

    const transaction = this.storageService.createTransactionRecord(fromAccountId, toAccountId, amount);
    this.storageService.persistTransaction(transaction);

    this.notificationService.sendTransferNotifications(sender, receiver, amount);

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction,
      balanceRestante: sender.balance
    };
  }

  getAccountBalance(accountId) {
    return this.storageService.getAccountBalance(accountId);
  }
}

module.exports = new TransactionService(
  new TransactionValidationService(),
  transactionStorageService,
  transactionNotificationService
);

