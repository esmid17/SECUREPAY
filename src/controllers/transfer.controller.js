const Sentry = require('@sentry/node');
const transactionService = require('../services/transaction.monolith.service');

/**
 * Endpoint para ejecutar una transferencia bancaria (Beta).
 * POST /v1/transfer-beta/execute
 * 
 * Espera un cuerpo JSON con: { fromAccountId, toAccountId, amount }
 */
function executeTransfer(req, res) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    if (!fromAccountId || !toAccountId || amount === undefined) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
      });
    }

    if (!req.user || !req.user.sub) {
      return res.status(401).json({
        error: 'Acceso no autorizado',
        message: 'El usuario no está autenticado correctamente.'
      });
    }

    // Simular un fallo operacional interno para Sentry en el endpoint Beta
    if (req.body.forceDatabaseFailure === true) {
      const error = new Error('Conexión interrumpida con el Clúster de Datos SecurePay');
      error.isOperational = true;
      throw error;
    }

    const result = transactionService.executeTransfer(fromAccountId, toAccountId, Number(amount));
    return res.status(200).json(result);
  } catch (error) {
    if (error.message.includes('Conexión interrumpida')) {
      if (req.user && req.user.sub) {
        Sentry.setTag('user.id', req.user.sub);
      }
      Sentry.captureException(error);
      return res.status(500).json({
        error: 'Error operacional interno',
        message: error.message
      });
    }

    return res.status(400).json({
      error: 'Error en la transacción',
      message: error.message
    });
  }
}

module.exports = {
  executeTransfer
};
