//@ts-check

let express = require('express');

const FRONTEND = `${__dirname}/../frontend`;

module.exports = app => {
const FRONTEND = `${__dirname}/../frontend`;
    app.use(express.static(`${FRONTEND}/dist`));
    app.use(express.static(`${FRONTEND}/res`));
};
