#!/bin/env node

const fs = require('fs');
const path = require('path');
const container = require('./src/bootstrap')();

const normalizedPath = path.join(__dirname, '/src/app/models');

const { db } = container;

/**
 * Automatically run create table queries against the database
 * This is a rather buggy module
 */
(() => {
  fs.readdirSync(normalizedPath).forEach((file) => {
    if (file !== 'base.js') {
      const Model = require(`${normalizedPath}/${file}`);
      new Model({ db }).init();
    }
  });
})();
