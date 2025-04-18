import React, { useState, useEffect } from "react";
import { CardContent, Card, Form, Icon, Input, Container, } from "semantic-ui-react";
import { FormField, Button, Checkbox, } from "semantic-ui-react";

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
        <Container >
            <Card fluid>
                <CardContent header='Chat in real time' />
                <Card.Content>Chats</Card.Content>
                <CardContent extra>
                    <Form>
                        <Form.Field>
                            <Input
                                action={{
                                    color: 'teal',
                                    labelPosition: 'right',
                                    icon: 'send',
                                    content: 'Enviar',
                                    onClick: sendMessage
                                }}
                                type="text"
                                placeholder="Message..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                            />
                        </Form.Field>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Chat;
