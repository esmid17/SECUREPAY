const jwtService = require('../services/jwt.service');

/**
 * Middleware de Autenticación para proteger las rutas de la Fintech.
 * 
 * TODO (Estudiante):
 * 1. Extraer la cabecera 'authorization'.
 * 2. Verificar que empiece con la palabra 'Bearer '.
 * 3. Extraer el token crudo y validarlo usando jwtService.verifyToken(token).
 * 4. Si el token es válido, adjuntar el payload al objeto 'req.user' y llamar a next().
 * 5. Si hay error en la validación (TokenExpiredError, JsonWebTokenError), capturar la excepción y responder 401/403.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Falta la cabecera Authorization en la petición.'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Formato de cabecera de autenticación debe ser Bearer <token>.'
    });
  }

  const token = parts[1];

  try {
    const decodedToken = jwtService.verifyToken(token);
    req.user = decodedToken;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'El token ha expirado. Por favor, inicie sesión nuevamente.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        error: 'Token inválido',
        message: 'La firma del token es inválida o el token está malformado.'
      });
    }

    return res.status(401).json({
      error: 'Token inválido o expirado',
      message: error.message
    });
  }
}

module.exports = authMiddleware;
