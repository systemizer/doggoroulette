import React, { useState } from 'react';
import { Button } from 'evergreen-ui';

export default function App(){
    
    const [chats, setChats] = useState("");

    async function handleClick(){
        // console.log('handlings lots of clicks');
        let response = await fetch("/rob");
        let res_text = await response.text();
        // console.log(await response.text());
        setChats(chats + "\n" + res_text);
    }
    
    return (
        <div>
            Chatting!
            <p>These are the chats: {chats}</p>
            <Button onClick={handleClick} appearance="primary"> Send Request to API </Button>
        </div>
    )
}