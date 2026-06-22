class TransactionNotificationService {
  sendTransferNotifications(sender, receiver, amount) {
    console.log(`\n--- [NOTIFICATION SERVICE] Enviando notificación de débito ---`);
    console.log(`Para: ${sender.email}`);
    console.log(`Asunto: Débito por Transferencia Realizada - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, se ha debitado de su cuenta ${sender.accountAlpha} el valor de $${amount.toFixed(2)}.`);
    console.log(`Su nuevo saldo disponible es: $${sender.balance.toFixed(2)}.`);
    console.log('------------------------------------------------------------\n');

    console.log(`\n--- [NOTIFICATION SERVICE] Enviando notificación de crédito ---`);
    console.log(`Para: ${receiver.email}`);
    console.log(`Asunto: Crédito por Transferencia Recibida - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, ha recibido una transferencia de $${amount.toFixed(2)} de la cuenta ${sender.accountAlpha}.`);
    console.log(`Su nuevo saldo disponible es: $${receiver.balance.toFixed(2)}.`);
    console.log('------------------------------------------------------------\n');
  }
}

module.exports = new TransactionNotificationService();
