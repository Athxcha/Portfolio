// ตัวอย่าง fetch 
// const sendMsg = (async () => {
//     try {
//         const msg = await fetch("/message");
//         const data = await msg.text();
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// })

// window.onload = sendMsg;

// async await in fetch
// const sendMsg =  (async (msg) => {
//     let response = await fetch("/message", {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: "John",
//             age: 60
//             })
//         });
//     let content = await response.json();
//     console.log(content);
// });

// window.onload = sendMsg;