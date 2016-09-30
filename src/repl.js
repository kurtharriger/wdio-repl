const Repl = require('nel/lib/server.js');
import vm from 'vm';
import { transform } from 'babel-core';
import { exists, readFileSync } from 'fs';

export class WdioRepl extends Repl {
  constructor(scriptRunner, scopedRequire, opts) {
    super({port: 3001, ...opts});
    this.scriptRunner = scriptRunner || vm.runInThisContext;
    this.require = scopedRequire || require;
  }

  getTransformOptions() {
    const babelrc = exists('.bablerc')
      ? JSON.parse(readFileSync('.babelrc', 'utf8'))
      : { presets: ['es2015', 'stage-0'] };
    return {
      ...babelrc,
      plugins: [
        "implicit-return",
        "transform-remove-strict-mode",
        ...(babelrc.plugins || [])
      ]
    };
  }

  transpile(code) {
    const transformOptions = this.getTransformOptions();
    // it is a syntax error to have an await outside of
    // an async function, but often in the repl I want
    // to execute a single line await statement.
    // To make this work I implicitly wrap the code in
    // an async function.

    // However import statements must appear at the
    // to of the file and wrapping the code will break
    // imports, so we only want to enable single await
    // outside async functions when your evaluating
    // a snippet not an entire script

    const wrapCode = !/import /.test(code);
    if(wrapCode) {
      const wrappedCode = `(async function __asyncWrapper() { ${code} })`;
      const transformedCode = transform(wrappedCode, transformOptions).code;
      // remove final ; and append call(this) AFTER babel transform
      // as babel will replace this with undefined
      // even with the transform-remove-strict-mode plugin
      return transformedCode.slice(0, -1) + '.call(this);';
    } else {
      return transform(code, transformOptions).code;
    }

  }

  run(code) {
    code = this.transpile(code);
    return this.scriptRunner(code);
  }

  waitUntilDone() {
    this.init();
    console.log('Repl started on port 3001');
    return new Promise((r) => {
      global.quit = r;
      global.require = this.require;
    });
  }
}

export default function repl(scriptRunner, require) {
  const repl = new WdioRepl(scriptRunner, require);
  return repl.waitUntilDone();
}
