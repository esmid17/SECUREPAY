const Sentry = require('@sentry/node');
require('dotenv').config();

const dsn = process.env.SENTRY_DSN;

Sentry.init({
  dsn,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development',
  release: process.env.npm_package_version || 'unknown'
});

module.exports = Sentry;
