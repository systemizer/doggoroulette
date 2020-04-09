import React, { useState } from "react";
import Websocket from "react-websocket";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
    Button,
    Pane,
    Heading,
    majorScale,
    Text
} from "evergreen-ui";
import { host } from "../config";
import { Chatroom } from "../models";

function App(props: RouteComponentProps) {
    const [isQueueing, setQueue] = useState(false);

    function openWebSocket() {
        setQueue(true);
    }

    function handleQueueFromWebSocket(data: string) {
        let result: Chatroom = JSON.parse(data);
        props.history.push(`/chat/${result["id"]}`);
    }

    return (
        <Pane backgroundColor="snow" height="100vh" width="100%" display="flex" flexDirection="row">
            <Pane flex={1} backgroundColor="lemonchiffon" display="flex">
                <Pane margin="auto" textAlign="center">
                    <Heading
                        id={"hometitle"}
                        color={"DarkGoldenRod"}
                        fontSize={"288px"}
                        lineHeight={"74%"}
                        marginBottom={majorScale(5)}
                    >
                        {"Doggo"}<br />&nbsp;&nbsp;&nbsp;{"Roulette"}
                    </Heading>
                    <Heading id="homesubtitle" color={"DarkGoldenRod"} fontSize={"55px"} position="relative" top="-25px" left="80px"
                    >
                        Free Dogs
		    </Heading>
                </Pane>
            </Pane>

            <Pane flex={1}>
                <Button
                    onClick={openWebSocket}
                    height={40}
                    isLoading={isQueueing}
                    appearance="primary"
                    intent="success"
                >
                    {isQueueing ? "Finding a match" : "Start sending doggos!"}
                </Button>

                <Pane display="flex" paddingTop={majorScale(6)} padding={majorScale(6)}>
                    <Pane flex={1} padding={majorScale(4)} backgroundColor={"#FFFCE2"}>
                        <Pane textAlign="center">
                            <Text fontSize={"70px"}>{"🤝"}</Text>
                            <Heading marginTop={majorScale(2)} size={700}>
                                {"Get matched with a stranger"}
                            </Heading>
                        </Pane>
                    </Pane>
                    <Pane flex={1} margin={majorScale(4)} backgroundColor={"#FFFCE2"}>
                        <Pane textAlign="center">
                            <Text fontSize={"70px"}>{"🐕"}</Text>
                            <Heading marginTop={majorScale(2)} size={700}>
                                {"Have a convo in Dog Gifs"}
                            </Heading>
                        </Pane>
                    </Pane>
                    <Pane flex={1} margin={majorScale(4)} backgroundColor={"#FFFCE2"}>
                        <Pane textAlign="center">
                            <Text fontSize={"70px"}>{"🦄"}</Text>
                            <Heading marginTop={majorScale(2)} size={700}>
                                {"Profit"}
                            </Heading>
                            <Text marginTop={majorScale(2)} size={500}>
                                {
                                    "Not enough dogs? Initiate a new Doggoroulette and seek the wonders of the universe."
                                }
                            </Text>
                        </Pane>
                    </Pane>
                </Pane>
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
