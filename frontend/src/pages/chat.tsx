import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Pane, Button, TextInput } from "evergreen-ui";
import Websocket from "react-websocket";
import GiphySelect from "react-giphy-select";
import "react-giphy-select/lib/styles.css";
import { host } from "../config";
import { Chat, ChatroomParams } from "../models";
import Chatbox from "../components/chatbox";

const giphyAPIKey = "b9tcNs4yQdwq97FKiEf1Y3NCeFntP73G";

function App(props: RouteComponentProps<ChatroomParams>) {
  function randUsername() {
    return "corgie" + Math.floor(Math.random() * 100000);
  }

  interface Entry {
    images: {
      original: {
        url: string;
      };
    };
  }

  const [chats, setChats] = useState<Chat[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(randUsername());
  const [giph, setGiph] = useState("");

  async function handleClick() {
    let response = await fetch("/input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input,
        username: username,
        image: giph,
        id: props.match.params.id
      })
    });
    setInput("");
    setGiph("");
  }

  async function handleDataFromWebSocket(data: string) {
    let result: Chat = JSON.parse(data);
    // chats.push(result);
    setChats([result].concat(chats));
    console.log(chats);
  }

  async function handleEntry(entry: Entry) {
    setGiph(entry.images.original.url);
  }

  return (
    <Pane display="flex" justifyContent="flex-start">
      <Pane padding="16px">
        <p>Welcome to doggoroulette, {username}!</p>
        <Websocket
          url={`ws://${host}/chat?id=${props.match.params.id}`}
          onMessage={handleDataFromWebSocket}
        />
        {/* # subscribe to chatting endpoint */}
        Let's chat:
        <TextInput
          placeholder="Say a hello!..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
        />
        <GiphySelect requestKey={giphyAPIKey} onEntrySelect={handleEntry} />
        <Button onClick={handleClick} appearance="primary">
          {" "}
          Send Request to API{" "}
        </Button>
      </Pane>

      <Pane flex={1}>
        {chats.map((chat, index) => (
          <Chatbox key={chat.username + index} chat={chat} />
        ))}
      </Pane>
    </Pane>
  );
}

export default withRouter(App);
