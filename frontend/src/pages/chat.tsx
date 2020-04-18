import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  Pane,
  Button,
  TextInput,
  majorScale,
  Heading,
  Badge
} from "evergreen-ui";
import Websocket from "react-websocket";
import GiphySelect from "react-giphy-select";
import "react-giphy-select/lib/styles.css";
import { host } from "../config";
import { Chat, ChatroomParams, Entry, WebSocketData } from "../models";
import Chatbox from "../components/chatbox";

const giphyAPIKey = "b9tcNs4yQdwq97FKiEf1Y3NCeFntP73G";
const DOGQUERIES = [
  "dog",
  "puppy",
  "corgi",
  "pomeranian",
  "puppies",
  "doggo",
  "poodle"
];

function App(props: RouteComponentProps<ChatroomParams>) {
  function randUsername() {
    return "corgi" + Math.floor(Math.random() * 100000);
  }

  function randomDog() {
    return DOGQUERIES[Math.floor(Math.random() * DOGQUERIES.length)];
  }

  const [chats, setChats] = useState<Chat[]>([
    {
      message:
        "You've found an internet friend who also loves to chat about doggos. Send some dog gifs ASAP!",
      username: "HelloCorgiBot",
      image:
        "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day_2_dec_14_085-400x267.jpg"
    }
  ]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(randUsername());
  const [dogQuery, setDogQuery] = useState(randomDog());
  const [giph, setGiph] = useState("");
  const [currentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    window.analytics.track("User Really Matched", {
      username,
      id: props.match.params.id
    });
  }, []);

  async function sendMessage() {
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
    window.analytics.track("Message Sent", {
      username,
      id: props.match.params.id
    });
  }

  async function handleClick() {
    sendMessage();
    setInput("");
    setGiph("");
  }

  async function handleDataFromWebSocket(data: string) {
    let result: WebSocketData = JSON.parse(data);
    if (result.type === "message") {
      let message: Chat = result.payload;
      setChats([message].concat(chats));
    }
    if (result.type == "connectionStatus") {
      setCurrentUsers(result.payload);
    }
  }

  async function handleEntry(entry: Entry) {
    setGiph(entry.images.original.url);
  }

  async function handleOnTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleOnKeyDown(e: React.KeyboardEvent) {
    if (e.key == "Enter") {
      sendMessage();
      setInput("");
      setGiph("");
    }
  }

  return (
    <Pane height="100vh" display="flex">
      <Pane
        height="100%"
        flexBasis={"200px"}
        paddingLeft={majorScale(2)}
        paddingRight={majorScale(2)}
        borderRight
        background="lemonchiffon"
      >
        <Pane padding={majorScale(2)}>
          <Heading
            textAlign="right"
            fontSize={"80px"}
            lineHeight="100%"
            fontFamily={"HelloStockholm"}
            marginBottom={majorScale(2)}
            size={600}
          >
            Welcome to doggoroulette, <br />
            {username}!
          </Heading>
          <Websocket
            url={`ws://${host}/chat?id=${props.match.params.id}&username=${username}`}
            onMessage={handleDataFromWebSocket}
          />
          {/* # subscribe to chatting endpoint */}
          <Pane
            marginBottom={majorScale(2)}
            padding={majorScale(1)}
            textAlign={"center"}
            fontFamily="NatureSpirit"
            fontSize={"16px"}
            border
            lineHeight={"130%"}
            borderColor={"whitesmoke"}
            borderWidth="1px"
          >
            Currently Chattin' : &nbsp;
            {currentUsers.map(currentUserUsername => (
              <Badge
                key={currentUserUsername}
                color="orange"
                marginRight={majorScale(1)}
              >
                {currentUserUsername}
              </Badge>
            ))}
          </Pane>
          <Pane marginBottom={majorScale(2)}>
            <GiphySelect
              query={dogQuery}
              requestKey={giphyAPIKey}
              onEntrySelect={handleEntry}
            />
          </Pane>
          <Pane marginBottom={majorScale(2)}>
            <TextInput
              width="100%"
              placeholder="Chat about dogs..."
              fontFamily="NatureSpirit"
              fontSize={"24px"}
              onChange={handleOnTextChange}
              onKeyDown={handleOnKeyDown}
              value={input}
            />
          </Pane>

          <Button
            intent="success"
            textAlign="center"
            display="flex"
            height={48}
            fontFamily="NatureSpirit"
            fontSize="30px"
            width="100%"
            onClick={handleClick}
            appearance="primary"
          >
            <Pane margin="auto">Send Dog</Pane>
          </Button>
        </Pane>
      </Pane>
      <Pane flex={2} background="whitesmoke" overflowY="scroll">
        <Pane flex={1} padding={majorScale(4)}>
          {chats.map((chat, index) => (
            <Chatbox key={chat.username + index} chat={chat} />
          ))}
        </Pane>
      </Pane>
    </Pane>
  );
}

export default withRouter(App);
