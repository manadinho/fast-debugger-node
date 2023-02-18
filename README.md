# fast-debugger

By using `Fast Debugger`, you can expedite the process of troubleshooting NodeJS code and resolving issues.
First install `Fast Debugger` desktop application according your operating system.
Now you are ready to receive log data from `Laravel` or `Node` projects.

## download desktop application
[mac](https://drive.google.com/file/d/1LKXWI8x8jiLawN5b9qmv_pV3djYsAzh6/view?usp=share_link).
[windows](https://drive.google.com/file/d/1AmpOiaD7kWe1DetkNWuVTE4TNb6647Dq/view?usp=share_link).
[linux](https://drive.google.com/file/d/1zDwRCBDEgDSAYlzS4gD_8o6wKRkfDe4f/view?usp=share_link).


## installation

    npm i fast-debugger --save-dev
    
## Usage

To use Fast Debugger first require or import `fast-debugger`

```js
// es module import:
import fastDebugger from 'fast-debugger';

// commonjs import:
const fastDebugger = require('fast-debugger');
```

To log your data

```js
fastDebugger('FAST DEBUGGER IS WORKING');
```

You can specify flag to identify your specific log by chainig `flag()` method

```js
fastDebugger('FAST DEBUGGER IS WORKING').flag('FLAG TO IDENTIFY');
```

On log data you can see file name and line number from the `fastDebugger()` method is called. You can open file in `VSCODE` by simply clicking on file name.

## Note

If want to use `fastDebugger()` method without `require` or `import` statement. You can achieve this by `global` scope.
`Note: Be very careful with this approach`

In your entry file mostly is `index.js`

```js
global.fastDebugger = require('fast-debugger');
```
