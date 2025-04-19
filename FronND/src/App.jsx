import { useState } from "react";
import "./App.css";

import io from "socket.io-client";
import Chat from "./Chat";
import { CardContent, Card, Icon, Container, Divider } from "semantic-ui-react";
import { FormField, Button, Checkbox, Form } from "semantic-ui-react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [Username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState("");

  const joinRoom = () => {
    if (Username !== "" && room !== "") {
      socket.emit("join_room",room);/* AQUI EL USUARIO SE UNE A LA SALA LUEGO DE HABER PUESTO SU USUARIO Y LA SALA */
      setShowChat(true)
    }
  };

  return (
    <>
      <Container>
        {!showChat ? (
          <Card fluid>
            <CardContent header="WELCOME TO GIOX CHAT" />
            <CardContent>
              <Form>
                <FormField>
                  <label>USERNAME:</label>
                  <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormField>
                <FormField>
                  <label>ID ROOM:</label>
                  <input
                    type="text"
                    placeholder="id room"
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </FormField>

                <Button onClick={joinRoom}>Join</Button>
              </Form>
            </CardContent>
            <CardContent extra>
              <Icon name="user" />8 Friends
            </CardContent>
          </Card>
        ) : (
          <Chat socket={socket} username={Username} room={room} />
        )}
      </Container>
    </>
  );
}

export default App;
