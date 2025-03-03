import { useState } from 'react';
import "./App.css";

import io from 'socket.io-client';
import Chat from './Chat'

const socket = io.connect("http://localhost:3001");

function App() {
  const [Username, setUsername] = useState("");
  const [room, setRoom] = useState("")


  const joinRoom = () => {
    if (Username !== "" && room !== "") {
      socket.emit("join_room", room);   /* AQUI EL USUARIO SE UNE A LA SALA LUEGO DE HABER PUESTO SU USUARIO Y LA SALA */
    }
  }

  return (
    <>
      <div className="chat">
        
        <h1>WELCOME TO GIOX CHAT</h1>

        <h3>Join The Room</h3>

        <input
          type="text"
          placeholder="USERNAME:"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="text" 
        placeholder="ID ROOM: " 
        onChange={e => setRoom(e.target.value)}
        />

        <button onClick={joinRoom}>Join</button>
        <Chat socket={socket} username={Username} room={room} />
      </div>
    </>
  );
}

export default App;
