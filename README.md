# fast-debugger

By using `Fast Debugger`, you can expedite the process of troubleshooting NodeJS code and resolving issues.
First install `Fast Debugger` desktop application according your operating system.
Now you are ready to receive log data from `Laravel` or `Node` projects.

## download desktop application
[mac](https://drive.google.com/file/d/1H5w6VxHysvQiOa-jqNHPYD_QJ5shfb6h/view?usp=share_link).
[windows](https://drive.google.com/file/d/1Qka8i_sho0fMh6jtlnyPs2SqmQfnwGBl/view?usp=share_link).
[linux](https://drive.google.com/file/d/1gMa93ujkEUpCzPdUkxivNilvNxkVQqZv/view?usp=share_link).


## installation

    npm i fast-debugger --save-dev
    
## Usage

To use Fast Debugger first require or import `fast-debugger`

```js
// es module import:
import { fast, exceptionHandler } from 'fast-debugger';

// commonjs import:
const { fast, exceptionHandler } = require('fast-debugger');
```

To log your data

```js
fast('FAST DEBUGGER IS WORKING');
```

You can specify flag to identify your specific log by chainig `flag()` method

```js
fast('FAST DEBUGGER IS WORKING').flag('FLAG TO IDENTIFY');
```

On log data you can see file name and line number from the `fast()` method is called. You can open file in `VSCODE` by simply clicking on file name.

## Note

If want to use `fast()` method without `require` or `import` statement. You can achieve this by `global` scope.
`Note: Be very careful with this approach`

In your entry file mostly is `index.js`

```js
const { fast } = require('fast-debugger');
global.fast = fast;
```

## Exception Handler

To handle or capture Exceptions. Here we have `Express.js` example. Create a middleware to handle exceptions.

```js
const { exceptionHandler } = require('fast-debugger');

module.exports = (_err, _req, _res, _next) => {
  exceptionHandler(_err);
};
```