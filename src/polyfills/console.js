if(!window.console) window.console = { log: function() {} }
[
  "debug",
  "error",
  "info",
  "trace"
].map(k => { if(!console[k]) console[k] = console.log })
