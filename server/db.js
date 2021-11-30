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
}

// format array worked into sql type
function formatArrayToSql(arr){
    let formatted = '{';

    arr.map(each =>{
        formatted += (each + ',');
    });

    formatted = formatted.substring(0, formatted.length - 1);
    formatted += '}';
    return formatted;
}

module.exports = {
    client, 
    connectdb, 
    formatArrayToSql,
}