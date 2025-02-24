import React from "react";

const Chat = ({socket, username,room}) => {

    const [currentMessage, setCurrentMessage] = useState("");


    return (
        <div>
            <section className="chat-header">
                <p>Chat in real time</p>
            </section>
            <section className="Chat-Messages"></section>
            <section className="Chat-footer">
                <input type="text" placeholder="Mensaje..." />
                onChange={(e) => setCurrentMessage(e.target.value)}
                <button>Enviar </button>
            </section>

        </div>
    )
}

export default Chat;