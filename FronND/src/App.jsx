
import { useState } from 'react';
import "./App.css";

import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [Username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (Username !== "" && room !== "") {
      /* AQUI EL USUARIO SE UNE A LA SALA LUEGO DE HABER PUESTO SU USUARIO Y LA SALA */
      socket.emit("join_room", room);
    }
  };

  return (
    <>
      <div className="chat">
        <h3>Unirme al Chat</h3>
        <input
          type="text"
          placeholder="Chris..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="text" 
        placeholder="ID SALA: " 
        onChange={e => setRoom(e.target.value)}
        />

        <button onClick={joinRoom}>Unirme</button>
      </div>
    </>
  );
}

export default App;
