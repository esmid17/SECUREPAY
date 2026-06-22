const Sentry = require('./src/instrument');
require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const jwtService = require('./src/services/jwt.service');

// Dev-only helper: issue a signed JWT for testing in the browser.
// Usage: GET /debug-token?user=usr_001&email=estudiante.alpha@espe.edu.ec
app.get('/debug-token', (req, res) => {
  try {
    const userId = req.query.user || 'usr_001';
    const email = req.query.email || 'estudiante.alpha@espe.edu.ec';
    const token = jwtService.signToken({ id: userId, email });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo generar el token', message: err.message });
  }
});

// Montar el enrutador principal en /v1
app.use('/v1', routes);

// Endpoint para verificar que Sentry captura errores operacionales
app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

// Endpoint base informativo
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'fintech-securepay-base',
    description: 'API base para evaluaciones de aplicaciones distribuidas (ESPE)',
    status: 'ONLINE'
  });
});

// El error handler de Sentry debe registrarse después de todas las rutas y controladores.
Sentry.setupExpressErrorHandler(app);

app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` Servidor Fintech ejecutándose en: http://localhost:${PORT}`);
  console.log(`   - Balance Alpha: GET http://localhost:${PORT}/v1/account-alpha/balance`);
  console.log(`   - Transferencia Beta: POST http://localhost:${PORT}/v1/transfer-beta/execute`);
  console.log(`======================================================\n`);
});
