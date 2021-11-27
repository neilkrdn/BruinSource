const { Client } = require('pg');
const { query } = require('express');
const { resolveSoa } = require('dns');
require('dotenv').config()

// create global client object that links postgres to node js
const client = new Client({
    connectionString: process.env.DB_STRING,
    ssl: {
      rejectUnauthorized: false
    }
  });

function connectdb() {
    // connect to postgres
    console.log('Connecting to Postgres...');
    console.log(process.env.DB_STRING);
    client.connect();

    /*
    Thought -- 
    When app is started for demo we can have this function have the hard coded database with all the data
    */
}

module.exports = {
    client, 
    connectdb
}