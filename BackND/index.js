const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io") 
const { Socket } = require("dgram")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

/* Esta parte del codigo sirve para que me indique la coneccion de un usuario */

io.on("connection", (Socket) => {
    console.log("Usuario Conectado", Socket.id)
    Socket.on("disconnect", () => {
        console.log("Usuario desconectado", Socket.id)
    })
})



server.listen(3001, () => {
    console.log("SERVER IS RUNNING BITCHES")
})