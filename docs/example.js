import { WdioRepl } from './src/repl.js'

class MyTest {
  abc = 123;

  async run() {
    const local = 'stuff';
    const repl = new WdioRepl(function(code) { return eval(code); }.bind(this), require, {debug:true});
    await repl.waitUntilDone();
  }
}

const test = new MyTest();
test.run();
