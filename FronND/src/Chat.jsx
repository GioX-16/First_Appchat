import React, { useState, useEffect } from "react";
import { CardContent, Card, Form, Icon, Input, Container, List, Divider, } from "semantic-ui-react";
import { MessageHeader, Message, FormField, Button, Checkbox, } from "semantic-ui-react";
import ScrollToBottom from 'react-scroll-to-bottom';
import "./styles.css";

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);

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
            setMessagesList((list) => [...list, info]);
            setCurrentMessage("")
        }
    };

    useEffect(() => {
        const messageHandle = (data) => {
            setMessagesList((list) => [...list, data]);
        }
        socket.on("receive_message", messageHandle);

        return () => socket.off("receive_message", messageHandle);
    }, [socket]);

    return (
        <Container>
            <Card fluid>
                <CardContent header={`Chat in real time | Sala: ${room}`} />
                <ScrollToBottom>
                    <Card.Content style={{ height: "400px", padding: "5px" }}>
                        {messagesList.map((item, i) => {
                            return (
                                <span key={i}>
                                    <Message
                                        style={{
                                            textAlign:
                                                username === item.author ? 'right' : 'left',
                                        }}
                                        success={username === item.author}
                                        info={username !== item.author}
                                    >
                                        <MessageHeader>{item.message}</MessageHeader>
                                        <p> Sent by <strong>@{item.author}</strong>, at <i>{item.time}</i></p>
                                    </Message>
                                    <Divider />
                                </span>
                            );
                        })}
                    </Card.Content>
                </ScrollToBottom>
                <CardContent extra>
                    <Form>
                        <Form.Field className="ui action input">
                            <div className="ui action input">
                                <input
                                    value={currentMessage}
                                    type="text"
                                    placeholder="Message..."
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                            sendMessage();
                                        }
                                    }}
                                />
                                <button
                                    type='button' 
                                    onClick={() => sendMessage()}
                                    className='ui teal icon right labeled button'>
                                    <Icon name='send' /> Enviar
                                </button>
                            </div>
                        </Form.Field>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Chat;
