import React, { useState } from 'react';
import { 
    Button,
    TextInput
} from 'evergreen-ui';
import Websocket from 'react-websocket';

export default function App(){
    
    const [chats, setChats] = useState("");
    const [input, setInput] = useState("");

    async function handleClick(){
        let response = await fetch("/input", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: input}),
        });
        setInput("");
    }
    
    async function handleDataFromWebSocket(data: string){
        let result = data;
        console.log(result);
    }

    return (
        <div>
            Chatting!
            <TextInput 
                placeholder="Say a hello!..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                value={input}
            />
            <p>These are the chats: {chats}</p>
            {/* # subscribe to chatting endpoint */}
            <Websocket url='ws://localhost:8080/chatting' onMessage={handleDataFromWebSocket}/>
            <Button onClick={handleClick} appearance="primary"> Send Request to API </Button>
        </div>
    )
}