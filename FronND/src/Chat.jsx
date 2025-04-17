import React, { useState, useEffect } from "react";
import { CardContent, Card, Icon, Container, } from "semantic-ui-react";
import { FormField, Button, Checkbox, Form } from "semantic-ui-react";

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", info);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
        });
    }, [socket]);

    return (
        <Container fluid>
                <Card>
                    <CardContent header='Chat in real time' />
                    <Card.Content>Chats</Card.Content>
                    <CardContent extra>
                            <input
                                type="text"
                                placeholder="Message..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                            />
                            <button onClick={sendMessage}>Send &#9658;</button>
                        <Icon name='user' /> 8 Friends
                    </CardContent>
                </Card>
        </Container>
    );
};

export default Chat;
