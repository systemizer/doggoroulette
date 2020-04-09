import React, { useState } from "react";
import Websocket from "react-websocket";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Pane, Heading, majorScale, Text } from "evergreen-ui";
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
        <Pane
            backgroundColor="snow"
            height="100vh"
            width="100%"
            display="flex"
            flexDirection="row"
        >
            <Pane flex={1} backgroundColor="lemonchiffon" display="flex">
                <Pane margin="auto" textAlign="center">
                    <Heading
                        id={"hometitle"}
                        color={"DarkGoldenRod"}
                        fontSize={"288px"}
                        lineHeight={"74%"}
                        marginBottom={majorScale(5)}
                    >
                        {"Doggo"}
                        <br />
                        &nbsp;&nbsp;&nbsp;{"Roulette"}
                    </Heading>
                    <Heading
                        id="homesubtitle"
                        color={"DarkGoldenRod"}
                        fontSize={"55px"}
                        position="relative"
                        top="-25px"
                        left="80px"
                    >
                        Free Dogs
          </Heading>
                </Pane>
            </Pane>

            <Pane background="whitesmoke" flex={1} display="flex">
                <canvas id="myCanvas"></canvas>
                <Pane
                    margin="auto"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Text
                        marginBottom={majorScale(8)}
                        lineHeight={"100%"}
                        fontSize="80px"
                        zIndex={2}
                    >
                        🐶
          </Text>
                    <Button
                        borderRadius="0px"
                        onClick={openWebSocket}
                        fontSize={"35px"}
                        fontFamily="NatureSpirit"
                        height={80}
                        isLoading={isQueueing}
                        zIndex={2}
                    >
                        {isQueueing ? "Finding a match" : "Start sending doggos!"}
                    </Button>
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
