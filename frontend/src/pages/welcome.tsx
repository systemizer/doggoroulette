import React, { useState } from "react";
import Websocket from "react-websocket";
import { Link } from "react-router-dom";
import { Button, Pane } from "evergreen-ui";
import { host } from "../config";

export default function App() {
  const [isQueueing, setQueue] = useState(false);

  async function openWebSocket() {
    setQueue(true);
  }

  async function handleQueueFromWebSocket() {}

  return (
    <Pane display="flex" height="100vh">
      <Pane margin="auto">
        <Button
          onClick={openWebSocket}
          isLoading={isQueueing}
          appearance="primary"
        >
          {" "}
          Start Chatting!{" "}
        </Button>
      </Pane>
      <Pane>
        {true && (
          <Websocket
            url={`ws://${host}/waiting`}
            onMessage={handleQueueFromWebSocket}
            debug={true}
          />
        )}
      </Pane>
    </Pane>
  );
}
