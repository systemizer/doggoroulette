import React, { useState } from "react";
import { Button, TextInput } from "evergreen-ui";
import Websocket from "react-websocket";

export default function App() {
  function randUsername() {
    return "corgie" + Math.floor(Math.random() * 100000);
  }

  interface Chat {
    message: string;
    username: number;
  }

  let host = window.location.host;
  if (process.env.NODE_ENV === "development") {
    host = "localhost:8080";
  }

  const [chats, setChats] = useState<Chat[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(randUsername());

  async function handleClick() {
    let response = await fetch("/input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input,
        username: username
      })
    });
    setInput("");
  }

  async function handleDataFromWebSocket(data: string) {
    let result: Chat = JSON.parse(data);
    chats.push(result);
    console.log(chats);
  }

  return (
    <div>
      <p>Welcome to doggoroulette, {username}!</p>
      <Websocket
        url={`ws://${host}/chatting`}
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
      <Button onClick={handleClick} appearance="primary">
        {" "}
        Send Request to API{" "}
      </Button>
      {chats.map((chat, index) => (
        <div key={chat.username + index}>
          {chat.username}
          <div>{chat.message}</div>
        </div>
      ))}
    </div>
  );
}
