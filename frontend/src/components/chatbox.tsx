import React from "react";
import { Chat } from "../models";
import { Pane } from "evergreen-ui";

interface ChatboxProperties {
  chat: Chat;
}

export default function Chatbox(props: ChatboxProperties) {
  return (
    <Pane marginBottom="16px" paddingBottom="16px" borderBottom="solid 2px">
      <Pane>
        <b>{props.chat.username}</b>
      </Pane>
      <Pane>
        <img src={props.chat.image} />
      </Pane>
      <Pane>
        <i>{props.chat.message}</i>
      </Pane>
    </Pane>
  );
}
