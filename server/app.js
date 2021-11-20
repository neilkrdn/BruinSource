// main app

const express = require('express');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8000;

app.get('/', (req,res) => {
    res.send('hello world');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));