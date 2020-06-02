#!/bin/env node

// A simple script to create database tables

const container = require('./src/bootstrap')();

/**
 * Registering models for automatic table creation
 * The order in which models are registered matters. If a model
 * has a parent i.e. has a foreign key constraint, the parent needs to be registered first
 */
const models = [
  container.UserModel
];

/**
 * Automatically run create table queries against the database
 */
(() => {
  models.forEach(async (model) => {
    try {
      await model.init();
    } catch (error) {
      console.error(error);
    }
  });
})();
