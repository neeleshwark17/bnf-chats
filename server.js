const express = require("express");
const path = require("path");
const socket = require("socket.io");
const app=express()

const PORT=process.env.PORT|| 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} 

const server=app.listen(PORT,()=>{
  console.log(`server ports -- ${PORT}`)
})

const io = socket(server)

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  console.log(id);
  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
