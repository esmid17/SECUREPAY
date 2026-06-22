const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

/**
 * Genera un Token JWT firmado con clave privada asimétrica (RS256).
 * 
 * TODO (Estudiante):
 * 1. Cargar el contenido de la clave privada 'private.pem' desde la raíz usando fs.readFileSync.
 * 2. Utilizar jwt.sign para firmar el payload (user).
 * 3. Configurar el algoritmo RS256 en la sección de opciones ({ algorithm: 'RS256', expiresIn: '1h' }).
 * 
 * @param {Object} user - Objeto con la información del usuario a firmar.
 * @returns {string} JWT Token firmado.
 */
function signToken(user) {
  const privateKey = fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8');
  const payload = {
    sub: user.id,
    name: user.email,
    ...user
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '2m'
  });
}

/**
 * Verifica un Token JWT utilizando la clave pública asimétrica (RS256).
 * 
 * TODO (Estudiante):
 * 1. Cargar el contenido de la clave pública 'public.pem' desde la raíz usando fs.readFileSync.
 * 2. Utilizar jwt.verify para validar y decodificar el token.
 * 3. Configurar y forzar el algoritmo RS256 en las opciones ({ algorithms: ['RS256'] }).
 * 
 * @param {string} token - Token JWT a verificar.
 * @returns {Object} Payload decodificado si es válido.
 */
function verifyToken(token) {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../public.pem'), 'utf8');
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}

module.exports = {
  signToken,
  verifyToken
};
