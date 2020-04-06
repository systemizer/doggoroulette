const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
let expressWs = require("express-ws")(app);
const bodyParser = require("body-parser");
const path = require("path");

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/../../frontend/build")));

app.use(bodyParser.json());

app.ws("/waiting", function (ws, req) {
  let aWss = expressWs.getWss("/waiting");
  let otherClients = Array.from(aWss.clients).filter(client => ws !== client);

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

app.ws("/chat/*", function (ws, req) {
  ws.on("message", function (msg) {
    // console.log(msg);
  });
  //   console.log("socket", req);
});

app.post("/input", (req, res) => {
  // console.log(req.body);
  let aWss = expressWs.getWss(`/chat/${req.body.id}`);

  aWss.clients.forEach(function (client) {
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
