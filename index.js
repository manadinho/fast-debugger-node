/*
 *    Fast Debugger - Send data to desktop application to view and debug data
 *
 *    Copyright Squeeks <mimranisrar6@gmail.com>.
 *    This is free software licensed under the MIT License - 
 */
const FastDebugger = require('./fast-debuggr');

module.exports = function fast(...args) {
  const err = new Error();
  Error.captureStackTrace(err);
  const callerLine = err.stack.split('\n')[2];
  let filePath = callerLine.split('(')[1].replace(')', '');
  const index = filePath.lastIndexOf(':');
  if (index !== -1) {
    filePath = filePath.slice(0, index);
  }
  return new FastDebugger(filePath, ...args);
}; 
