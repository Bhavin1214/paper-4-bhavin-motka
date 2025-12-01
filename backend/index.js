import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import GLOBALS from "./src/config/constants.js"
import {customMiddleware} from "./src/middleware/middleware.js"
import {router} from "./allRoutes.js"
 
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.text())
app.use(cors())
app.use(customMiddleware)

app.use("/api/v1",router)

const httpServer = http.createServer(app);
const io = new Server(httpServer,{
    cors: {
    origin: "*"
  },
})


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});



httpServer.listen(GLOBALS.PORT,()=>{
    console.log(`server is running on port ${GLOBALS.PORT}`)
})