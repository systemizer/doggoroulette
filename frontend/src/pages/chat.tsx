import React, { useState } from 'react';
import { Button } from 'evergreen-ui';
import Websocket from 'react-websocket';

export default function App(){
    
    const [chats, setChats] = useState("");

    async function handleClick(){
        // console.log('handlings lots of clicks');
        let response = await fetch("/rob");
        let res_text = await response.text();
        // console.log(await response.text());
        setChats(chats + "\n" + res_text);
    }
    
    async function handleDataFromWebSocket(data: string){
        let result = data;
        console.log(result);
    }

    return (
        <div>
            Chatting!
            <p>These are the chats: {chats}</p>
            {/* # subscribe to chatting endpoint */}
            <Websocket url='ws://localhost:8080/chatting' onMessage={handleDataFromWebSocket}/>
            <Button onClick={handleClick} appearance="primary"> Send Request to API </Button>
        </div>
    )
}