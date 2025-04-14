import React, { useState, useEffect } from "react";

const Chat = ({socket,username,room}) => {

    const [currentMessage, setCurrentMessage] = useState("");


    const sendMessage = async () => {
        if (username && currentMessage){
            const info = {
                message: currentMessage,
                room,
                author:username,
                time: 
                new Date(Date.now()).getHours() +
                ":" + 
                new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", info);
        }
    }


    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
        })
    }, [socket])

    return (
        <div>
            <section className="chat-header">
                <h3>Chat in real time</h3>
            </section>
            <section className="Chat-Messages">

            </section>
            <section className="Chat-footer">
                <input type="text" placeholder="Message..."
                onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send &#9658;</button>
            </section>
        </div>
    )
}

export default Chat;