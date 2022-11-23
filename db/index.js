const { Pool } = require('pg');

const { DATABASE_URL } = process.env;

const client = new Pool({
  connectionString: DATABASE_URL || 'https://localhost:5432/graceshopper'
})

module.exports = { client }

// test
