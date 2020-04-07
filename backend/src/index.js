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
  console.log(
    `This is waiting, the length of the connections: ${waitingConnections.length}`
  );
  console.log();
  // let aWss = expressWs.getWss("/waiting");
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
  console.log(`This is chatting`);
  console.log(`This is the chatting path ${req.query.id}`);
  let hash_val = v4();
  console.log(`This is the uuid: ${hash_val}`);

  if (clientConnections[req.query.id] === undefined) {
    clientConnections[req.query.id] = { [hash_val]: ws };
  } else {
    clientConnections[req.query.id][hash_val] = ws;
  }

  ws.on("close", function () {
    delete clientConnections[req.query.id][hash_val];
  });
});

app.post("/input", (req, res) => {
  console.log(clientConnections);
  aWss = clientConnections[req.body.id];

  Object.values(aWss).forEach(function (client) {
    console.log(client);
    client.send(JSON.stringify(req.body));
  });
  res.send("Post is ok");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server started at http:// ${PORT}`);
});
