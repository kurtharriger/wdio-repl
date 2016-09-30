#! /bin/bash

apm install hydrogen

if which jupyter; then
  ./node_modules/.bin/ijs --ijs-server="http://localhost:6001" --ijs-install-kernel
else

  ## NOTE: hydrogen and the kernel are both written in node
  ## so it may be possible to configure the kernelspec
  ## in hydrogen settigns without installing jupyter.
  ## Not tested but let me know if it works!
  ## Pull requests welcome!

  echo 'Jupyter not installed. Install jupyter or manunually configure the hydrogen plugin.'
fi
