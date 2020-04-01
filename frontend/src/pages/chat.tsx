import React, { useState } from "react";
import { Button, TextInput } from "evergreen-ui";
import Websocket from "react-websocket";
import GiphySelect from "react-giphy-select";
import "react-giphy-select/lib/styles.css";

const giphyAPIKey = "b9tcNs4yQdwq97FKiEf1Y3NCeFntP73G";

export default function App() {
  function randUsername() {
    return "corgie" + Math.floor(Math.random() * 100000);
  }

  interface Chat {
    message: string;
    username: number;
    image: string;
  }

  interface Entry {
    images: {
      original: {
        url: string;
      };
    };
  }

  let host = window.location.host;
  if (process.env.NODE_ENV === "development") {
    host = "localhost:8080";
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
        image: giph
      })
    });
    setInput("");
    setGiph("");
  }

  async function handleDataFromWebSocket(data: string) {
    let result: Chat = JSON.parse(data);
    chats.push(result);
    console.log(chats);
  }

  async function handleEntry(entry: Entry) {
    setGiph(entry.images.original.url);
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
      <GiphySelect requestKey={giphyAPIKey} onEntrySelect={handleEntry} />
      <Button onClick={handleClick} appearance="primary">
        {" "}
        Send Request to API{" "}
      </Button>
      {chats.map((chat, index) => (
        <div key={chat.username + index}>
          {chat.username}
          <div>{chat.message}</div>
          <img src={chat.image} />
        </div>
      ))}
    </div>
  );
}
