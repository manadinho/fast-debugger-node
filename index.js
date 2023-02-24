/*
 *    Fast Debugger - Send data to desktop application to view and debug data
 *
 *    Copyright Squeeks <mimranisrar6@gmail.com>.
 *    This is free software licensed under the MIT License -
 */
const FastDebugger = require('./fast-debuggr');
const FastExceptionHandler = require('./fast-exception-handler');

function extractFilePath(string) {
  const match = string.match(/(\/[A-Za-z0-9._-]+)/g);
  return match.reduce((path, item) => {
    path += item;
    return path;
  }, '');
}

function extractLineNo(string) {
  return string.split(':')[1];
}

module.exports ={
    fast (...args) {
      const err = new Error();
      Error.captureStackTrace(err);
      const caller = err.stack.split('\n')[2];
      let file = extractFilePath(caller);
      let line = extractLineNo(caller);
      const filePath = `${file}:${line}`;
      return new FastDebugger(filePath, ...args);
    },
    exceptionHandler(_err) {
      if(_err instanceof Error){
        return new FastExceptionHandler(_err);
      }
    },

};