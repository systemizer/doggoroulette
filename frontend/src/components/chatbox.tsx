import React from "react";
import { Chat } from "../models";
import { Pane, Strong, Avatar, Text, majorScale } from "evergreen-ui";
import "./chatbox.css";

interface ChatboxProperties {
    chat: Chat;
}

export default function Chatbox({ chat }: ChatboxProperties) {
    return (
        <Pane
            display="flex"
            className={"chatbox"}
            padding={majorScale(2)}
            hoverElevation={1}
            elevation={0}
        >
            <Pane flexBasis="40px" marginRight={majorScale(1)}>
                <Avatar name={chat.username} size={40} />
            </Pane>
            <Pane flex={1}>
                <Pane marginTop={"9px"} marginBottom={majorScale(2)}>
                    <Strong fontSize={"35px"} fontFamily="NatureSpirit">
                        {chat.username}
                    </Strong>
                </Pane>
                <Pane marginBottom={majorScale(2)}>
                    <Text fontSize={"30px"} fontFamily="NatureSpirit">
                        {chat.message}
                    </Text>
                </Pane>
                <Pane
                    marginTop={majorScale(1)}
                    paddingLeft={majorScale(2)}
                    borderLeft
                    borderColor={"DarkGoldenRod"}
                    borderWidth="3px"
                >
                    <img src={chat.image} />
                </Pane>
            </Pane>
        </Pane>
    );
}
