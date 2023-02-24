const WebSocket = require('ws');

function FastDebugger(filePath, ...args) {
  this.filePath = filePath;
  this.args = args;
  this._flag = null;

  this.flag = (value = null) => {
    if (!['number', 'string'].includes(typeof value)) {
      return this;
    }
    this._flag = value;

    return this;
  };

  this.generateData = () => {
    try {
      return this.args.map((arg) => {
        if (Array.isArray(arg)) {
          const _data = arg.map((_arg) => {
            // TO CHECK SEQUELIZE OBJEC
            if (_arg.hasOwnProperty('dataValues')) {
              return { sequelize: { data: _arg.dataValues } };
            }
            return _arg;
          });

          return { array: _data };
        }

        if (typeof arg === 'object') {
          // TO CHECK SEQUELIZE OBJEC
          if (arg.hasOwnProperty('dataValues')) {
            return {
              sequelize: {
                tableName: arg._modelOptions.tableName,
                data: arg.dataValues,
              },
            };
          }
        }

        return { [typeof arg]: arg };
      });
    } catch (error) {
    }
  };

  this.send = () => {
    if (!this.args.length) {
      return true;
    }

    try {
      const ws = new WebSocket('ws://localhost:23518');
      ws.on('open', () => {
        const data = this.generateData();
        ws.send(JSON.stringify({ logType: 'js', flag: this._flag, filePath: this.filePath, data }));
      });
      return true;
    } catch (error) {
      return true;
    }
  };

  this.send();
}

module.exports = FastDebugger;