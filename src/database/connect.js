const { Pool } = require('pg');
const environment = require('env2');

if (process.env.NODE_ENV === 'test') {
  environment('./config-test.env');
} else {
  environment('./config.env');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: process.env.NODE_ENV === 'test' ? 1000 : 30000,
});

module.exports = pool;
