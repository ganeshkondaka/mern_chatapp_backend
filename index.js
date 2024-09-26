const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
// const { postingchat, gettingchat } = require('./controllers/chatController'); // Assuming this is the path to your controller file
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust according to your frontend's origin
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// const chatRoutes = require('./routes/chatRoutes'); // Assuming your routes are defined here
const { postingchat } = require('./controllers/chatcontroller');
// app.use('/chat', chatRoutes);
const {  p_router } = require("./routes/chatrouter");
const { g_router } = require("./routes/get_router");

app.use("/", g_router);
app.use("/", p_router);


// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for 'newMessage' event from client
  socket.on('newMessage', async (messageData) => {
    try {
      // Instead of directly adding data here, call the controller method
      const newchat = await postingchat({
        body: messageData
      });

      // Emit the new message to all connected clients
      io.emit('message', newchat.chatdata);  // Emitting the saved message
    } catch (error) {
      console.error('Error in socket newMessage:', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




































// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const {  p_router } = require("./routes/chatrouter");
// const { g_router } = require("./routes/get_router");
// // const { chat_router } = require("./routes/chatrouter");
// // const { postingchat, gettingchat } = require("./controllers/chatcontroller");
// const app = express();
// const port = process.env.PORT || 5000;

// dotenv.config();
// app.use(cors());
// app.use(express.json());

// //routes

// app.use("/", g_router);
// app.use("/", p_router);

// app.listen(port, () => {
//   console.log(`app is running on this port ${port}`);
// });
