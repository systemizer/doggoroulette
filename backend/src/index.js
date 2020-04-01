const express = require("express");
const app = express();
const PORT = 80;
const HOST = '0.0.0.0';
let expressWs = require('express-ws')(app);
const bodyParser = require('body-parser')
const path = require('path');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../../frontend/build')));

app.use(bodyParser.json())

app.ws('/chatting', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req);
  });

app.post("/input", ( req, res ) => {
    console.log(req.body);
    let aWss = expressWs.getWss('/chatting');

    aWss.clients.forEach(function (client) {
        client.send(JSON.stringify(req.body));
        });
    res.send("Post is ok");
});

// app.get("/", ( req, res ) => {
//     res.send("Hello world!");
// });

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../../frontend/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`server started at http:// ${PORT}`);
});
