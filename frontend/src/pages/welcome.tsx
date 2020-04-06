import React, { useState } from "react";
import Websocket from "react-websocket";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Pane } from "evergreen-ui";
import { host } from "../config";
import { Chatroom } from "../models";

function App(props: RouteComponentProps) {
  const [isQueueing, setQueue] = useState(false);

  async function openWebSocket() {
    setQueue(true);
  }

  async function handleQueueFromWebSocket(data: string) {
    let result: Chatroom = JSON.parse(data);
    console.log(result);
    props.history.push(`/chat/${result["id"]}`);
  }

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
        {isQueueing && (
          <Websocket
            url={`ws://${host}/waiting`}
            onMessage={handleQueueFromWebSocket}
          />
        )}
      </Pane>
    </Pane>
  );
}

export default withRouter(App);
