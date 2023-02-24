const WebSocket = require('ws');
const fs = require('fs');
const readline = require('readline');

function FastExceptionHandler(_error) {
  this._err = _error

  /**
   * method to extract file path from stack
   * @param {*} string
   * @returns
   */
  this.extractFilePath = (string) => {
    const match = string.match(/(\/[A-Za-z0-9._-]+)/g);
    return match.reduce((path, item) => {
      path += item;
      return path;
    }, '');
  }

  /**
   * method to extract line no from stack trace
   * @param {*} string
   * @returns
   */
  this.extractLineNo = (string) =>{
    return string.split(':')[1];
  }

  /**
   * method to get file content
   * @param {*} file
   * @returns
   */
  this.getFileContent = (file) => {
    return new Promise((resolve) => {
      const fileContent = fs.createReadStream(file);
      const rl = readline.createInterface({
        input: fileContent,
        crlfDelay: Infinity,
      });

      const lines = {};
      let iterator = 1;

      rl.on('line', (line) => {
        if (line === '') {
          line = '==EMPTY==';
        }
        lines[iterator] = line;
        iterator += 1;
      });

      rl.on('close', () => resolve(lines));
    });
  }

  this.send = async() => {
    const stack = this._err.stack.split('\n');
    const exceptionName = stack[0].split(':')[0];
    const exceptionMessage = stack[0].split(':')[1];
    const file = this.extractFilePath(stack[1]);
    const line = this.extractLineNo(stack[1]);
    const filePath = `${file}:${line}`;
    const surroundingLine = this.extractLineNo(stack[1]);
    const snippetLineCount = 12;

    const lines = await this.getFileContent(file.split(':')[0]);
    let startLine = Math.max(surroundingLine - Math.floor(snippetLineCount / 2), 1);

    let endLine = startLine + (snippetLineCount - 1);

    if (endLine > Object.keys(lines).length) {
      endLine = Object.keys(lines).length;
      startLine = Math.max(endLine - (snippetLineCount - 1), 1);
    }

    try {
      const ws = new WebSocket('ws://localhost:23518');
      ws.on('open', () => {
        ws.send(JSON.stringify({ logType: 'js-exception', data:{ exceptionName, exceptionMessage, lines, startLine, endLine, surroundingLine, filePath} }));
      });
      return true;
    } catch (error) {
      return true;
    }
  };

  this.send();
}

module.exports = FastExceptionHandler;