# Webdriver REPL

This enables starting a javascript repl in a running webdriver test.
## Demo Video
[![](https://i.ytimg.com/vi/kdM05ChhLQE/hqdefault.jpg)](https://www.youtube.com/watch?v=kdM05ChhLQE)

npm install @kurtharriger/wdio-repl

## Create and start a WdioRepl server from your test

See docs/example.js


## Configuring atom


```
apm install Hydrogen

```


`npm install -g @kurtharriger/wdio-repl`

    If you do not want to install globally use a full path to wdio-kernel in
    the kernel spec below. If you want to run from source `npm link` will add
    wdio-kenel to path.

Open Atom Preferences:  
Select Packages  
Search for Hydrogen  
Click Settings  
Paste the following into the `Kernel Specs` setting:  

```
{
  "kernelspecs": {
    "wdio-repl": {
      "spec": {
        "language": "javascript",
        "display_name": "Connect to a javascript server",
        "env": {},
        "argv": [
          "wdio-kernel",
          "--server=http://localhost:6001"
          "{connection_file}",
          "--protocol=5.0"
        ]
      }
    }
  }
}
```
