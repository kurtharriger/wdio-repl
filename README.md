# Webdriver REPL

This enables starting a javascript repl in a running webdriver test.
## Demo Video
[![](https://i.ytimg.com/vi/kdM05ChhLQE/hqdefault.jpg)](https://www.youtube.com/watch?v=kdM05ChhLQE)

## Configuring atom

```
apm install Hydrogen
```

Open Atom Preferences
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

## Create and start a WdioRepl server from your test

See docs/example.js
