const express = require("express");
const app = express();
const port = 8080;

let expressWs = require('express-ws')(app);

app.ws('/chatting', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });

app.get("/", ( req, res ) => {
    res.send("Hello world!");
});

app.get("/rob", ( req, res ) => {
    var aWss = expressWs.getWss('/chatting');

    aWss.clients.forEach(function (client) {
        client.send('hello');
        });
    
    res.send("Hi Rob!");
});

app.listen( port, () => {
    console.log(`server started at http://localhost: ${port}`);
});