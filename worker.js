// worker.js
setInterval(() => {
    postMessage("Üzenet a Web Workertől: " + new Date().toLocaleTimeString());
  }, 1000);
  