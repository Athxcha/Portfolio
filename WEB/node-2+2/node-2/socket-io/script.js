// ====================================================
// เชื่อมต่อไปยัง Socket.IO Server
// ====================================================
const socket = io();
let myId = '';
let currentRoom = '';

// ตัวแปรเก็บ DOM Elements (จะถูกกำหนดค่าเมื่อ window.onload ทำงาน)
let clientStatus;
let roomStatus;
let messageInput;
let logPanel;
let roomSelect;

// ====================================================
// window.onload: ทำงานเมื่อโหลด HTML และ DOM ครบสมบูรณ์แล้ว
// (จำเป็นมากเมื่อนำแท็ก <script> ไปวางไว้ใน <head>)
// ====================================================
window.onload = () => {
  // ดึง DOM Elements
  clientStatus = document.getElementById('clientStatus');
  roomStatus = document.getElementById('roomStatus');
  messageInput = document.getElementById('messageInput');
  logPanel = document.getElementById('logPanel');
  roomSelect = document.getElementById('roomSelect');

  const btnOnlyMe = document.getElementById('btnOnlyMe');
  const btnBroadcast = document.getElementById('btnBroadcast');
  const btnToAll = document.getElementById('btnToAll');
  const btnJoinRoom = document.getElementById('btnJoinRoom');
  const btnToRoom = document.getElementById('btnToRoom');
  const btnClearLogs = document.getElementById('btnClearLogs');

  // ผูกการทำงานด้วย .onclick กับ function โดยตรง
  btnOnlyMe.onclick = sendOnlyMe;
  btnBroadcast.onclick = sendBroadcast;
  btnToAll.onclick = sendToAll;
  btnJoinRoom.onclick = joinRoom;
  btnToRoom.onclick = sendToRoom;
  btnClearLogs.onclick = clearLogs;

  // อัปเดตสถานะถ้าได้รับ ID มาก่อนที่หน้าเว็บจะโหลดเสร็จ
  if (myId) {
    updateStatusBadge();
  }
};

// ====================================================
// 1. รอรับฟัง Event จาก Server: socket.on('event-name', callback)
// (เหมือนการตั้งเสารอรับสัญญาณ เมื่อได้ยินชื่อ Event ตรงกัน จะทำงานทันที)
// ====================================================

// รับ ID ของตัวเองจาก Server
socket.on('your_id', (data) => {
  myId = data.id;
  updateStatusBadge();
});

// รับข้อความทั่วไป (ที่ส่งมาจาก socket.emit, socket.broadcast.emit, io.emit, io.to.emit)
socket.on('message_received', (data) => {
  addLog(data);
});

// รับการแจ้งเตือนการเข้าห้อง
socket.on('room_notification', (data) => {
  addSystemLog(`🔔 [ห้อง ${data.room}] ${data.message}`);
});

// เมื่อหลุดการเชื่อมต่อ
socket.on('disconnect', () => {
  if (clientStatus) {
    clientStatus.textContent = '🔴 หลุดการเชื่อมต่อ';
  }
});

// ฟังก์ชันช่วยอัปเดต Badge แสดง ID
function updateStatusBadge() {
  if (clientStatus && myId) {
    clientStatus.textContent = `🟢 เชื่อมต่อแล้ว (ID: ${myId.substring(0, 6)}...)`;
    clientStatus.title = `Full ID: ${myId}`;
  }
}

// ====================================================
// 2. การยิงสัญญาณส่งข้อมูล: socket.emit('event-name', data)
// (เหมือนการส่งจดหมายหรือการตะโกน ระบุชื่อเรื่อง และข้อมูล)
// ====================================================

// แบบที่ 1: ส่งหาฉันคนเดียว (Only Me)
function sendOnlyMe() {
  const text = messageInput.value.trim() || 'ข้อความส่งหาฉันคนเดียว';
  // socket.emit('event-name', data)
  socket.emit('send_only_me', { text: text });
}

// แบบที่ 2: ส่งหาทุกคน ยกเว้นฉัน (Broadcast)
function sendBroadcast() {
  const text = messageInput.value.trim() || 'ข้อความ Broadcast (ทุกคนยกเว้นฉัน)';
  // socket.emit('event-name', data)
  socket.emit('send_broadcast', { text: text });
}

// แบบที่ 3: ส่งหาทุกคน รวมฉันด้วย (To All)
function sendToAll() {
  const text = messageInput.value.trim() || 'ข้อความถึงทุกคน (io.emit)';
  // socket.emit('event-name', data)
  socket.emit('send_to_all', { text: text });
}

// ขอเข้าร่วมห้อง
function joinRoom() {
  currentRoom = roomSelect.value;
  // socket.emit('event-name', data)
  socket.emit('join_room', currentRoom);
  roomStatus.textContent = `ห้องปัจจุบัน: ${currentRoom}`;
  roomStatus.style.background = '#8b5cf6';
}

// แบบที่ 4: ส่งเฉพาะคนที่อยู่ในห้อง (To Room)
function sendToRoom() {
  if (!currentRoom) {
    alert('กรุณากด "เข้าห้องนี้" ก่อนส่งข้อความเข้าห้องครับ');
    return;
  }
  const text = messageInput.value.trim() || `ข้อความถึงสมาชิกในห้อง [${currentRoom}]`;
  // socket.emit('event-name', data)
  socket.emit('send_room_message', {
    room: currentRoom,
    text: text
  });
}

// ล้างหน้าต่างแสดงข้อความ
function clearLogs() {
  if (!logPanel) return;
  logPanel.textContent = '';
  const emptyDiv = document.createElement('div');
  emptyDiv.style.color = '#9ca3af';
  emptyDiv.style.textAlign = 'center';
  emptyDiv.style.marginTop = '120px';
  emptyDiv.textContent = 'ยังไม่มีข้อความ';
  logPanel.appendChild(emptyDiv);
}

// ====================================================
// ฟังก์ชันช่วยจัดการ UI (สร้าง DOM Node แทน innerHTML)
// ====================================================
function addLog(data) {
  if (!logPanel) return;

  if (logPanel.children.length === 1 && logPanel.children[0].textContent.includes('ยังไม่มีข้อความ')) {
    logPanel.textContent = '';
  }

  const isMe = data.senderId === myId;
  const item = document.createElement('div');

  let badgeClass = 'socket-emit';
  if (data.type.includes('broadcast')) badgeClass = 'socket-broadcast';
  else if (data.type.includes('io.emit')) badgeClass = 'io-emit';
  else if (data.type.includes('to(')) badgeClass = 'io-room';

  item.className = `log-item ${badgeClass}`;

  // 1. สร้าง <div class="log-header">
  const headerDiv = document.createElement('div');
  headerDiv.className = 'log-header';

  const tagSpan = document.createElement('span');
  tagSpan.className = 'log-tag';
  tagSpan.textContent = data.type;

  const timeSpan = document.createElement('span');
  timeSpan.textContent = data.time;

  headerDiv.appendChild(tagSpan);
  headerDiv.appendChild(timeSpan);

  // 2. สร้าง <div class="log-sender">
  const senderDiv = document.createElement('div');
  senderDiv.className = 'log-sender';

  if (isMe) {
    const boldText = document.createElement('b');
    boldText.textContent = 'ตัวคุณเองส่ง';
    senderDiv.append('👤 ', boldText, ` (${data.description})`);
  } else {
    senderDiv.textContent = `👥 ได้รับจาก ID: ${data.senderId.substring(0, 6)}... (${data.description})`;
  }

  // 3. สร้าง <div class="log-body">
  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'log-body';
  bodyDiv.textContent = data.text;

  // นำ Node ทั้งหมดมาต่อเข้า item
  item.appendChild(headerDiv);
  item.appendChild(senderDiv);
  item.appendChild(bodyDiv);

  logPanel.appendChild(item);
  logPanel.scrollTop = logPanel.scrollHeight;
}

function addSystemLog(msg) {
  if (!logPanel) return;

  if (logPanel.children.length === 1 && logPanel.children[0].textContent.includes('ยังไม่มีข้อความ')) {
    logPanel.textContent = '';
  }

  const item = document.createElement('div');
  item.className = 'log-item';
  item.style.borderLeftColor = '#6b7280';
  item.style.background = '#f3f4f6';

  const msgDiv = document.createElement('div');
  msgDiv.style.fontSize = '12px';
  msgDiv.style.color = '#4b5563';
  msgDiv.textContent = msg;

  item.appendChild(msgDiv);
  logPanel.appendChild(item);
  logPanel.scrollTop = logPanel.scrollHeight;
}
