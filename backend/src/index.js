const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
let expressWs = require("express-ws")(app);
const bodyParser = require("body-parser");
const path = require("path");
const hash = require("object-hash");
const { v4 } = require("uuid");

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/../../frontend/build")));

app.use(bodyParser.json());

let clientConnections = {};
let waitingConnections = [];

app.ws("/waiting", function (ws, req) {
  waitingConnections.push(ws);
  let otherClients = waitingConnections.filter(client => ws !== client);

  ws.on("close", function () {
    let waitingIndex = waitingConnections.indexOf(ws);
    if (waitingIndex !== -1) {
      waitingConnections.splice(waitingIndex, 1);
    }
  });

  if (otherClients.length === 0) {
    return;
  }

  let chatroom = {
    id: Math.floor(Math.random() * 100000)
  };
  // Send to other client
  otherClients[0].send(JSON.stringify(chatroom));
  // Send to current client
  ws.send(JSON.stringify(chatroom));
});

app.ws("/chat", function (ws, req) {
  //Hash once for performance reasons
  // let hash_val = v4();
  // clientConnections[req.query.id] = { [hash_val]: ws };

  if (clientConnections[req.query.id] === undefined) {
    clientConnections[req.query.id] = { [req.query.username]: ws };
  } else {
    clientConnections[req.query.id][req.query.username] = ws;
  }
  // Send who is connected, as soon as connection is made
  aWss = clientConnections[req.query.id];
  Object.values(aWss).forEach(function (client) {
    client.send(
      JSON.stringify({
        type: "connectionStatus",
        payload: Object.keys(clientConnections[req.query.id])
      })
    );
  });
  ws.on("close", function () {
    // Send who is connected, when connection is closed
    delete clientConnections[req.query.id][req.query.username];
    aWss = clientConnections[req.query.id];

    Object.values(aWss).forEach(function (client) {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: "connectionStatus",
            payload: Object.keys(clientConnections[req.query.id])
          })
        );
      }
    });
  });
});

app.post("/input", (req, res) => {
  aWss = clientConnections[req.body.id];

  Object.values(aWss).forEach(function (client) {
    client.send(JSON.stringify({ type: "message", payload: req.body }));
  });
  res.send("Post is ok");
});

app.get("/.well-known/acme-challenge/jXEn8hfFi-H_PP8mZbHWo8MaZ7T4ltajm3Ghd5cx65o", (req, res) => {
  res.sendFile(path.join(__dirname + "/challenge.txt"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server started at http:// ${PORT}`);
});
