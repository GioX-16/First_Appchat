import React, { useState, useEffect } from "react";
import { Card, Icon } from "semantic-ui-react";

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
        <div className="chat">
            <Card>
                <Card.Content>
                    <Card.Header>Chat in Real Time</Card.Header>
                    <Card.Content>Chats</Card.Content>
                    <Card.Content extra>
                        <input
                            type="text"
                            placeholder="Message..."
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send &#9658;</button>
                        <Icon name="user" />4 Friends
                    </Card.Content>
                </Card.Content>
            </Card>

        </div>
    );
};

export default Chat;
