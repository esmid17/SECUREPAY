const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'https://78c8bfc732db0aaedee099da45920bff@o4511580770861056.ingest.us.sentry.io/4511580783771648',
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below.
    // userInfo: false,
    // httpBodies: [],
  },
});

module.exports = Sentry;
