const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// ให้บริการไฟล์ Static (HTML, CSS, JS) ในโฟลเดอร์นี้
app.use(express.static(__dirname));

// ==========================================
// Socket.IO Connection Handler
// ==========================================
io.on('connection', (socket) => {
  console.log(`[+] Client เชื่อมต่อแล้ว: ${socket.id}`);

  // ส่ง ID ของตัวเองกลับไปให้ Client ทราบ
  // socket.emit('event-name', data) -> ส่งกลับไปหา Client คนนี้คนเดียว
  socket.emit('your_id', { id: socket.id });

  // ----------------------------------------------------
  // 1) ตัวอย่าง: socket.emit(...)
  // "ส่งกลับไปหา Client คนที่ติดต่อเข้ามาคนเดียว"
  // ----------------------------------------------------
  socket.on('send_only_me', (data) => {
    console.log(`[Only Me] จาก ${socket.id}:`, data);
    // socket.emit = ส่งกลับไปหา Client คนที่ส่งมาเท่านั้น
    socket.emit('message_received', {
      type: 'socket.emit',
      description: 'ส่งหาคุณคนเดียว (Only Me)',
      senderId: socket.id,
      text: data.text,
      time: new Date().toLocaleTimeString()
    });
  });

  // ----------------------------------------------------
  // 2) ตัวอย่าง: socket.broadcast.emit(...)
  // "ส่งหาทุกคนในระบบ ยกเว้น ตัวเอง"
  // ----------------------------------------------------
  socket.on('send_broadcast', (data) => {
    console.log(`[Broadcast] จาก ${socket.id}:`, data);
    // socket.broadcast.emit = ส่งหาทุกคน ยกเว้น socket ตัวเอง
    socket.broadcast.emit('message_received', {
      type: 'socket.broadcast.emit',
      description: 'ส่งหาทุกคน ยกเว้นคนส่ง (Broadcast)',
      senderId: socket.id,
      text: data.text,
      time: new Date().toLocaleTimeString()
    });
  });

  // ----------------------------------------------------
  // 3) ตัวอย่าง: io.emit(...)
  // "ส่งหาทุกคนในระบบ รวมทั้ง ตัวเองด้วย"
  // ----------------------------------------------------
  socket.on('send_to_all', (data) => {
    console.log(`[All] จาก ${socket.id}:`, data);
    // io.emit = ส่งหาทุกคนทั้งหมดในระบบ
    io.emit('message_received', {
      type: 'io.emit',
      description: 'ส่งหาทุกคน รวมตัวเอง (To All)',
      senderId: socket.id,
      text: data.text,
      time: new Date().toLocaleTimeString()
    });
  });

  // ----------------------------------------------------
  // 4) ตัวอย่าง: io.to('room-id').emit(...)
  // "ส่งหาเฉพาะคนที่อยู่ในห้องนั้นๆ"
  // ----------------------------------------------------
  // เมื่อ Client ขอย้ายเข้าห้อง
  socket.on('join_room', (roomName) => {
    // ออกจากห้องเดิมก่อน (ถ้ามี) ยกเว้น default room (socket.id)
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.leave(room);
        console.log(`[-] ${socket.id} ออกจากห้อง ${room}`);
      }
    }

    // เข้าร่วมห้องใหม่
    socket.join(roomName);
    console.log(`[+] ${socket.id} เข้าร่วมห้อง: ${roomName}`);

    // แจ้งเตือนคนในห้องนั้น
    io.to(roomName).emit('room_notification', {
      room: roomName,
      message: `สมาชิกใหม่ (${socket.id}) เข้าร่วมห้องแล้ว`
    });
  });

  // ส่งข้อความเฉพาะห้องที่เลือก
  socket.on('send_room_message', (data) => {
    console.log(`[Room: ${data.room}] จาก ${socket.id}:`, data.text);
    // io.to('room-id').emit = ส่งหาเฉพาะ client ที่อยู่ในห้องนั้นๆ
    io.to(data.room).emit('message_received', {
      type: `io.to('${data.room}').emit`,
      description: `ส่งเฉพาะคนที่อยู่ในห้อง [${data.room}]`,
      senderId: socket.id,
      room: data.room,
      text: data.text,
      time: new Date().toLocaleTimeString()
    });
  });

  // เมื่อ Client ตัดการเชื่อมต่อ
  socket.on('disconnect', () => {
    console.log(`[-] Client ตัดการเชื่อมต่อ: ${socket.id}`);
  });
});


server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Socket.IO Server กำลังทำงานที่: http://localhost:${PORT}`);
  console.log(`💡 เปิดไฟล์ index.html ในเบราว์เซอร์เพื่อทดสอบ Socket.IO`);
  console.log(`====================================================`);
});
