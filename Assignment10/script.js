const socket = io();
let username= "";

window.onload = pageLoad;

function pageLoad(){
	let submitmsg = document.getElementById("submitmsg");
	let clickok = document.getElementById("clickok")
	// Complete this
	submitmsg.onclick = sendToAll;
	clickok.onclick = setUsername;
}


socket.on('your id', function(id){
	console.log('Your socket ID is: ' + id);
	//  Complete this
	document.getElementById("your_id").innerHTML = id;
});


// รับข้อความทั่วไป (ที่ส่งมาจาก socket.emit, socket.broadcast.emit, io.emit, io.to.emit)
socket.on('message_received', (data) => {
	postMsg(data);
});


// ส่งหาทุกคน รวมฉันด้วย (To All)
function sendToAll() {
	let d = new Date();

	// Complete this 
	// โดยการส่งข้อความไปยังทุกคน รวมถึงตัวเองด้วย โดยใช้ socket.emit และ event name เป็น 'send_to_all' พร้อมกับส่งข้อมูลเป็น object ที่มี time, user, text
	// เอาข้อความจาก input element ที่มี id เป็น "usermsg" และเก็บไว้ในตัวแปร text
	// กำหนดให้ time เป็นเวลาปัจจุบันในรูปแบบ "hh:mm AM/PM" โดยใช้ d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

	let text = document.getElementById("userMsg").value;

	let time = d.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});

	socket.emit('send_to_all', {
		time: time,
		user: username,
		text: text
	});

	document.getElementById("userMsg").value = "";
}


function postMsg(msg){
	let x = document.getElementById("chatbox");
	console.log(msg);
	let div_d = document.createElement("div");
	div_d.className = "message";
	let timemsg = document.createTextNode("("+ msg.time+") ");
	let boldmsg = document.createElement("b");
	boldmsg.innerHTML = msg.user;
	let textmsg = document.createTextNode(": "+msg.text);

	div_d.append(timemsg,boldmsg,textmsg);
	div_d.appendChild(document.createElement("br"));
	x.appendChild(div_d);

	checkScroll();
}


function setUsername(){
	let userInput = document.getElementById("userInput");
	let usernameShow = document.getElementById("username");
	// Complete this

	username = userInput.value;
	usernameShow.innerHTML = username;

	document.getElementById("submitmsg").disabled = false;
	document.getElementById("clickok").disabled = true;
	readLog();
}


const readLog = (async () => {
	// Complete this
	// ใช้ fetch เพื่อดึงข้อมูลจาก endpoint "/readlog" และแปลงผลลัพธ์เป็น JSON
	// จากนั้นวนลูปผ่านแต่ละข้อความใน JSON และเรียกใช้ฟังก์ชัน postMsg(msg) เพื่อแสดงข้อความใน chatbox

	const response = await fetch("/readlog");
	const data = await response.json();

	for (let i = 0; i < data.length; i++) {
		postMsg(data[i]);
	}
});


function checkScroll(){
	let chatbox = document.getElementById('chatbox');
	let scroll = chatbox.scrollTop+chatbox.clientHeight === chatbox.scrollHeight;
	if (!scroll) {
		chatbox.scrollTop = chatbox.scrollHeight;
	}
}