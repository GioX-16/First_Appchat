import React, { useState, useEffect } from "react";
import { CardContent, Card, Form, Icon, Input, Container, List, Divider, } from "semantic-ui-react";
import { MessageHeader, Message, FormField, Button, Checkbox, } from "semantic-ui-react";

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
        <Container >
            <Card fluid>
                <CardContent header={`Chat in real time | Sala: ${room}`} />
                <Card.Content style={{ minHeight: "300px" }}>
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
                    })

                    }
                </Card.Content>
                <CardContent extra>
                    <Form>
                        <Form.Field className="ui caction input">
                            <div className="ui action input">
                                <input

                                    type="text"
                                    placeholder="Message..."
                                    /* value={currentMessage} */
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onkeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            sendMessage()
                                        }
                                    }}
                                />
                                <button onClick={() => sendMessage()}
                                    className='ui teal icon right labeled button'> 
                                    <Icon name='send'/> Enviar </button>
                            </div>
                        </Form.Field>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
};


export default Chat;
